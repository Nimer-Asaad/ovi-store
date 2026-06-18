import { getCurrentUser } from "@/lib/auth";
import type { UserRole } from "@/lib/user-roles";

export type DemoViewerRole = UserRole | "GUEST";

export async function getCurrentDemoRole(): Promise<DemoViewerRole> {
  const user = await getCurrentUser();
  return user?.role ?? "GUEST";
}
