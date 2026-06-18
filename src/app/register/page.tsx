import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-950">إنشاء حساب</h1>
        <form className="mt-6 grid gap-4">
          {["الاسم الكامل", "البريد الإلكتروني", "رقم الهاتف", "كلمة المرور"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
              {label}
              <input type={label === "كلمة المرور" ? "password" : "text"} className="h-12 border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-500 focus:bg-white" />
            </label>
          ))}
          <button className="h-12 bg-slate-950 text-sm font-black text-white hover:bg-teal-700">إنشاء الحساب</button>
        </form>
        <p className="mt-5 text-sm font-bold text-slate-600">
          لديك حساب؟ <Link href="/login" className="text-teal-700">تسجيل الدخول</Link>
        </p>
      </section>
    </div>
  );
}
