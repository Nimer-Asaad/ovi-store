import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockProducts } from "@/data/mock";
import { getProfitMargin } from "@/lib/pricing";

export default function AdminProductsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-teal-700">إدارة المنتجات</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">المنتجات</h1>
            <p className="mt-2 text-sm text-slate-600">إضافة وتعديل الأسعار، التكلفة، المخزون، وحالة الظهور.</p>
          </div>
          <Link href="/admin/products/new" className="h-11 bg-teal-600 px-5 py-3 text-sm font-black text-white hover:bg-teal-700">
            إضافة منتج
          </Link>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1180px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-slate-600">
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
                    <td className="p-4 font-black text-slate-950">{product.name}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">{product.categoryName}</td>
                    <td className="p-4 text-rose-700">{formatPrice(product.costPrice)}</td>
                    <td className="p-4">{formatPrice(product.retailPrice)}</td>
                    <td className="p-4 text-teal-700">{formatPrice(product.wholesalePrice)}</td>
                    <td className="p-4">{product.dealerPrice ? formatPrice(product.dealerPrice) : "غير محدد"}</td>
                    <td className="p-4">{product.discountPercent}%</td>
                    <td className="p-4 text-teal-700">{getProfitMargin(product).percent}%</td>
                    <td className={product.stock <= product.lowStockThreshold ? "p-4 font-black text-rose-700" : "p-4"}>{product.stock}</td>
                    <td className="p-4">
                      <span className={product.visible ? "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                        {product.visible ? "ظاهر" : "مخفي"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="bg-slate-950 px-3 py-2 text-xs font-black text-white hover:bg-teal-700">
                          تعديل
                        </Link>
                        <button type="button" className="border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:border-teal-300 hover:text-teal-700">
                          {product.visible ? "إخفاء" : "إظهار"}
                        </button>
                        <button type="button" className="border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50">
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
