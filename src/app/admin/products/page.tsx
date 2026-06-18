import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { deleteProductAction, toggleProductVisibilityAction } from "@/lib/admin-products";
import { getAdminProducts } from "@/lib/catalog";
import { formatPrice } from "@/data/mock";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge-primary w-fit">إدارة المنتجات</p>
            <h1 className="mt-4 text-3xl font-black text-primary">المنتجات</h1>
            <p className="mt-2 text-sm text-muted">إضافة وتعديل الأسعار، التكلفة، المخزون، الصور، الكتالوجات، وحالة الظهور.</p>
          </div>
          <Link href="/admin/products/new" className="btn-secondary">
            إضافة منتج
          </Link>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1260px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">القسم</th>
                  <th className="p-4">العلامة</th>
                  <th className="p-4">التكلفة</th>
                  <th className="p-4">التجزئة</th>
                  <th className="p-4">الجملة</th>
                  <th className="p-4">الموزع</th>
                  <th className="p-4">الخصم</th>
                  <th className="p-4">الهامش</th>
                  <th className="p-4">المخزون</th>
                  <th className="p-4">الظهور</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {products.map((product) => {
                  const margin = product.retailPrice - product.costPrice;
                  const marginPercent = product.retailPrice > 0 ? Math.round((margin / product.retailPrice) * 100) : 0;

                  return (
                    <tr key={product.id}>
                      <td className="p-4">
                        <div>
                          <p className="font-black text-primary">{product.nameAr}</p>
                          <p className="mt-1 text-xs text-muted">{product.slug}</p>
                        </div>
                      </td>
                      <td className="p-4">{product.sku}</td>
                      <td className="p-4">{product.category.nameAr}</td>
                      <td className="p-4">{product.brand.name}</td>
                      <td className="p-4 text-rose-700">{formatPrice(product.costPrice)}</td>
                      <td className="p-4">{formatPrice(product.retailPrice)}</td>
                      <td className="p-4 text-dark-gold">{formatPrice(product.wholesalePrice)}</td>
                      <td className="p-4">{product.dealerPrice ? formatPrice(product.dealerPrice) : "غير محدد"}</td>
                      <td className="p-4">{product.discountPercent}%</td>
                      <td className="p-4 text-dark-gold">{marginPercent}%</td>
                      <td className={product.stock <= product.minStock ? "p-4 font-black text-rose-700" : "p-4"}>{product.stock}</td>
                      <td className="p-4">
                        <span className={product.isVisible ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                          {product.isVisible ? "ظاهر" : "مخفي"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <Link href={`/admin/products/${product.id}/edit`} className="rounded-lg bg-primary px-3 py-2 text-xs font-black text-white hover:bg-soft-navy">
                            تعديل
                          </Link>
                          <form action={toggleProductVisibilityAction.bind(null, product.id)}>
                            <button className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary hover:text-dark-gold">
                              {product.isVisible ? "إخفاء" : "إظهار"}
                            </button>
                          </form>
                          <form action={deleteProductAction.bind(null, product.id)}>
                            <button className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50">
                              حذف
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center text-sm font-bold text-muted">لا توجد منتجات بعد. ابدأ بإضافة أول منتج من لوحة التحكم.</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
