import Image from "next/image";
import {
  createProductAction,
  deleteProductCatalogAction,
  deleteProductImageAction,
  setMainProductImageAction,
  updateProductAction,
} from "@/lib/admin-products";
import type { AdminProduct, getCatalogFormOptions } from "@/lib/catalog";
import { formatPrice } from "@/data/mock";

const inputClass = "form-control h-11 px-3";
const fileClass = "form-control file:ml-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-black file:text-white";

type FormOptions = Awaited<ReturnType<typeof getCatalogFormOptions>>;

export function AdminProductForm({
  product,
  options,
  error,
}: {
  product?: AdminProduct;
  options: FormOptions;
  error?: string;
}) {
  const action = product ? updateProductAction.bind(null, product.id) : createProductAction;
  const margin = product ? product.retailPrice - product.costPrice : null;
  const marginPercent = product && product.retailPrice > 0 ? Math.round((margin! / product.retailPrice) * 100) : null;

  return (
    <div className="grid gap-6">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-black text-rose-700">{error}</div>
      ) : null}

      {product ? <ProductAssets product={product} /> : null}

      <form action={action} encType="multipart/form-data" className="grid gap-6">
        <section className="surface-panel grid gap-4 p-6 md:grid-cols-2">
          <h2 className="text-xl font-black text-primary md:col-span-2">بيانات المنتج</h2>
          <AdminField name="nameAr" label="الاسم العربي" defaultValue={product?.nameAr} required />
          <AdminField name="nameEn" label="الاسم الإنجليزي" defaultValue={product?.nameEn} required />
          <AdminField name="slug" label="Slug" defaultValue={product?.slug} required />
          <AdminField name="sku" label="SKU" defaultValue={product?.sku} required />
          <AdminField name="barcode" label="الباركود" defaultValue={product?.barcode ?? ""} />

          <label className="grid gap-2 text-sm font-black text-slate-700">
            القسم
            <select name="categoryId" className={inputClass} defaultValue={product?.categoryId} required>
              <option value="">اختر القسم</option>
              {options.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameAr}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-black text-slate-700">
            العلامة التجارية
            <select name="brandId" className={inputClass} defaultValue={product?.brandId} required>
              <option value="">اختر العلامة</option>
              {options.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-black text-slate-700">
            المورد
            <select name="supplierId" className={inputClass} defaultValue={product?.supplierId} required>
              <option value="">اختر المورد</option>
              {options.suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
            الوصف العربي
            <textarea name="descriptionAr" defaultValue={product?.descriptionAr} className="form-control min-h-32 p-3" required />
          </label>
        </section>

        <section className="surface-panel grid gap-4 p-6 md:grid-cols-5">
          <h2 className="text-xl font-black text-primary md:col-span-5">التسعير</h2>
          <AdminField name="costPrice" label="سعر التكلفة" type="number" defaultValue={product?.costPrice} required />
          <AdminField name="retailPrice" label="سعر التجزئة" type="number" defaultValue={product?.retailPrice} required />
          <AdminField name="wholesalePrice" label="سعر الجملة" type="number" defaultValue={product?.wholesalePrice} required />
          <AdminField name="dealerPrice" label="سعر الموزع" type="number" defaultValue={product?.dealerPrice ?? ""} />
          <AdminField name="discountPercent" label="نسبة الخصم" type="number" defaultValue={product?.discountPercent ?? 0} />
          {product && margin !== null ? (
            <div className="rounded-2xl bg-[#fbf7ef] p-4 md:col-span-5">
              <p className="text-sm font-black text-[#73572f]">
                هامش الربح الحالي: {formatPrice(margin)} ({marginPercent}%)
              </p>
            </div>
          ) : null}
        </section>

        <section className="surface-panel grid gap-4 p-6 md:grid-cols-3">
          <h2 className="text-xl font-black text-primary md:col-span-3">المخزون والنشر</h2>
          <AdminField name="stock" label="المخزون" type="number" defaultValue={product?.stock ?? 0} />
          <AdminField name="minStock" label="حد المخزون المنخفض" type="number" defaultValue={product?.minStock ?? 10} />
          <ToggleField name="isVisible" label="المنتج ظاهر في المتجر" defaultChecked={product?.isVisible ?? true} />
          <ToggleField name="isFeatured" label="منتج مميز" defaultChecked={product?.isFeatured ?? false} />
          <ToggleField name="isNew" label="منتج جديد" defaultChecked={product?.isNew ?? false} />
        </section>

        <section className="surface-panel grid gap-4 p-6 md:grid-cols-2">
          <h2 className="text-xl font-black text-primary md:col-span-2">الصور والكتالوجات</h2>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            صور المنتج
            <input name="images" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple className={fileClass} />
            <span className="text-xs font-bold text-muted">يتم حفظ الصور محليا داخل public/uploads/products.</span>
          </label>
          <AdminField name="mainImageIndex" label="رقم الصورة الرئيسية من الصور الجديدة" type="number" defaultValue={1} />
          <ToggleField name="makeNewImageMain" label="اجعل الصورة الجديدة المحددة رئيسية عند الرفع" defaultChecked={!product} />
          <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
            كتالوج PDF
            <input name="catalogs" type="file" accept=".pdf,application/pdf" multiple className={fileClass} />
            <span className="text-xs font-bold text-muted">يتم حفظ ملفات الكتالوج داخل public/uploads/catalogs.</span>
          </label>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-secondary">
            حفظ المنتج
          </button>
          <a href="/admin/products" className="btn-ghost">
            إلغاء
          </a>
        </div>
      </form>
    </div>
  );
}

