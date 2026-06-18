import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockSuppliers } from "@/data/mock";

export default function AdminSuppliersPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-teal-700">إدارة الموردين</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">الموردون</h1>
          </div>
          <button type="button" className="h-11 bg-teal-600 px-5 text-sm font-black text-white hover:bg-teal-700">إضافة مورد</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockSuppliers.map((supplier) => (
            <article key={supplier.id} className="border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">{supplier.name}</h2>
                  <p className="mt-1 text-sm font-bold text-slate-500">{supplier.contact} - {supplier.phone}</p>
                </div>
                <span className={supplier.status === "active" ? "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                  {supplier.status === "active" ? "نشط" : "متوقف"}
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 p-3">
                  <p className="font-bold text-slate-500">المنتجات</p>
                  <p className="mt-1 text-lg font-black text-slate-950">{supplier.products}</p>
                </div>
                <div className="bg-slate-50 p-3">
                  <p className="font-bold text-slate-500">الرصيد</p>
                  <p className="mt-1 text-lg font-black text-slate-950">{formatPrice(supplier.outstandingBalance)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
