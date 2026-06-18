import { AlertTriangle, LogOut, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser, getRoleLandingPath, logoutUser } from "@/lib/auth";
import { roleLabels } from "@/lib/user-roles";

export default async function PendingApprovalPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.isApproved) {
    redirect(getRoleLandingPath(currentUser));
  }

  async function logoutAction() {
    "use server";

    await logoutUser();
    redirect("/");
  }

  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="badge-primary w-fit">قيد المراجعة</p>
            <h1 className="mt-4 text-3xl font-black text-primary">مرحبًا {currentUser.name}</h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              حسابك موجود بالفعل، لكنه بانتظار الموافقة قبل فتح الوصول الكامل.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge bg-[#f7ead2] text-[#73572f]">{roleLabels[currentUser.role]}</span>
            <span className="badge bg-amber-100 text-amber-800">بانتظار الموافقة</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="surface-card p-5">
            <ShieldCheck className="h-6 w-6 text-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-black text-primary">ما الذي يحدث الآن؟</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              يتم مراجعة معلومات الحساب من الإدارة. بمجرد الاعتماد ستنتقل تلقائيًا إلى لوحتك المناسبة.
            </p>
          </div>
          <div className="surface-card p-5">
            <AlertTriangle className="h-6 w-6 text-dark-gold" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-black text-primary">هل تريد المغادرة؟</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              يمكنك تسجيل الخروج والعودة لاحقًا بعد مراجعة الحساب.
            </p>
            <form action={logoutAction} className="mt-4">
              <button className="btn-secondary">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-secondary/40 bg-[#fbf7ef] p-5 text-sm leading-7 text-slate-700">
          إذا كنت تعتقد أن الحساب يجب أن يُعتمد الآن، تواصل مع الإدارة مع نفس البريد الإلكتروني المسجل في الحساب.
        </div>
      </section>
    </div>
  );
}