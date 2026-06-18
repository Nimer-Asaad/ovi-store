import { requireRole } from "@/lib/auth";

export default async function MerchantLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireRole(["MERCHANT", "DEALER"]);

  return children;
}