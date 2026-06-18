import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-xl p-6 sm:p-8">
        <h1 className="text-3xl font-black text-primary">تسجيل الدخول</h1>
        <form className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            البريد الإلكتروني
            <input type="email" className="form-control h-12" />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            كلمة المرور
            <input type="password" className="form-control h-12" />
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
