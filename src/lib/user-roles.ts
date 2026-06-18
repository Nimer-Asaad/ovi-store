export const userRoles = ["ADMIN", "CUSTOMER", "MERCHANT", "DEALER", "SALES_REP", "SUPPLIER"] as const;

export type UserRole = (typeof userRoles)[number];

export const roleLabels: Record<UserRole | "GUEST", string> = {
  GUEST: "زائر",
  ADMIN: "مدير",
  CUSTOMER: "عميل",
  MERCHANT: "تاجر",
  DEALER: "موزع",
  SALES_REP: "مندوب مبيعات",
  SUPPLIER: "مورد",
};

export const isUserRole = (value: string | undefined): value is UserRole =>
  Boolean(value && userRoles.includes(value as UserRole));
