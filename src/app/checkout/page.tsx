import { formatPrice, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";
import { getVisibleUnitPrice } from "@/lib/pricing";

export default async function CheckoutPage() {
  const role = await getCurrentDemoRole();
  const checkoutItems = mockProducts.slice(0, 3);
  const total = checkoutItems.reduce((sum, product) => sum + getVisibleUnitPrice(product, role).finalAmount, 0);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <section className="border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-950">الدفع والشحن</h1>
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          {["الاسم الكامل", "رقم الهاتف", "المدينة", "العنوان التفصيلي"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
              {label}
              <input className="h-12 border border-slate-200 bg-slate-50 px-4 outline-none focus:border-teal-500 focus:bg-white" />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-black text-slate-700 sm:col-span-2">
            ملاحظات الطلب
            <textarea className="min-h-28 border border-slate-200 bg-slate-50 p-4 outline-none focus:border-teal-500 focus:bg-white" />
          </label>
          <button className="h-12 bg-slate-950 text-sm font-black text-white hover:bg-teal-700 sm:col-span-2">تأكيد الطلب</button>
        </form>
      </section>

      <aside className="h-fit border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-black text-slate-950">طلبك</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">الدفع عند الاستلام حاليا. سيتم ربط بوابات الدفع لاحقا.</p>
        <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4">
          {checkoutItems.map((product) => (
            <div key={product.slug} className="flex justify-between gap-3 text-sm font-bold text-slate-600">
              <span>{product.name}</span>
              <span className="text-slate-950">{formatPrice(getVisibleUnitPrice(product, role).finalAmount)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 text-lg font-black">
          <span>الإجمالي</span>
          <span>{formatPrice(total + 20)}</span>
        </div>
      </aside>
    </div>
  );
}
