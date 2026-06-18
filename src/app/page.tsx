import Link from "next/link";
import {
  BadgeCheck,
  BatteryCharging,
  Building2,
  Cable,
  Car,
  ChevronLeft,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Users,
  Watch,
  Wrench,
  Zap,
} from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentUser } from "@/lib/auth";

const categoryIcons = {
  "phone-cases": ShieldCheck,
  "screen-protectors": BadgeCheck,
  chargers: Zap,
  cables: Cable,
  headphones: Headphones,
  "power-banks": BatteryCharging,
  batteries: BatteryCharging,
  "smart-watches": Watch,
  "car-accessories": Car,
  "repair-tools": Wrench,
  "network-accessories": Building2,
  "mobile-devices": Smartphone,
};

const valueProps = [
  {
    Icon: Users,
    title: "تسعير جملة مرن",
    text: "أسعار مختلفة للتجزئة، التجار، والوكلاء حسب نوع الحساب.",
  },
  {
    Icon: ShieldCheck,
    title: "ضمان جودة",
    text: "تشكيلة مختارة تناسب محلات الموبايل والبيع المباشر بثقة.",
  },
  {
    Icon: PackageCheck,
    title: "إدارة مخزون سريعة",
    text: "إشارات واضحة للمخزون والمنتجات منخفضة الكمية للمتابعة.",
  },
  {
    Icon: Truck,
    title: "دعم للتجار",
    text: "تجربة منظمة لطلبات الجملة ومراجعة الحسابات التجارية.",
  },
];

const brands = ["MagShield", "GlassPro", "GaN Pro", "AirBeat", "PowerHub", "SmartFit"];

export default async function Home() {
  const currentUser = await getCurrentUser();
  const featured = mockProducts.filter((product) => product.visible && product.featured);
  const newProducts = mockProducts.filter((product) => product.visible).slice(0, 4);
  const bestSelling = mockProducts
    .filter((product) => product.visible)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <main className="bg-bg">
      <div className="app-container flex flex-col gap-14 py-8 sm:gap-16 sm:py-10 lg:gap-20">
        <HeroSection />

        <section aria-labelledby="featured-categories" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="badge-primary">الأقسام الرئيسية</span>
              <h2 id="featured-categories" className="mt-3 text-3xl font-black leading-tight text-primary sm:text-4xl">
                تصفح حسب نوع الاكسسوار
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                أقسام مرتبة لمحلات الموبايل والعملاء، من الكفرات والشواحن إلى أدوات الصيانة والأجهزة.
              </p>
            </div>
            <Link href="/products" className="btn-ghost w-fit">
              عرض كل المنتجات
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((category) => {
              const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] ?? Sparkles;

              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="surface-card group p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fbf7ef] text-[#73572f] transition group-hover:bg-secondary group-hover:text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="badge bg-[#fbf7ef] text-[#73572f]">{category.count} منتج</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-primary">{category.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{category.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="featured-products" className="space-y-6">
          <div className="surface-panel p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="badge-accent">منتجات مختارة</span>
                <h2 id="featured-products" className="mt-3 text-3xl font-black leading-tight text-primary sm:text-4xl">
                  الأكثر طلبا هذا الأسبوع
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  مجموعة جاهزة للعرض بأسعار تتغير تلقائيا حسب نوع الحساب الحالي.
                </p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {["مختارة", "وصل حديثا", "الأعلى تقييما"].map((tab, index) => (
                  <span
                    key={tab}
                    className={
                      index === 0
                        ? "badge bg-primary text-white"
                        : "badge border border-border bg-white text-muted"
                    }
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} viewer={currentUser} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[linear-gradient(135deg,#0F172A,#111827_55%,#1E293B)] text-white shadow-lift">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-l">
              <span className="badge bg-white text-primary">نظام بيع منظم</span>
              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                تجربة مناسبة للتجزئة والجملة من نفس المتجر.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                واجهة واضحة للعملاء، وأساس جاهز لإدارة التجار والوكلاء والمخزون والطلبات من لوحة التحكم.
              </p>
            </div>
            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
              {valueProps.map(({ Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="brands" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="badge-primary">شركاء ومنتجات</span>
              <h2 id="brands" className="mt-3 text-3xl font-black leading-tight text-primary sm:text-4xl">
                علامات جاهزة للعرض في المتجر
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">
              شرائط بسيطة وواضحة تعطي الصفحة إحساس متجر تقني منظم بدون ازدحام بصري.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <div key={brand} className="surface-card flex h-24 items-center justify-center p-4 text-center">
                <span className="text-lg font-black tracking-normal text-primary">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="more-products" className="grid gap-6 lg:grid-cols-2">
          <div className="surface-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <span className="badge bg-slate-100 text-muted">وصل حديثا</span>
                <h2 id="more-products" className="mt-3 text-2xl font-black text-primary">إضافات جديدة للكتالوج</h2>
              </div>
              <Link href="/products" className="btn-ghost">
                عرض المزيد
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {newProducts.slice(0, 2).map((product) => (
                <ProductCard key={product.slug} product={product} viewer={currentUser} />
              ))}
            </div>
          </div>

          <div className="surface-panel p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <span className="badge bg-slate-100 text-muted">الأعلى تقييما</span>
                <h2 className="mt-3 text-2xl font-black text-primary">اختيارات موثوقة للمحلات</h2>
              </div>
              <Link href="/products" className="btn-ghost">
                كل العروض
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {bestSelling.slice(0, 2).map((product) => (
                <ProductCard key={product.slug} product={product} viewer={currentUser} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
