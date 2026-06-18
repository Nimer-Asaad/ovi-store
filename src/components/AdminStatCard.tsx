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
    <div className="border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
          <p className="mt-2 text-sm text-slate-600">{hint}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center bg-teal-50 text-teal-700">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
