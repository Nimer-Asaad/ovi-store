import { cookies } from "next/headers";
import { isUserRole, type UserRole } from "@/lib/user-roles";

export type DemoViewerRole = UserRole | "GUEST";

export async function getCurrentDemoRole(): Promise<DemoViewerRole> {
  const cookieStore = await cookies();
  const role = cookieStore.get("ovi_demo_role")?.value;

  if (!role || role === "GUEST") {
    return "GUEST";
  }

  return isUserRole(role) ? role : "GUEST";
}
