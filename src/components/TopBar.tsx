import { Truck, WalletCards } from "lucide-react";
import { DemoRoleSwitcher } from "@/components/DemoRoleSwitcher";
import { getCurrentDemoRole } from "@/lib/demo-user";

export async function TopBar() {
  const currentRole = await getCurrentDemoRole();

  return (
    <div className="border-b border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs font-semibold sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-teal-300" aria-hidden="true" />
          <span>توصيل سريع للطلبات المحلية وتجهيز خاص لطلبات الجملة</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <WalletCards className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <span>أسعار جملة عند طلب 10 قطع أو أكثر</span>
        </div>
        <DemoRoleSwitcher currentRole={currentRole} />
      </div>
    </div>
  );
}
