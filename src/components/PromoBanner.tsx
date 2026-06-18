import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="surface-card p-6 md:col-span-2">
        <p className="badge-primary w-fit">عرض الافتتاح</p>
        <h2 className="mt-4 text-2xl font-black leading-9 text-primary">خصم خاص على شواحن GaN وكيابل Type-C للطلبات الكبيرة</h2>
        <Link href="/categories/chargers" className="mt-4 inline-flex text-sm font-black text-dark-gold hover:text-primary">
          مشاهدة الشواحن
        </Link>
      </div>
      <div className="surface-card p-6">
        <p className="badge-accent w-fit">تجهيز محلات</p>
        <h2 className="mt-4 text-xl font-black leading-8 text-primary">سلال منتجات جاهزة للموزعين والمحلات</h2>
      </div>
    </section>
  );
}
