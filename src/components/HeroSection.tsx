import Link from "next/link";
import { ArrowLeft, BadgePercent, Boxes, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const features = [
    { Icon: Boxes, title: "إدارة مخزون", text: "منتجات منظمة حسب الأقسام والمخزون" },
    { Icon: ShieldCheck, title: "جودة موثوقة", text: "منتجات مناسبة للمحال والبيع المباشر" },
    { Icon: BadgePercent, title: "تسعير جملة", text: "سعر تجزئة وسعر جملة لكل منتج" },
  ];

  return (
    <section className="grid overflow-hidden border border-slate-200 bg-slate-950 text-white shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
      <div className="p-6 sm:p-10 lg:p-12">
        <p className="w-fit bg-teal-400 px-3 py-1 text-sm font-black text-slate-950">متجر عربي للجملة والتجزئة</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
          كل اكسسوارات الموبايل في واجهة واحدة سريعة وواضحة.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          كفرات، شواحن، كيابل، سماعات، أدوات صيانة، وأجهزة مختارة بتجربة RTL حديثة مصممة للسوق العربي.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="inline-flex h-12 items-center justify-center gap-2 bg-teal-500 px-6 text-sm font-black text-slate-950 transition hover:bg-teal-300">
            تصفح المنتجات
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/admin" className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-black text-white transition hover:bg-white hover:text-slate-950">
            لوحة الإدارة
          </Link>
        </div>
      </div>

      <div className="relative min-h-80 bg-[radial-gradient(circle_at_30%_20%,#14b8a6_0,#14b8a6_22%,transparent_23%),linear-gradient(135deg,#0f172a,#172554_48%,#042f2e)] p-6">
        <div className="grid h-full content-end gap-4">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center bg-white text-slate-950">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-black">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
