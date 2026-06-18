import { notFound } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { formatPrice, getOrderById, getOrderProfit, mockOrders } from "@/data/mock";

export function generateStaticParams() {
  return mockOrders.map((order) => ({ id: order.id }));
}

export default async function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="badge-primary w-fit">مراجعة طلب</p>
            <h1 className="mt-4 text-3xl font-black text-primary">{order.id}</h1>
            <p className="mt-2 text-sm text-muted">{order.customer} - {order.date}</p>
          </div>
          <div className="grid gap-3">
            <OrderStatusBadge status={order.status} />
            <OrderStatusSelect defaultValue={order.status} />
            <button type="button" className="btn-secondary h-10 px-4">حفظ الحالة</button>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <InfoCard label="الإجمالي" value={formatPrice(order.total)} />
          <InfoCard label="الربح التقديري" value={formatPrice(getOrderProfit(order))} />
          <InfoCard label="طريقة الدفع" value={order.paymentMethod} />
          <InfoCard label="هاتف العميل" value={order.phone} />
          <InfoCard label="عنوان الشحن" value={order.shippingAddress} />
          <InfoCard label="عدد المنتجات" value={`${order.items}`} />
        </section>

        <div className="surface-panel overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-xl font-black text-primary">منتجات الطلب</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">الكمية</th>
                  <th className="p-4">سعر البيع</th>
                  <th className="p-4">التكلفة</th>
                  <th className="p-4">الربح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {order.lineItems.map((item) => (
                  <tr key={`${item.productId}-${item.sku}`}>
                    <td className="p-4 font-black text-primary">{item.productName}</td>
                    <td className="p-4">{item.sku}</td>
                    <td className="p-4">{item.quantity}</td>
                    <td className="p-4">{formatPrice(item.unitPrice)}</td>
                    <td className="p-4 text-rose-700">{formatPrice(item.costPrice)}</td>
                    <td className="p-4 text-teal-700">{formatPrice((item.unitPrice - item.costPrice) * item.quantity)}</td>
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

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <p className="text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-lg font-black text-primary">{value}</p>
    </div>
  );
}
