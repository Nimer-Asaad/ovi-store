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
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-sm font-black text-teal-700">إدارة العملاء</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">العملاء وحسابات التجار</h1>
          <p className="mt-2 text-sm text-slate-600">تعيين نوع العميل ومجموعة السعر والموافقة على حسابات التجار.</p>
        </div>

        <div className="overflow-hidden border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-slate-600">
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
                      <p className="font-black text-slate-950">{customer.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{customer.email}</p>
                    </td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">
                      <select defaultValue={customer.role} className="h-10 border border-slate-200 bg-slate-50 px-3 text-xs font-black">
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="MERCHANT">MERCHANT</option>
                        <option value="DEALER">DEALER</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select defaultValue={customer.priceGroup} className="h-10 border border-slate-200 bg-slate-50 px-3 text-xs font-black">
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
                        <button type="button" className="bg-teal-600 px-3 py-2 text-xs font-black text-white hover:bg-teal-700">اعتماد</button>
                        <button type="button" className="border border-rose-200 px-3 py-2 text-xs font-black text-rose-700 hover:bg-rose-50">رفض</button>
                        <button type="button" className="border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:border-teal-300">حفظ</button>
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