function ProductAssets({ product }: { product: AdminProduct }) {
  return (
    <section className="surface-panel grid gap-5 p-6">
      <div>
        <h2 className="text-xl font-black text-primary">ملفات المنتج الحالية</h2>
        <p className="mt-1 text-sm leading-6 text-muted">يمكن حذف الصور والكتالوجات أو تعيين صورة رئيسية مختلفة.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {product.images.length > 0 ? (
          product.images.map((image) => (
            <article key={image.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <div className="relative aspect-square bg-slate-100">
                <Image src={image.url} alt={image.alt ?? product.nameAr} fill sizes="220px" className="object-cover" />
                {image.isMain ? <span className="badge-accent absolute right-3 top-3">رئيسية</span> : null}
              </div>
              <div className="grid gap-2 p-3">
                {!image.isMain ? (
                  <form action={setMainProductImageAction.bind(null, product.id, image.id)}>
                    <button className="w-full rounded-xl border border-border px-3 py-2 text-xs font-black text-primary hover:border-secondary">
                      تعيين كرئيسية
                    </button>
                  </form>
                ) : null}
                <form action={deleteProductImageAction.bind(null, product.id, image.id)}>
                  <button className="w-full rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-100">
                    حذف الصورة
                  </button>
                </form>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-slate-50 p-5 text-sm font-bold text-muted">لا توجد صور لهذا المنتج.</div>
        )}
      </div>

      <div className="grid gap-3">
        {product.catalogs.length > 0 ? (
          product.catalogs.map((catalog) => (
            <div key={catalog.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black text-primary">{catalog.title}</p>
                <a href={catalog.fileUrl} target="_blank" className="text-sm font-bold text-dark-gold">
                  عرض ملف PDF
                </a>
              </div>
              <form action={deleteProductCatalogAction.bind(null, product.id, catalog.id)}>
                <button className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-black text-rose-700 hover:bg-rose-100">
                  حذف الكتالوج
                </button>
              </form>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-slate-50 p-5 text-sm font-bold text-muted">لا توجد كتالوجات لهذا المنتج.</div>
        )}
      </div>
    </section>
  );
}

function ToggleField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-[#A8844F]" />
      {label}
    </label>
  );
}

function AdminField({
  name,
  label,
  type = "text",
  defaultValue,
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input name={name} type={type} defaultValue={defaultValue} required={required} min={type === "number" ? 0 : undefined} className={inputClass} />
    </label>
  );
}
