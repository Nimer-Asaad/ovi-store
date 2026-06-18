import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getRoleLandingPath, registerUser } from "@/lib/auth";
import { publicRegistrationRoles } from "@/lib/user-roles";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(getRoleLandingPath(currentUser));
  }

  async function registerAction(formData: FormData) {
    "use server";

    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const role = String(formData.get("role") ?? "CUSTOMER");

    if (password !== confirmPassword) {
      redirect(`/register?error=${encodeURIComponent("كلمتا المرور غير متطابقتين.")}`);
    }

    const result = await registerUser({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      password,
      role: role as "ADMIN" | "CUSTOMER" | "MERCHANT" | "DEALER" | "SALES_REP" | "SUPPLIER",
    });

    if (!result.ok) {
      redirect(`/register?error=${encodeURIComponent(result.error)}`);
    }

    redirect(getRoleLandingPath(result.user));
  }

  const registrationLabels = {
    CUSTOMER: "زبون عادي",
    MERCHANT: "تاجر / محل",
    DEALER: "وكيل",
    SUPPLIER: "مورد",
  } as const;

  const registrationOptionsWithLabels = publicRegistrationRoles.map((role) => ({
    value: role,
    label: registrationLabels[role],
  }));

  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-xl p-6 sm:p-8">
        <p className="badge-primary w-fit">حساب جديد</p>
        <h1 className="mt-4 text-3xl font-black text-primary">إنشاء حساب</h1>
        <p className="mt-3 text-sm leading-7 text-muted">أنشئ حسابك واختر نوعه المناسب، وسيُحوَّل الحساب المعلّق إلى صفحة انتظار الموافقة.</p>
        {error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700">
            {error}
          </p>
        ) : null}
        <form action={registerAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            الاسم الكامل
            <input name="name" type="text" className="form-control h-12" required />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            البريد الإلكتروني
            <input name="email" type="email" className="form-control h-12" required />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            رقم الهاتف
            <input name="phone" type="tel" className="form-control h-12" />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            نوع الحساب
            <select name="role" className="form-control h-12" defaultValue="CUSTOMER" required>
              {registrationOptionsWithLabels.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            كلمة المرور
            <input name="password" type="password" className="form-control h-12" minLength={8} required />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            تأكيد كلمة المرور
            <input name="confirmPassword" type="password" className="form-control h-12" minLength={8} required />
          </label>
          <button className="btn-primary h-12">إنشاء الحساب</button>
        </form>
        <p className="mt-5 text-sm font-bold text-muted">
          لديك حساب؟ <Link href="/login" className="text-dark-gold">تسجيل الدخول</Link>
        </p>
      </section>
    </div>
  );
}
