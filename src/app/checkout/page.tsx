import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CreditCard, MapPin, PackageCheck, Phone, UserRound } from "lucide-react";
import { formatPrice, mockProducts } from "@/data/mock";
import { getCurrentUser } from "@/lib/auth";
import { getVisibleUnitPrice } from "@/lib/pricing";

const customerFields = [
  { label: "الاسم الكامل", icon: UserRound, type: "text", placeholder: "مثال: أحمد محمد" },
  { label: "رقم الهاتف", icon: Phone, type: "tel", placeholder: "0599 000 000" },
];

const shippingFields = [
  { label: "المدينة", icon: MapPin, type: "text", placeholder: "رام الله" },
  { label: "العنوان التفصيلي", icon: MapPin, type: "text", placeholder: "الحي، الشارع، أقرب معلم" },
];

export default async function CheckoutPage() {
  const currentUser = await getCurrentUser();
  const checkoutItems = mockProducts.filter((product) => product.visible).slice(0, 3);
  const total = checkoutItems.reduce((sum, product) => sum + getVisibleUnitPrice(product, currentUser).finalAmount, 0);
  const shipping = 20;

  return (
    <main className="app-container py-8 sm:py-10">
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="badge-primary">الدفع والشحن</span>
          <h1 className="mt-3 text-3xl font-black text-primary sm:text-4xl">إكمال بيانات الطلب</h1>
          <p className="mt-2 text-sm leading-7 text-muted">نموذج نظيف للدفع عند الاستلام، مع ملخص واضح للمنتجات قبل تأكيد الطلب.</p>
        </div>
        <Link href="/cart" className="btn-ghost w-fit">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          العودة للسلة
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="surface-panel p-5 sm:p-7">
          <form className="grid gap-7">
            <FieldGroup title="بيانات العميل" description="معلومات التواصل الأساسية لتأكيد الطلب.">
              {customerFields.map(({ label, icon: Icon, type, placeholder }) => (
                <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
                  {label}
                  <span className="relative">
                    <Icon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                    <input type={type} placeholder={placeholder} className="form-control h-12 w-full pr-11" />
                  </span>
                </label>
              ))}
            </FieldGroup>

            <FieldGroup title="عنوان التسليم" description="اكتب العنوان بوضوح لتسهيل تجهيز الطلب.">
              {shippingFields.map(({ label, icon: Icon, type, placeholder }) => (
                <label key={label} className="grid gap-2 text-sm font-black text-slate-700">
                  {label}
                  <span className="relative">
                    <Icon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                    <input type={type} placeholder={placeholder} className="form-control h-12 w-full pr-11" />
                  </span>
                </label>
              ))}
              <label className="grid gap-2 text-sm font-black text-slate-700 sm:col-span-2">
                ملاحظات الطلب
                <textarea placeholder="أي ملاحظات خاصة بالتوصيل أو الكميات..." className="form-control min-h-28 w-full p-4" />
              </label>
            </FieldGroup>

            <div className="rounded-3xl border border-border bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-soft">
                  <CreditCard className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-black text-primary">طريقة الدفع</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">الدفع عند الاستلام حاليا. سيتم ربط بوابات الدفع لاحقا.</p>
                </div>
              </div>
            </div>

            <button type="button" className="btn-primary h-12 w-full">
              تأكيد الطلب
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>

        <aside className="surface-panel h-fit p-5 sm:p-6 lg:sticky lg:top-32">
          <h2 className="text-xl font-black text-primary">ملخص الطلب</h2>
          <p className="mt-2 text-sm leading-7 text-muted">الأسعار المعروضة تعتمد على نوع الحساب الحالي.</p>
          <div className="mt-5 grid gap-3 border-t border-border pt-5">
            {checkoutItems.map((product) => (
              <div key={product.slug} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3">
                <div className="grid aspect-square place-items-center rounded-2xl bg-[linear-gradient(135deg,#0F172A,#1E293B_52%,#A8844F)] text-sm font-black text-[#f7ead2]">
                  {product.categoryName.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-primary">{product.name}</p>
                  <p className="mt-1 text-xs font-bold text-muted">{product.categoryName}</p>
                </div>
                <span className="text-sm font-black text-primary">{formatPrice(getVisibleUnitPrice(product, currentUser).finalAmount)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm font-bold text-muted">
            <SummaryRow label="المجموع" value={formatPrice(total)} />
            <SummaryRow label="التوصيل" value={formatPrice(shipping)} />
            <div className="flex justify-between border-t border-border pt-3 text-xl font-black text-primary">
              <span>الإجمالي</span>
              <span>{formatPrice(total + shipping)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function FieldGroup({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-3xl border border-border bg-white p-4 sm:p-5">
      <legend className="px-2 text-lg font-black text-primary">{title}</legend>
      <p className="mb-4 mt-1 text-sm leading-6 text-muted">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
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
