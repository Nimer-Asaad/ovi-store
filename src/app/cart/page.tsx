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
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <section className="border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-black text-slate-950">سلة المشتريات</h1>
        <div className="mt-6 grid gap-4">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.slug} className="grid gap-4 border border-slate-200 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
              <div className={`h-24 bg-gradient-to-br ${product.color}`} />
              <div>
                <h2 className="font-black text-slate-950">{product.name}</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">الكمية: {quantity}</p>
                <div className="mt-3">
                  <PriceDisplay product={product} role={role} variant="line" />
                </div>
              </div>
              <p className="text-lg font-black text-slate-950">{formatPrice(getVisibleUnitPrice(product, role).finalAmount * quantity)}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="h-fit border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-black text-slate-950">ملخص الطلب</h2>
        <div className="mt-5 grid gap-3 text-sm font-bold text-slate-600">
          <div className="flex justify-between"><span>المجموع</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between"><span>التوصيل</span><span>{formatPrice(20)}</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-black text-slate-950"><span>الإجمالي</span><span>{formatPrice(total + 20)}</span></div>
        </div>
        <Link href="/checkout" className="mt-6 flex h-12 items-center justify-center bg-teal-600 text-sm font-black text-white hover:bg-teal-700">
          إتمام الشراء
        </Link>
      </aside>
    </div>
  );
}
