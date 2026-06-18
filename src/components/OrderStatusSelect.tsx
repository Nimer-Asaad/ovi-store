import type { OrderStatus } from "@/data/mock";

export function OrderStatusSelect({ defaultValue }: { defaultValue: OrderStatus }) {
  return (
    <select defaultValue={defaultValue} className="form-control h-10 px-3 text-xs">
      <option value="pending">Pending</option>
      <option value="under_review">Under Review</option>
      <option value="confirmed">Confirmed</option>
      <option value="preparing">Preparing</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
