import Link from "next/link";
import { PriceDisplay } from "@/components/PriceDisplay";
import { formatPrice, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";
import { getVisibleUnitPrice } from "@/lib/pricing";

const cartItems = mockProducts.filter((product) => product.visible).slice(0, 3).map((product, index) => ({
  product,
  quantity: index + 1,
}));

export default async function CartPage() {
  const role = await getCurrentDemoRole();
  const total = cartItems.reduce((sum, item) => sum + getVisibleUnitPrice(item.product, role).finalAmount * item.quantity, 0);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[1fr_360px]">
      <section className="surface-panel p-6">
        <h1 className="text-3xl font-black text-primary">سلة المشتريات</h1>
        <div className="mt-6 grid gap-4">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.slug} className="grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-soft sm:grid-cols-[96px_1fr_auto] sm:items-center">
              <div className="h-24 rounded-2xl bg-slate-100" />
              <div>
                <h2 className="font-black text-primary">{product.name}</h2>
                <p className="mt-1 text-sm font-bold text-muted">الكمية: {quantity}</p>
                <div className="mt-3">
                  <PriceDisplay product={product} role={role} variant="line" />
                </div>
              </div>
              <p className="text-lg font-black text-primary">{formatPrice(getVisibleUnitPrice(product, role).finalAmount * quantity)}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="surface-panel h-fit p-6">
        <h2 className="text-xl font-black text-primary">ملخص الطلب</h2>
        <div className="mt-5 grid gap-3 text-sm font-bold text-muted">
          <div className="flex justify-between"><span>المجموع</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between"><span>التوصيل</span><span>{formatPrice(20)}</span></div>
          <div className="flex justify-between border-t border-border pt-3 text-lg font-black text-primary"><span>الإجمالي</span><span>{formatPrice(total + 20)}</span></div>
        </div>
        <Link href="/checkout" className="btn-secondary mt-6 flex h-12 w-full">
          إتمام الشراء
        </Link>
      </aside>
    </div>
  );
}
