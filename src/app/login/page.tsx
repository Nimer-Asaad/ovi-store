import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-black text-slate-950">تسجيل الدخول</h1>
        <form className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            البريد الإلكتروني
            <input type="email" className="h-12 border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-500 focus:bg-white" />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            كلمة المرور
            <input type="password" className="h-12 border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-500 focus:bg-white" />
          </label>
          <button className="h-12 bg-teal-600 text-sm font-black text-white hover:bg-teal-700">دخول</button>
        </form>
        <p className="mt-5 text-sm font-bold text-slate-600">
          لا تملك حسابا؟ <Link href="/register" className="text-teal-700">إنشاء حساب</Link>
        </p>
      </section>
    </div>
  );
}
