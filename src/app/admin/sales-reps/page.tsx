import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockSalesReps } from "@/data/mock";

export default function AdminSalesRepsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-teal-700">إدارة المندوبين</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">مندوبو المبيعات</h1>
          </div>
          <button type="button" className="h-11 bg-teal-600 px-5 text-sm font-black text-white hover:bg-teal-700">إضافة مندوب</button>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-slate-600">
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
                    <td className="p-4 font-black text-slate-950">{rep.name}</td>
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
