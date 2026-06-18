import { AdminSidebar } from "@/components/AdminSidebar";
import {
  createCategoryAction,
  deleteCategoryAction,
  toggleCategoryVisibilityAction,
  updateCategoryAction,
} from "@/lib/admin-catalog";
import { prisma } from "@/lib/db";

const inputClass = "form-control h-11 px-3";

export default async function AdminCategoriesPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [params, categories] = await Promise.all([
    searchParams,
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { nameAr: "asc" },
    }),
  ]);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة الأقسام</p>
          <h1 className="mt-4 text-3xl font-black text-primary">الأقسام</h1>
          <p className="mt-2 text-sm leading-7 text-muted">أنشئ وعدل أقسام المتجر، وتحكم بظهورها في الواجهة العامة.</p>
        </div>

        {params.error ? <ErrorMessage message={params.error} /> : null}

        <form action={createCategoryAction} className="surface-panel grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-5">
          <h2 className="text-xl font-black text-primary md:col-span-2 xl:col-span-5">إضافة قسم جديد</h2>
          <Field name="nameAr" label="الاسم العربي" required />
          <Field name="nameEn" label="الاسم الإنجليزي" required />
          <Field name="slug" label="Slug" required />
          <Field name="imageUrl" label="رابط الصورة اختياري" />
          <Toggle name="isVisible" label="ظاهر" defaultChecked />
          <div className="md:col-span-2 xl:col-span-5">
            <button className="btn-secondary">حفظ القسم</button>
          </div>
        </form>

        <div className="grid gap-4 xl:grid-cols-2">
          {categories.map((category) => (
            <article key={category.id} className="surface-card p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-primary">{category.nameAr}</h2>
                  <p className="mt-1 text-sm font-bold text-muted">{category.nameEn} - {category.slug}</p>
                </div>
                <span className={category.isVisible ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                  {category.isVisible ? "ظاهر" : "مخفي"}
                </span>
              </div>

              <form action={updateCategoryAction.bind(null, category.id)} className="grid gap-3 sm:grid-cols-2">
                <Field name="nameAr" label="الاسم العربي" defaultValue={category.nameAr} required />
                <Field name="nameEn" label="الاسم الإنجليزي" defaultValue={category.nameEn} required />
                <Field name="slug" label="Slug" defaultValue={category.slug} required />
                <Field name="imageUrl" label="رابط الصورة" defaultValue={category.imageUrl ?? ""} />
                <Toggle name="isVisible" label="ظاهر في المتجر" defaultChecked={category.isVisible} />
                <div className="flex flex-wrap items-end gap-2">
                  <button className="rounded-lg bg-primary px-4 py-2 text-xs font-black text-white hover:bg-soft-navy">تحديث</button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="badge bg-slate-100 text-muted">{category._count.products} منتج</span>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleCategoryVisibilityAction.bind(null, category.id)}>
                    <button className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary hover:text-dark-gold">
                      {category.isVisible ? "إخفاء" : "إظهار"}
                    </button>
                  </form>
                  <form action={deleteCategoryAction.bind(null, category.id)}>
                    <button className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50" disabled={category._count.products > 0}>
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
