import { requireRole } from "@/lib/auth";

export default async function SalesRepLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireRole("SALES_REP");

  return children;
}