import { AdminSidebar } from "@/components/AdminSidebar";
import {
  createSupplierAction,
  deleteSupplierAction,
  toggleSupplierActiveAction,
  updateSupplierAction,
} from "@/lib/admin-catalog";
import { prisma } from "@/lib/db";

const inputClass = "form-control h-11 px-3";

export default async function AdminSuppliersPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [params, suppliers] = await Promise.all([
    searchParams,
    prisma.supplier.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة الموردين</p>
          <h1 className="mt-4 text-3xl font-black text-primary">الموردون</h1>
          <p className="mt-2 text-sm leading-7 text-muted">إدارة الموردين الذين يمكن ربطهم بالمنتجات داخل لوحة التحكم.</p>
        </div>

        {params.error ? <ErrorMessage message={params.error} /> : null}

        <form action={createSupplierAction} className="surface-panel grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-5">
          <h2 className="text-xl font-black text-primary md:col-span-2 xl:col-span-5">إضافة مورد</h2>
          <Field name="name" label="اسم المورد" required />
          <Field name="phone" label="الهاتف" />
          <Field name="email" label="البريد الإلكتروني" type="email" />
          <Field name="address" label="العنوان" />
          <Toggle name="isActive" label="نشط" defaultChecked />
          <div className="md:col-span-2 xl:col-span-5">
            <button className="btn-secondary">حفظ المورد</button>
          </div>
        </form>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {suppliers.map((supplier) => (
            <article key={supplier.id} className="surface-card p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-primary">{supplier.name}</h2>
                  <p className="mt-1 text-sm font-bold text-muted">{supplier.phone || "لا يوجد هاتف"}</p>
                  <p className="mt-1 text-sm font-bold text-muted">{supplier.email || "لا يوجد بريد"}</p>
                </div>
                <span className={supplier.isActive ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                  {supplier.isActive ? "نشط" : "متوقف"}
                </span>
              </div>

              <form action={updateSupplierAction.bind(null, supplier.id)} className="grid gap-3">
                <Field name="name" label="اسم المورد" defaultValue={supplier.name} required />
                <Field name="phone" label="الهاتف" defaultValue={supplier.phone ?? ""} />
                <Field name="email" label="البريد الإلكتروني" type="email" defaultValue={supplier.email ?? ""} />
                <Field name="address" label="العنوان" defaultValue={supplier.address ?? ""} />
                <Toggle name="isActive" label="نشط" defaultChecked={supplier.isActive} />
                <button className="w-fit rounded-lg bg-primary px-4 py-2 text-xs font-black text-white hover:bg-soft-navy">تحديث</button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="badge bg-slate-100 text-muted">{supplier._count.products} منتج</span>
                <div className="flex flex-wrap gap-2">
                  <form action={toggleSupplierActiveAction.bind(null, supplier.id)}>
                    <button className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary hover:text-dark-gold">
                      {supplier.isActive ? "تعطيل" : "تفعيل"}
                    </button>
                  </form>
                  <form action={deleteSupplierAction.bind(null, supplier.id)}>
                    <button className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50" disabled={supplier._count.products > 0}>
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

function Field({
  name,
  label,
  defaultValue,
  required = false,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input name={name} type={type} defaultValue={defaultValue} required={required} className={inputClass} />
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
