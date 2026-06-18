import { Boxes, PackageCheck, Truck } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function SupplierPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="app-container flex flex-col gap-6 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <p className="badge-primary w-fit">لوحة المورد</p>
        <h1 className="mt-4 text-3xl font-black text-primary">أهلا بك، {currentUser.name}</h1>
        <p className="mt-3 text-sm leading-7 text-muted">من هنا تتم متابعة التوريد، الأصناف، وحالة الشحنات.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "الطلبات الواردة", value: "18", icon: PackageCheck },
          { title: "الشحنات الجارية", value: "4", icon: Truck },
          { title: "أصناف التوريد", value: "مُحدَّثة", icon: Boxes },
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