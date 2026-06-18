import type { OrderStatus } from "@/data/mock";

const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "قيد الانتظار", className: "bg-amber-100 text-amber-800" },
  under_review: { label: "قيد المراجعة", className: "bg-cyan-100 text-cyan-800" },
  confirmed: { label: "مؤكد", className: "bg-blue-100 text-blue-800" },
  preparing: { label: "قيد التجهيز", className: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "تم التسليم", className: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "ملغي", className: "bg-rose-100 text-rose-800" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusMap[status];

  return <span className={`inline-flex px-3 py-1 text-xs font-black ${config.className}`}>{config.label}</span>;
}
