import Link from "next/link";
import { ArrowLeft, BadgePercent, Boxes, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const features = [
    { Icon: Boxes, title: "إدارة مخزون", text: "منتجات منظمة حسب الأقسام والمخزون" },
    { Icon: ShieldCheck, title: "جودة موثوقة", text: "منتجات مناسبة للمحال والبيع المباشر" },
    { Icon: BadgePercent, title: "تسعير جملة", text: "سعر تجزئة وسعر جملة لكل منتج" },
  ];

  return (
    <section className="grid overflow-hidden rounded-[2rem] border border-slate-800 bg-primary text-white shadow-lift lg:grid-cols-[1.08fr_0.92fr]">
      <div className="p-7 sm:p-10 lg:p-14">
        <p className="badge-primary w-fit">متجر عربي للجملة والتجزئة</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] tracking-normal sm:text-5xl lg:text-6xl">
          كل اكسسوارات الموبايل في واجهة واحدة سريعة وواضحة.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          كفرات، شواحن، كيابل، سماعات، أدوات صيانة، وأجهزة مختارة بتجربة RTL حديثة مصممة للسوق العربي.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="btn-secondary h-12 px-6">
            تصفح المنتجات
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/admin" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-black text-white transition hover:bg-white hover:text-primary">
            لوحة الإدارة
          </Link>
        </div>
      </div>

      <div className="relative min-h-80 bg-[linear-gradient(135deg,#0F172A,#12343B_55%,#0F766E)] p-6">
        <div className="grid h-full content-end gap-4">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
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
