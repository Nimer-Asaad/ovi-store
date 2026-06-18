import { PackageCheck, ReceiptText, Truck } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { roleLabels } from "@/lib/user-roles";

export default async function MerchantPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="app-container flex flex-col gap-6 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <p className="badge-primary w-fit">لوحة التاجر</p>
        <h1 className="mt-4 text-3xl font-black text-primary">مرحبًا، {currentUser.name}</h1>
        <p className="mt-3 text-sm leading-7 text-muted">
          {roleLabels[currentUser.role]} معتمد للوصول إلى أدوات الطلبات والأسعار التجارية.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "الطلبات المفتوحة", value: "12", icon: ReceiptText },
          { title: "المنتجات المتاحة", value: "86", icon: PackageCheck },
          { title: "التوصيل السريع", value: "جاهز", icon: Truck },
        ].map(({ title, value, icon: Icon }) => (
          <div key={title} className="surface-card p-5">
            <Icon className="h-6 w-6 text-secondary" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-muted">{title}</p>
            <p className="mt-1 text-2xl font-black text-primary">{value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}