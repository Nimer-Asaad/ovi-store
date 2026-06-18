import { AdminSidebar } from "@/components/AdminSidebar";
import { formatPrice, mockCustomers } from "@/data/mock";

const merchantLabels = {
  approved: "معتمد",
  pending: "بانتظار الموافقة",
  rejected: "مرفوض",
  not_requested: "لم يطلب",
};

export default function AdminCustomersPage() {
  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة العملاء</p>
          <h1 className="mt-4 text-3xl font-black text-primary">العملاء وحسابات التجار</h1>
          <p className="mt-2 text-sm text-muted">تعيين نوع العميل ومجموعة السعر والموافقة على حسابات التجار.</p>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">العميل</th>
                  <th className="p-4">الهاتف</th>
                  <th className="p-4">الدور</th>
                  <th className="p-4">مجموعة السعر</th>
                  <th className="p-4">حساب تاجر</th>
                  <th className="p-4">الطلبات</th>
                  <th className="p-4">إجمالي الشراء</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {mockCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="p-4">
                      <p className="font-black text-primary">{customer.name}</p>
                      <p className="mt-1 text-xs text-muted">{customer.email}</p>
                    </td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">
                      <select defaultValue={customer.role} className="form-control h-10 px-3 text-xs">
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="MERCHANT">MERCHANT</option>
                        <option value="DEALER">DEALER</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select defaultValue={customer.priceGroup} className="form-control h-10 px-3 text-xs">
                        <option value="retail">Retail</option>
                        <option value="merchant">Merchant</option>
                        <option value="dealer">Dealer</option>
                      </select>
                    </td>
                    <td className="p-4">{merchantLabels[customer.merchantStatus]}</td>
                    <td className="p-4">{customer.totalOrders}</td>
                    <td className="p-4">{formatPrice(customer.totalSpent)}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="rounded-lg bg-secondary px-3 py-2 text-xs font-black text-primary hover:bg-accent">اعتماد</button>
                        <button type="button" className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50">رفض</button>
                        <button type="button" className="rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700 hover:border-secondary">حفظ</button>
                      </div>
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
