import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { formatPrice, mockOrders } from "@/data/mock";

export default function AccountOrdersPage() {
  return (
    <div className="app-container flex flex-col gap-6 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <h1 className="text-3xl font-black text-primary">طلباتي</h1>
        <p className="mt-3 text-sm leading-7 text-muted">سجل طلبات تجريبي يعرض حالات الشحن والدفع.</p>
      </section>

      <section className="surface-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-right">
            <thead className="bg-slate-50 text-sm font-black text-muted">
              <tr>
                <th className="p-4">رقم الطلب</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">عدد المنتجات</th>
                <th className="p-4">الإجمالي</th>
                <th className="p-4">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 font-black text-primary">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4">{formatPrice(order.total)}</td>
                  <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
