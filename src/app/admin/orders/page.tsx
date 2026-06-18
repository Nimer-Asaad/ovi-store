import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { formatPrice, getOrderProfit, mockOrders } from "@/data/mock";

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-sm font-black text-teal-700">إدارة الطلبات</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">الطلبات</h1>
          <p className="mt-2 text-sm text-slate-600">مراجعة الطلبات وتغيير الحالة ومتابعة الربح المتوقع.</p>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-slate-600">
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
                    <td className="p-4 font-black text-slate-950">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4">{formatPrice(order.total)}</td>
                    <td className="p-4 text-teal-700">{formatPrice(getOrderProfit(order))}</td>
                    <td className="p-4"><OrderStatusBadge status={order.status} /></td>
                    <td className="p-4"><OrderStatusSelect defaultValue={order.status} /></td>
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-black text-teal-700 hover:text-teal-900">
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
