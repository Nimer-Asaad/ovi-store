import { formatPrice, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";
import { getVisibleUnitPrice } from "@/lib/pricing";

export default async function CheckoutPage() {
  const role = await getCurrentDemoRole();
  const checkoutItems = mockProducts.filter((product) => product.visible).slice(0, 3);
  const total = checkoutItems.reduce((sum, product) => sum + getVisibleUnitPrice(product, role).finalAmount, 0);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[1fr_360px]">
      <section className="surface-panel p-6">
        <h1 className="text-3xl font-black text-primary">الدفع والشحن</h1>
        <form className="mt-6 grid gap-4 sm:grid-cols-2">
          {["الاسم الكامل", "رقم الهاتف", "المدينة", "العنوان التفصيلي"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
              {label}
              <input className="form-control h-12" />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-black text-slate-700 sm:col-span-2">
            ملاحظات الطلب
            <textarea className="form-control min-h-28 p-4" />
          </label>
          <button className="btn-primary h-12 sm:col-span-2">تأكيد الطلب</button>
        </form>
      </section>

      <aside className="surface-panel h-fit p-6">
        <h2 className="text-xl font-black text-primary">طلبك</h2>
        <p className="mt-3 text-sm leading-7 text-muted">الدفع عند الاستلام حاليا. سيتم ربط بوابات الدفع لاحقا.</p>
        <div className="mt-5 grid gap-3 border-t border-border pt-4">
          {checkoutItems.map((product) => (
            <div key={product.slug} className="flex justify-between gap-3 text-sm font-bold text-muted">
              <span>{product.name}</span>
              <span className="text-primary">{formatPrice(getVisibleUnitPrice(product, role).finalAmount)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-between border-t border-border pt-4 text-lg font-black">
          <span>الإجمالي</span>
          <span>{formatPrice(total + 20)}</span>
        </div>
      </aside>
    </div>
  );
}
