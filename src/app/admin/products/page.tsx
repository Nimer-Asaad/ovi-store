import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockProducts } from "@/data/mock";

export default function AdminProductsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-teal-700">إدارة المنتجات</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">المنتجات</h1>
          </div>
          <button className="h-11 bg-teal-600 px-5 text-sm font-black text-white hover:bg-teal-700">إضافة منتج</button>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-slate-600">
                <tr>
                  <th className="p-4">المنتج</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">القسم</th>
                  <th className="p-4">التجزئة</th>
                  <th className="p-4">الجملة</th>
                  <th className="p-4">المخزون</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockProducts.map((product) => (
                  <tr key={product.slug}>
                    <td className="p-4 font-black text-slate-950">{product.name}</td>
                    <td className="p-4">{product.sku}</td>
                    <td className="p-4">{product.categoryName}</td>
                    <td className="p-4">{formatPrice(product.price)}</td>
                    <td className="p-4 text-teal-700">{formatPrice(product.wholesale)}</td>
                    <td className="p-4">{product.stock}</td>
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
