import Link from "next/link";
import { PackageCheck, UserRound, WalletCards } from "lucide-react";
import { formatPrice, mockOrders } from "@/data/mock";

export default function AccountPage() {
  const total = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="app-container flex flex-col gap-6 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <p className="badge-primary w-fit">حسابي</p>
        <h1 className="mt-4 text-3xl font-black text-primary">مرحبا، محمود</h1>
        <p className="mt-3 text-sm leading-7 text-muted">نموذج واجهة حساب عميل قبل ربط المصادقة الحقيقية.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "الطلبات", value: `${mockOrders.length}`, icon: PackageCheck },
          { title: "إجمالي المشتريات", value: formatPrice(total), icon: WalletCards },
          { title: "نوع الحساب", value: "عميل جملة", icon: UserRound },
        ].map(({ title, value, icon: Icon }) => (
          <div key={title} className="surface-card p-5">
            <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-muted">{title}</p>
            <p className="mt-1 text-2xl font-black text-primary">{value}</p>
          </div>
        ))}
      </section>

      <Link href="/account/orders" className="btn-primary w-fit">
        عرض الطلبات
      </Link>
    </div>
  );
}
