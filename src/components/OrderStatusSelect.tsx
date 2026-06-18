import type { OrderStatus } from "@/data/mock";

export function OrderStatusSelect({ defaultValue }: { defaultValue: OrderStatus }) {
  return (
    <select defaultValue={defaultValue} className="h-10 border border-slate-200 bg-slate-50 px-3 text-xs font-black text-slate-700 outline-none focus:border-teal-500">
      <option value="pending">Pending</option>
      <option value="under_review">Under Review</option>
      <option value="confirmed">Confirmed</option>
      <option value="preparing">Preparing</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
