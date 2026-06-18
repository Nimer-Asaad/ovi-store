import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockSalesReps } from "@/data/mock";

export default function AdminSalesRepsPage() {
  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="badge-primary w-fit">إدارة المندوبين</p>
            <h1 className="mt-4 text-3xl font-black text-primary">مندوبو المبيعات</h1>
          </div>
          <button type="button" className="btn-secondary">إضافة مندوب</button>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">المندوب</th>
                  <th className="p-4">الهاتف</th>
                  <th className="p-4">المنطقة</th>
                  <th className="p-4">عملاء نشطون</th>
                  <th className="p-4">مبيعات الشهر</th>
                  <th className="p-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockSalesReps.map((rep) => (
                  <tr key={rep.id}>
                    <td className="p-4 font-black text-primary">{rep.name}</td>
                    <td className="p-4">{rep.phone}</td>
                    <td className="p-4">{rep.territory}</td>
                    <td className="p-4">{rep.activeCustomers}</td>
                    <td className="p-4">{formatPrice(rep.monthlySales)}</td>
                    <td className="p-4">
                      <span className={rep.status === "active" ? "bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                        {rep.status === "active" ? "نشط" : "غير نشط"}
                      </span>
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
