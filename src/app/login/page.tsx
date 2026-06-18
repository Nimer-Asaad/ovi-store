import Link from "next/link";
import { redirect } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  async function loginAction(formData: FormData) {
    "use server";

    const result = await loginUser(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""));

    if (!result.ok) {
      redirect(`/login?error=${encodeURIComponent(result.error)}`);
    }

    redirect("/account");
  }

  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-xl p-6 sm:p-8">
        <h1 className="text-3xl font-black text-primary">تسجيل الدخول</h1>
        {error ? (
          <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700">
            {error}
          </p>
        ) : null}
        <form action={loginAction} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            البريد الإلكتروني
            <input name="email" type="email" className="form-control h-12" required />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            كلمة المرور
            <input name="password" type="password" className="form-control h-12" required />
          </label>
          <button className="btn-secondary h-12">دخول</button>
        </form>
        <p className="mt-5 text-sm font-bold text-muted">
          لا تملك حسابا؟ <Link href="/register" className="text-dark-gold">إنشاء حساب</Link>
        </p>
      </section>
    </div>
  );
}
