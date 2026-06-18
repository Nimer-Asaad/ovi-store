import Link from "next/link";
import { AdminSidebar } from "@/components/AdminSidebar";
import { mockProducts, mockSuppliers } from "@/data/mock";

export default function AdminInventoryPage() {
  const lowStock = mockProducts.filter((product) => product.stock <= product.lowStockThreshold);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة المخزون</p>
          <h1 className="mt-4 text-3xl font-black text-primary">المخزون</h1>
          <p className="mt-2 text-sm text-muted">{lowStock.length} منتجات تحت حد المخزون المنخفض.</p>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">المورد</th>
                  <th className="p-4">المخزون</th>
                  <th className="p-4">حد التنبيه</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockProducts.map((product) => {
                  const supplier = mockSuppliers.find((item) => item.id === product.supplierId);
                  const isLow = product.stock <= product.lowStockThreshold;

                  return (
                    <tr key={product.id}>
                      <td className="p-4 font-black text-primary">{product.name}</td>
                      <td className="p-4">{product.sku}</td>
                      <td className="p-4">{supplier?.name ?? "غير محدد"}</td>
                      <td className={isLow ? "p-4 font-black text-rose-700" : "p-4"}>{product.stock}</td>
                      <td className="p-4">{product.lowStockThreshold}</td>
                      <td className="p-4">
                        <span className={isLow ? "bg-rose-100 px-3 py-1 text-xs font-black text-rose-800" : "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800"}>
                          {isLow ? "منخفض" : "جيد"}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link href={`/admin/products/${product.id}/edit`} className="font-black text-teal-700 hover:text-teal-900">
                          تعديل المخزون
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
