import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { formatPrice, getOrderProfit, mockOrders } from "@/data/mock";

export default function AdminOrdersPage() {
  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة الطلبات</p>
          <h1 className="mt-4 text-3xl font-black text-primary">الطلبات</h1>
          <p className="mt-2 text-sm text-muted">مراجعة الطلبات وتغيير الحالة ومتابعة الربح المتوقع.</p>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">رقم الطلب</th>
                  <th className="p-4">العميل</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">المنتجات</th>
                  <th className="p-4">الإجمالي</th>
                  <th className="p-4">الربح</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">تغيير الحالة</th>
                  <th className="p-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="p-4 font-black text-primary">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4">{formatPrice(order.total)}</td>
                    <td className="p-4 text-dark-gold">{formatPrice(getOrderProfit(order))}</td>
                    <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                    <td className="p-4"><OrderStatusSelect defaultValue={order.status} /></td>
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-black text-dark-gold hover:text-primary">
                        مراجعة
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
