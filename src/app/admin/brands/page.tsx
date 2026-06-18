import { AdminSidebar } from "@/components/AdminSidebar";
import { createBrandAction, deleteBrandAction, toggleBrandVisibilityAction, updateBrandAction } from "@/lib/admin-catalog";
import { prisma } from "@/lib/db";

const inputClass = "form-control h-11 px-3";

export default async function AdminBrandsPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [params, brands] = await Promise.all([
    searchParams,
    prisma.brand.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة العلامات</p>
          <h1 className="mt-4 text-3xl font-black text-primary">العلامات التجارية</h1>
          <p className="mt-2 text-sm leading-7 text-muted">أضف وعدل العلامات التي تظهر في كتالوج المنتجات.</p>
        </div>

        {params.error ? <ErrorMessage message={params.error} /> : null}

        <form action={createBrandAction} className="surface-panel grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <h2 className="text-xl font-black text-primary md:col-span-2 xl:col-span-4">إضافة علامة تجارية</h2>
          <Field name="name" label="اسم العلامة" required />
          <Field name="slug" label="Slug" required />
          <Field name="logoUrl" label="رابط الشعار اختياري" />
          <Toggle name="isVisible" label="ظاهرة" defaultChecked />
          <div className="md:col-span-2 xl:col-span-4">
            <button className="btn-secondary">حفظ العلامة</button>
          </div>
        </form>

        <div className="grid gap-4 xl:grid-cols-2">
          {brands.map((brand) => (
            <article key={brand.id} className="surface-card p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-primary">{brand.name}</h2>
                  <p className="mt-1 text-sm font-bold text-muted">{brand.slug}</p>
                </div>
                <span className={brand.isVisible ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                  {brand.isVisible ? "ظاهرة" : "مخفية"}
                </span>
              </div>

              <form action={updateBrandAction.bind(null, brand.id)} className="grid gap-3 sm:grid-cols-2">
                <Field name="name" label="اسم العلامة" defaultValue={brand.name} required />
                <Field name="slug" label="Slug" defaultValue={brand.slug} required />
                <Field name="logoUrl" label="رابط الشعار" defaultValue={brand.logoUrl ?? ""} />
                <Toggle name="isVisible" label="ظاهرة في المتجر" defaultChecked={brand.isVisible} />
                <div>
                  <button className="rounded-lg bg-primary px-4 py-2 text-xs font-black text-white hover:bg-soft-navy">تحديث</button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="badge bg-slate-100 text-muted">{brand._count.products} منتج</span>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleBrandVisibilityAction.bind(null, brand.id)}>
                    <button className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary hover:text-dark-gold">
                      {brand.isVisible ? "إخفاء" : "إظهار"}
                    </button>
                  </form>
                  <form action={deleteBrandAction.bind(null, brand.id)}>
                    <button className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50" disabled={brand._count.products > 0}>
                      حذف
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-black text-rose-700">{message}</div>;
}

function Field({ name, label, defaultValue, required = false }: { name: string; label: string; defaultValue?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input name={name} defaultValue={defaultValue} required={required} className={inputClass} />
    </label>
  );
}

function Toggle({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-2xl bg-slate-50 px-4 text-sm font-black text-slate-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-5 w-5 accent-[#A8844F]" />
      {label}
    </label>
  );
}
