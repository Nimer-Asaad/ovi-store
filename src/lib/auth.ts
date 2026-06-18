import "server-only";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { clearSession, createUserSession, getCurrentSession } from "@/lib/session";
import { isUserRole, type UserRole } from "@/lib/user-roles";

export const priceGroups = ["RETAIL", "WHOLESALE", "DEALER", "VIP"] as const;

export type PriceGroup = (typeof priceGroups)[number];

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  priceGroup: PriceGroup;
  isApproved: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type AuthResult = { ok: true; user: AuthUser } | { ok: false; error: string };

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
  priceGroup?: PriceGroup;
  isApproved?: boolean;
};

export function getRoleLandingPath(user: Pick<AuthUser, "role" | "isApproved">) {
  if (!user.isApproved) {
    return "/pending-approval";
  }

  switch (user.role) {
    case "ADMIN":
      return "/admin";
    case "MERCHANT":
    case "DEALER":
      return "/merchant";
    case "SALES_REP":
      return "/sales-rep";
    case "SUPPLIER":
      return "/supplier";
    default:
      return "/";
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return { ok: false, error: "البريد الإلكتروني وكلمة المرور مطلوبة." };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { ok: false, error: "بيانات الدخول غير صحيحة." };
  }

  if (!user.isActive) {
    return { ok: false, error: "هذا الحساب غير فعال." };
  }

  await createUserSession(user.id);

  return { ok: true, user: toAuthUser(user) };
}

export async function registerUser(data: RegisterUserInput): Promise<AuthResult> {
  const normalizedEmail = normalizeEmail(data.email);
  const role = data.role ?? "CUSTOMER";
  const priceGroup = data.priceGroup ?? getDefaultPriceGroup(role);

  if (!data.name.trim() || !normalizedEmail || data.password.length < 8) {
    return { ok: false, error: "الاسم والبريد وكلمة مرور من 8 أحرف على الأقل مطلوبة." };
  }

  if (!isUserRole(role) || !isPriceGroup(priceGroup)) {
    return { ok: false, error: "نوع الحساب غير صالح." };
  }

  if (role === "ADMIN" || role === "SALES_REP") {
    return { ok: false, error: "لا يمكن إنشاء هذا النوع من الحسابات بشكل عام." };
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const isApproved = data.isApproved ?? role === "CUSTOMER";

  try {
    const user = await prisma.user.create({
      data: {
        name: data.name.trim(),
        email: normalizedEmail,
        passwordHash,
        phone: data.phone?.trim() || null,
        role,
        priceGroup,
        isApproved,
        isActive: true,
      },
    });

    await createUserSession(user.id);

    return { ok: true, user: toAuthUser(user) };
  } catch {
    return { ok: false, error: "يوجد حساب مسجل بهذا البريد الإلكتروني." };
  }
}

export async function logoutUser() {
  await clearSession();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getCurrentSession();

  if (!session?.user || !session.user.isActive) {
    return null;
  }

  return toAuthUser(session.user);
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireRole(roles: UserRole | UserRole[]) {
  const user = await requireAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!user.isApproved) {
    redirect("/pending-approval");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return user;
}

export async function requireApprovedUser() {
  const user = await requireAuth();

  if (!user.isApproved) {
    redirect("/pending-approval");
  }

  return user;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isPriceGroup(value: string): value is PriceGroup {
  return priceGroups.includes(value as PriceGroup);
}

function getDefaultPriceGroup(role: UserRole): PriceGroup {
  switch (role) {
    case "MERCHANT":
      return "WHOLESALE";
    case "DEALER":
      return "DEALER";
    case "SUPPLIER":
      return "VIP";
    default:
      return "RETAIL";
  }
}

function toAuthUser(user: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  priceGroup: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: isUserRole(user.role) ? user.role : "CUSTOMER",
    priceGroup: isPriceGroup(user.priceGroup) ? user.priceGroup : "RETAIL",
    isApproved: user.isApproved,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
