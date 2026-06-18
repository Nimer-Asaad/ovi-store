import { categories, formatPrice, mockSuppliers, type Product } from "@/data/mock";
import { getProfitMargin } from "@/lib/pricing";

const inputClass = "h-11 border border-slate-200 bg-slate-50 px-3 text-sm font-bold outline-none focus:border-teal-500 focus:bg-white";

export function AdminProductForm({ product }: { product?: Product }) {
  const margin = product ? getProfitMargin(product) : null;

  return (
    <form className="grid gap-6">
      <section className="grid gap-4 border border-slate-200 bg-white p-6 md:grid-cols-2">
        <h2 className="text-xl font-black text-slate-950 md:col-span-2">بيانات المنتج</h2>
        <AdminField label="اسم المنتج" defaultValue={product?.name} />
        <AdminField label="SKU" defaultValue={product?.sku} />
        <AdminField label="Slug" defaultValue={product?.slug} />
        <label className="grid gap-2 text-sm font-black text-slate-700">
          القسم
          <select className={inputClass} defaultValue={product?.categorySlug}>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          الوصف
          <textarea defaultValue={product?.description} className="min-h-28 border border-slate-200 bg-slate-50 p-3 text-sm font-bold outline-none focus:border-teal-500 focus:bg-white" />
        </label>
      </section>

      <section className="grid gap-4 border border-slate-200 bg-white p-6 md:grid-cols-5">
        <h2 className="text-xl font-black text-slate-950 md:col-span-5">التسعير</h2>
        <AdminField label="سعر التكلفة" type="number" defaultValue={product?.costPrice} />
        <AdminField label="سعر التجزئة" type="number" defaultValue={product?.retailPrice} />
        <AdminField label="سعر التاجر" type="number" defaultValue={product?.wholesalePrice} />
        <AdminField label="سعر الموزع" type="number" defaultValue={product?.dealerPrice} />
        <AdminField label="نسبة الخصم" type="number" defaultValue={product?.discountPercent ?? 0} />
        {margin ? (
          <div className="bg-teal-50 p-4 md:col-span-5">
            <p className="text-sm font-black text-teal-800">هامش الربح الحالي: {formatPrice(margin.profit)} ({margin.percent}%)</p>
          </div>
        ) : null}
      </section>

      <section className="grid gap-4 border border-slate-200 bg-white p-6 md:grid-cols-3">
        <h2 className="text-xl font-black text-slate-950 md:col-span-3">المخزون والنشر</h2>
        <AdminField label="المخزون" type="number" defaultValue={product?.stock} />
        <AdminField label="حد المخزون المنخفض" type="number" defaultValue={product?.lowStockThreshold ?? 10} />
        <label className="grid gap-2 text-sm font-black text-slate-700">
          المورد
          <select className={inputClass} defaultValue={product?.supplierId}>
            {mockSuppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-3 bg-slate-50 p-4 text-sm font-black text-slate-700">
          <input type="checkbox" defaultChecked={product?.visible ?? true} className="h-5 w-5 accent-teal-600" />
          المنتج ظاهر في المتجر
        </label>
        <label className="flex items-center gap-3 bg-slate-50 p-4 text-sm font-black text-slate-700">
          <input type="checkbox" defaultChecked={product?.featured ?? false} className="h-5 w-5 accent-teal-600" />
          منتج مميز
        </label>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" className="h-11 bg-teal-600 px-6 text-sm font-black text-white hover:bg-teal-700">حفظ المنتج</button>
        <button type="button" className="h-11 border border-slate-200 px-6 text-sm font-black text-slate-800 hover:border-rose-300 hover:text-rose-700">حذف المنتج</button>
      </div>
    </form>
  );
}

function AdminField({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string | number;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input type={type} defaultValue={defaultValue} className={inputClass} />
    </label>
  );
}
