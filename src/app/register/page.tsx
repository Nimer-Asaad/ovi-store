import Link from "next/link";
import { redirect } from "next/navigation";
import { registerUser } from "@/lib/auth";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  async function registerAction(formData: FormData) {
    "use server";

    const result = await registerUser({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: "CUSTOMER",
      priceGroup: "RETAIL",
      isApproved: true,
    });

    if (!result.ok) {
      redirect(`/register?error=${encodeURIComponent(result.error)}`);
    }

    redirect("/account");
  }

  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-xl p-6 sm:p-8">
        <h1 className="text-3xl font-black text-primary">إنشاء حساب</h1>
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
            كلمة المرور
            <input name="password" type="password" className="form-control h-12" minLength={8} required />
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
