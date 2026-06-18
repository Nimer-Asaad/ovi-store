import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockProducts } from "@/data/mock";
import { getProfitMargin } from "@/lib/pricing";

export default function AdminProductsPage() {
  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge-primary w-fit">إدارة المنتجات</p>
            <h1 className="mt-4 text-3xl font-black text-primary">المنتجات</h1>
            <p className="mt-2 text-sm text-muted">إضافة وتعديل الأسعار، التكلفة، المخزون، وحالة الظهور.</p>
          </div>
          <Link href="/admin/products/new" className="btn-secondary">
            إضافة منتج
          </Link>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">القسم</th>
                  <th className="p-4">التكلفة</th>
                  <th className="p-4">التجزئة</th>
                  <th className="p-4">التاجر</th>
                  <th className="p-4">الموزع</th>
                  <th className="p-4">الخصم</th>
                  <th className="p-4">الهامش</th>
                  <th className="p-4">المخزون</th>
                  <th className="p-4">الظهور</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="p-4 font-black text-primary">{product.name}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">{product.categoryName}</td>
                    <td className="p-4 text-rose-700">{formatPrice(product.costPrice)}</td>
                    <td className="p-4">{formatPrice(product.retailPrice)}</td>
                    <td className="p-4 text-dark-gold">{formatPrice(product.wholesalePrice)}</td>
                    <td className="p-4">{product.dealerPrice ? formatPrice(product.dealerPrice) : "غير محدد"}</td>
                    <td className="p-4">{product.discountPercent}%</td>
                    <td className="p-4 text-dark-gold">{getProfitMargin(product).percent}%</td>
                    <td className={product.stock <= product.lowStockThreshold ? "p-4 font-black text-rose-700" : "p-4"}>{product.stock}</td>
                    <td className="p-4">
                      <span className={product.visible ? "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                        {product.visible ? "ظاهر" : "مخفي"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white hover:bg-soft-navy">
                          تعديل
                        </Link>
                        <button type="button" className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary hover:text-dark-gold">
                          {product.visible ? "إخفاء" : "إظهار"}
                        </button>
                        <button type="button" className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50">
                          حذف
                        </button>
                      </div>
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
