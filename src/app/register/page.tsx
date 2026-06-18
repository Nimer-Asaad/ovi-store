import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="app-container flex justify-center py-12">
      <section className="surface-panel w-full max-w-xl p-6 sm:p-8">
        <h1 className="text-3xl font-black text-primary">إنشاء حساب</h1>
        <form className="mt-6 grid gap-4">
          {["الاسم الكامل", "البريد الإلكتروني", "رقم الهاتف", "كلمة المرور"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
              {label}
              <input type={label === "كلمة المرور" ? "password" : "text"} className="form-control h-12" />
            </label>
          ))}
          <button className="btn-primary h-12">إنشاء الحساب</button>
        </form>
        <p className="mt-5 text-sm font-bold text-muted">
          لديك حساب؟ <Link href="/login" className="text-teal-700">تسجيل الدخول</Link>
        </p>
      </section>
    </div>
  );
}
