import { AlertTriangle, BadgeCheck, Boxes, Package, ReceiptText, TrendingUp, UserCheck, UsersRound, WalletCards } from "lucide-react";
import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminStatCard } from "@/components/AdminStatCard";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { formatPrice, getOrderProfit, mockCustomers, mockOrders, mockProducts } from "@/data/mock";

export default function AdminPage() {
  const totalSales = mockOrders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total, 0);
  const estimatedProfit = mockOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + getOrderProfit(order), 0);
  const pendingOrders = mockOrders.filter((order) => order.status === "pending" || order.status === "under_review").length;
  const completedOrders = mockOrders.filter((order) => order.status === "delivered").length;
  const tradeAccounts = mockCustomers.filter((customer) => customer.role === "MERCHANT" || customer.role === "DEALER").length;
  const lowStockProducts = mockProducts.filter((product) => product.stock <= product.lowStockThreshold).length;

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة المتجر</p>
          <h1 className="mt-4 text-3xl font-black text-primary">لوحة التحكم</h1>
          <p className="mt-3 text-sm leading-7 text-muted">مراجعة سريعة للطلبات، المبيعات، الربحية، العملاء، والمخزون.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AdminStatCard title="إجمالي المنتجات" value={`${mockProducts.length}`} hint="كل المنتجات في الكتالوج" icon={Package} />
          <AdminStatCard title="إجمالي الطلبات" value={`${mockOrders.length}`} hint="طلبات mock" icon={ReceiptText} />
          <AdminStatCard title="طلبات بانتظار المتابعة" value={`${pendingOrders}`} hint="انتظار أو مراجعة" icon={AlertTriangle} />
          <AdminStatCard title="طلبات مكتملة" value={`${completedOrders}`} hint="تم تسليمها" icon={BadgeCheck} />
          <AdminStatCard title="إجمالي العملاء" value={`${mockCustomers.length}`} hint="عملاء مسجلون" icon={UsersRound} />
          <AdminStatCard title="تجار وموزعون" value={`${tradeAccounts}`} hint="حسابات أسعار خاصة" icon={UserCheck} />
          <AdminStatCard title="مخزون منخفض" value={`${lowStockProducts}`} hint="يحتاج إعادة طلب" icon={Boxes} />
          <AdminStatCard title="إجمالي المبيعات" value={formatPrice(totalSales)} hint="بدون الطلبات الملغاة" icon={WalletCards} />
          <AdminStatCard title="ربح تقديري" value={formatPrice(estimatedProfit)} hint="حسب تكلفة المنتجات" icon={TrendingUp} />
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-primary">آخر الطلبات</h2>
              <p className="mt-1 text-sm text-muted">مراجعة سريعة مع الربح المتوقع لكل طلب.</p>
            </div>
            <Link href="/admin/orders" className="btn-primary w-fit">
              إدارة الطلبات
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">رقم الطلب</th>
                  <th className="p-4">العميل</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">الإجمالي</th>
                  <th className="p-4">الربح</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockOrders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="p-4 font-black text-primary">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{formatPrice(order.total)}</td>
                    <td className="p-4 text-dark-gold">{formatPrice(getOrderProfit(order))}</td>
                    <td className="p-4"><OrderStatusBadge status={order.status} /></td>
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
