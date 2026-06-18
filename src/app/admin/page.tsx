import { Boxes, Package, ReceiptText, UsersRound } from "lucide-react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminStatCard } from "@/components/AdminStatCard";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { categories, formatPrice, mockOrders, mockProducts } from "@/data/mock";

export default function AdminPage() {
  const revenue = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-sm font-black text-teal-700">إدارة المتجر</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">لوحة التحكم</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard title="المنتجات" value={`${mockProducts.length}`} hint="منتجات mock" icon={Package} />
          <AdminStatCard title="الأقسام" value={`${categories.length}`} hint="أقسام رئيسية" icon={Boxes} />
          <AdminStatCard title="الطلبات" value={`${mockOrders.length}`} hint="طلبات تجريبية" icon={ReceiptText} />
          <AdminStatCard title="المبيعات" value={formatPrice(revenue)} hint="إجمالي وهمي" icon={UsersRound} />
        </div>

        <div className="border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black text-slate-950">آخر الطلبات</h2>
          <div className="mt-4 grid gap-3">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex flex-col gap-3 border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black text-slate-950">{order.id}</p>
                  <p className="text-sm font-bold text-slate-500">{order.customer}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-slate-950">{formatPrice(order.total)}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
