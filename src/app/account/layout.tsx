import { requireApprovedUser } from "@/lib/auth";

export default async function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireApprovedUser();

  return children;
}