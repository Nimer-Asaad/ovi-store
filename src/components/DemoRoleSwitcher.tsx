"use client";

import { roleLabels, userRoles, type UserRole } from "@/lib/user-roles";
import type { DemoViewerRole } from "@/lib/demo-user";

export function DemoRoleSwitcher({ currentRole }: { currentRole: DemoViewerRole }) {
  function updateRole(role: string) {
    document.cookie = `ovi_demo_role=${role}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  }

  return (
    <label className="flex items-center gap-2 text-xs font-black text-slate-200">
      <span>مستخدم تجريبي</span>
      <select
        value={currentRole}
        onChange={(event) => updateRole(event.target.value)}
        className="h-8 rounded-xl border border-white/10 bg-slate-900 px-2 text-xs font-black text-white outline-none focus:border-secondary"
      >
        <option value="GUEST">{roleLabels.GUEST}</option>
        {userRoles.map((role: UserRole) => (
          <option key={role} value={role}>
            {roleLabels[role]}
          </option>
        ))}
      </select>
    </label>
  );
}
