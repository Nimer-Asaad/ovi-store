import Link from "next/link";
import { ArrowLeft, BadgePercent, Boxes, CircuitBoard, PackageCheck, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const features = [
    { Icon: Boxes, title: "إدارة مخزون", text: "منتجات منظمة حسب الأقسام والمخزون" },
    { Icon: ShieldCheck, title: "جودة موثوقة", text: "منتجات مناسبة للمحال والبيع المباشر" },
    { Icon: BadgePercent, title: "تسعير جملة", text: "سعر تجزئة وسعر جملة لكل منتج" },
  ];

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,#0F172A,#111827_52%,#1E293B)] text-white shadow-lift">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-7 sm:p-10 lg:p-14">
        <p className="badge-primary w-fit">متجر عربي للجملة والتجزئة</p>
        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.25] tracking-normal sm:text-5xl lg:text-6xl">
          اكسسوارات موبايل احترافية للمحلات والعملاء في مكان واحد.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          كتالوج عربي منظم للكفرات، الشواحن، السماعات، أدوات الصيانة، وأجهزة الموبايل مع أسعار واضحة للتجزئة والجملة.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="btn-secondary h-12 px-6">
            تصفح المنتجات
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/categories/chargers" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-black text-white transition hover:bg-white hover:text-primary">
            عروض الشواحن
          </Link>
        </div>
      </div>

      <div className="relative min-h-[26rem] p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgb(200_169_126/0.28),transparent_24rem),linear-gradient(135deg,#111827,#0F172A_58%,#A8844F)]" />
        <div className="relative grid h-full place-items-center">
          <div className="w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-lift backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5 text-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-muted">OVI Wholesale</p>
                  <h2 className="mt-1 text-2xl font-black">لوحة توريد ذكية</h2>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-secondary">
                  <CircuitBoard className="h-6 w-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {["تسعير حسب نوع العميل", "مخزون منخفض واضح", "طلبات جملة منظمة"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-black">{item}</span>
                    <PackageCheck className="h-5 w-5 text-dark-gold" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 bg-white/[0.04] p-4 sm:grid-cols-3 sm:p-5">
        {features.map(({ Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
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
    </section>
  );
}
