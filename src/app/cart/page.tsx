import Link from "next/link";
import { ArrowLeft, Minus, PackageCheck, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { formatPrice, mockProducts } from "@/data/mock";
import { getCurrentUser } from "@/lib/auth";
import { getVisibleUnitPrice } from "@/lib/pricing";

const cartItems = mockProducts.filter((product) => product.visible).slice(0, 3).map((product, index) => ({
  product,
  quantity: index + 1,
}));

export default async function CartPage() {
  const currentUser = await getCurrentUser();
  const total = cartItems.reduce((sum, item) => sum + getVisibleUnitPrice(item.product, currentUser).finalAmount * item.quantity, 0);

  return (
    <main className="app-container py-8 sm:py-10">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="badge-primary">سلة المشتريات</span>
          <h1 className="mt-3 text-3xl font-black text-primary sm:text-4xl">راجع طلبك قبل الإرسال</h1>
          <p className="mt-2 text-sm leading-7 text-muted">الكميات والأسعار هنا تجريبية وتستخدم نفس منطق التسعير حسب نوع الحساب.</p>
        </div>
        <Link href="/products" className="btn-ghost w-fit">
          متابعة التسوق
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="surface-panel p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-primary">المنتجات المختارة</h2>
            <span className="badge border border-border bg-white text-muted">{cartItems.length} عناصر</span>
          </div>
          <div className="grid gap-4">
            {cartItems.map(({ product, quantity }) => {
              const lineTotal = getVisibleUnitPrice(product, currentUser).finalAmount * quantity;

              return (
                <article key={product.slug} className="grid gap-4 rounded-[1.25rem] border border-border bg-white p-4 shadow-soft sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                  <Link href={`/products/${product.slug}`} className="grid aspect-square place-items-center rounded-2xl bg-[linear-gradient(135deg,#0F172A,#1E293B_52%,#A8844F)] p-4 text-xl font-black text-[#f7ead2]">
                    {product.categoryName.slice(0, 2)}
                  </Link>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-slate-100 text-slate-700">{product.categoryName}</span>
                      <span className="badge border border-border bg-white text-muted">{product.sku}</span>
                    </div>
                    <Link href={`/products/${product.slug}`} className="mt-3 block text-lg font-black leading-7 text-primary hover:text-dark-gold">
                      {product.name}
                    </Link>
                    <div className="mt-3">
                      <PriceDisplay product={product} viewer={currentUser} variant="line" />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <div className="flex h-10 items-center rounded-2xl border border-border bg-slate-50 p-1">
                        <button type="button" className="grid h-8 w-8 place-items-center rounded-xl text-primary transition hover:bg-white" aria-label="زيادة الكمية">
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="grid h-8 w-10 place-items-center text-sm font-black text-primary">{quantity}</span>
                        <button type="button" className="grid h-8 w-8 place-items-center rounded-xl text-primary transition hover:bg-white" aria-label="تقليل الكمية">
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button type="button" className="inline-flex h-10 items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 text-sm font-black text-rose-700 transition hover:bg-rose-100">
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        حذف
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 text-left sm:text-right">
                    <p className="text-xs font-black text-muted">الإجمالي</p>
                    <p className="mt-1 text-xl font-black text-primary">{formatPrice(lineTotal)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="surface-panel h-fit p-5 sm:p-6 lg:sticky lg:top-32">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white">
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-black text-primary">ملخص الطلب</h2>
              <p className="text-sm font-bold text-muted">دفع عند الاستلام حاليا</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm font-bold text-muted">
            <SummaryRow label="المجموع" value={formatPrice(total)} />
            <SummaryRow label="التوصيل" value={formatPrice(20)} />
            <SummaryRow label="الخصومات" value={formatPrice(0)} />
            <div className="mt-2 flex justify-between border-t border-border pt-4 text-xl font-black text-primary">
              <span>الإجمالي</span>
              <span>{formatPrice(total + 20)}</span>
            </div>
          </div>
          <Link href="/checkout" className="btn-secondary mt-6 flex h-12 w-full">
            إتمام الشراء
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
          </Link>
          <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs font-bold leading-6 text-muted">
            سيتم تأكيد توفر المنتجات وطريقة التسليم عند مراجعة الطلب.
          </p>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-primary">{value}</span>
    </div>
  );
}
