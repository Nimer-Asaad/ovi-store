import { Phone, Truck, WalletCards } from "lucide-react";
import { DemoRoleSwitcher } from "@/components/DemoRoleSwitcher";
import { getCurrentDemoRole } from "@/lib/demo-user";

export async function TopBar() {
  const currentRole = await getCurrentDemoRole();

  return (
    <div className="border-b border-white/10 bg-primary text-white">
      <div className="app-container flex flex-col gap-2 py-2 text-xs font-bold md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-200">
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" aria-hidden="true" />
            0599 000 000
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="h-4 w-4 text-secondary" aria-hidden="true" />
            توصيل سريع وتجهيز خاص لطلبات الجملة
          </span>
        </div>
        <div className="hidden items-center gap-2 text-slate-200 lg:flex">
          <WalletCards className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>أسعار جملة عند طلب 10 قطع أو أكثر</span>
        </div>
        <DemoRoleSwitcher currentRole={currentRole} />
      </div>
    </div>
  );
}
