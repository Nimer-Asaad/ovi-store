import Link from "next/link";
import { PackageCheck, UserRound, WalletCards } from "lucide-react";
import { formatPrice, mockOrders } from "@/data/mock";

export default function AccountPage() {
  const total = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border border-slate-200 bg-white p-6">
        <p className="text-sm font-black text-teal-700">حسابي</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">مرحبا، محمود</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">نموذج واجهة حساب عميل قبل ربط المصادقة الحقيقية.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "الطلبات", value: `${mockOrders.length}`, icon: PackageCheck },
          { title: "إجمالي المشتريات", value: formatPrice(total), icon: WalletCards },
          { title: "نوع الحساب", value: "عميل جملة", icon: UserRound },
        ].map(({ title, value, icon: Icon }) => (
          <div key={title} className="border border-slate-200 bg-white p-5">
            <Icon className="h-6 w-6 text-teal-700" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
          </div>
        ))}
      </section>

      <Link href="/account/orders" className="w-fit bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-teal-700">
        عرض الطلبات
      </Link>
    </div>
  );
}
