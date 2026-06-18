export const userRoles = ["ADMIN", "CUSTOMER", "MERCHANT", "DEALER", "SALES_REP", "SUPPLIER"] as const;

export type UserRole = (typeof userRoles)[number];

export const publicRegistrationRoles = ["CUSTOMER", "MERCHANT", "DEALER", "SUPPLIER"] as const satisfies readonly UserRole[];

export const roleLabels: Record<UserRole | "GUEST", string> = {
  GUEST: "زائر",
  ADMIN: "مدير",
  CUSTOMER: "عميل",
  MERCHANT: "تاجر",
  DEALER: "وكيل",
  SALES_REP: "مندوب مبيعات",
  SUPPLIER: "مورد",
};

export const priceGroupLabels: Record<"RETAIL" | "WHOLESALE" | "DEALER" | "VIP", string> = {
  RETAIL: "تجزئة",
  WHOLESALE: "جملة",
  DEALER: "وكيل",
  VIP: "VIP",
};

export const isUserRole = (value: string | undefined): value is UserRole =>
  Boolean(value && userRoles.includes(value as UserRole));
