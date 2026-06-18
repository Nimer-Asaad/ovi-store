import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockSuppliers } from "@/data/mock";

export default function AdminSuppliersPage() {
  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge-primary w-fit">إدارة الموردين</p>
            <h1 className="mt-4 text-3xl font-black text-primary">الموردون</h1>
          </div>
          <button type="button" className="btn-secondary">إضافة مورد</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockSuppliers.map((supplier) => (
            <article key={supplier.id} className="surface-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-primary">{supplier.name}</h2>
                  <p className="mt-1 text-sm font-bold text-muted">{supplier.contact} - {supplier.phone}</p>
                </div>
                <span className={supplier.status === "active" ? "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                  {supplier.status === "active" ? "نشط" : "متوقف"}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-muted">المنتجات</p>
                  <p className="mt-1 text-lg font-black text-primary">{supplier.products}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-muted">الرصيد</p>
                  <p className="mt-1 text-lg font-black text-primary">{formatPrice(supplier.outstandingBalance)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
