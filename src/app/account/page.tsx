import Link from "next/link";
import { PackageCheck, UserRound, WalletCards } from "lucide-react";
import { redirect } from "next/navigation";
import { formatPrice, mockOrders } from "@/data/mock";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { roleLabels } from "@/lib/user-roles";

export default async function AccountPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (!currentUser.isApproved) {
    redirect("/pending-approval");
  }

  async function logoutAction() {
    "use server";

    await logoutUser();
    redirect("/");
  }

  const total = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="app-container flex flex-col gap-6 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="badge-primary w-fit">حسابي</p>
            <h1 className="mt-4 text-3xl font-black text-primary">مرحبا، {currentUser.name}</h1>
            <p className="mt-3 text-sm leading-7 text-muted">هذا حسابك الحقيقي الآن مع الجلسة والبحث بالدور والصلاحية.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge bg-[#f7ead2] text-[#73572f]">{roleLabels[currentUser.role]}</span>
            <span className="badge bg-emerald-100 text-emerald-800">{currentUser.isApproved ? "معتمد" : "بانتظار الموافقة"}</span>
            <form action={logoutAction}>
              <button className="btn-secondary">تسجيل الخروج</button>
            </form>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "الطلبات", value: `${mockOrders.length}`, icon: PackageCheck },
          { title: "إجمالي المشتريات", value: formatPrice(total), icon: WalletCards },
          { title: "نوع الحساب", value: roleLabels[currentUser.role], icon: UserRound },
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
