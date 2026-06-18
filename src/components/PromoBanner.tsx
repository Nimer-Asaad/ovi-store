import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="border border-teal-200 bg-teal-50 p-5 md:col-span-2">
        <p className="text-sm font-black text-teal-700">عرض الافتتاح</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">خصم خاص على شواحن GaN وكيابل Type-C للطلبات الكبيرة</h2>
        <Link href="/categories/chargers" className="mt-4 inline-flex text-sm font-black text-teal-800 hover:text-teal-600">
          مشاهدة الشواحن
        </Link>
      </div>
      <div className="border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-black text-amber-700">تجهيز محلات</p>
        <h2 className="mt-2 text-xl font-black text-slate-950">سلال منتجات جاهزة للموزعين والمحلات</h2>
      </div>
    </section>
  );
}
