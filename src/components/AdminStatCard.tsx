import type { LucideIcon } from "lucide-react";

export function AdminStatCard({
  title,
  value,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-muted">{title}</p>
          <p className="mt-2 text-3xl font-black text-primary">{value}</p>
          <p className="mt-2 text-sm text-muted">{hint}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbf7ef] text-[#73572f]">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
