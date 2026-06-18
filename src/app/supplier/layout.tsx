import { requireRole } from "@/lib/auth";

export default async function SupplierLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireRole("SUPPLIER");

  return children;
}