import { Truck, WalletCards } from "lucide-react";
import { DemoRoleSwitcher } from "@/components/DemoRoleSwitcher";
import { getCurrentDemoRole } from "@/lib/demo-user";

export async function TopBar() {
  const currentRole = await getCurrentDemoRole();

  return (
    <div className="border-b border-white/10 bg-primary text-white">
      <div className="app-container flex flex-col gap-2 py-2.5 text-xs font-bold sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-secondary" aria-hidden="true" />
          <span>توصيل سريع للطلبات المحلية وتجهيز خاص لطلبات الجملة</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <WalletCards className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>أسعار جملة عند طلب 10 قطع أو أكثر</span>
        </div>
        <DemoRoleSwitcher currentRole={currentRole} />
      </div>
    </div>
  );
}
