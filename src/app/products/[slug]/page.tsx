import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, BadgePercent, CheckCircle2, PackageCheck, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ProductGrid } from "@/components/ProductGrid";
import { getCurrentUser } from "@/lib/auth";
import { getStorefrontProduct, getVisibleProducts } from "@/lib/catalog";

export async function generateStaticParams() {
  const products = await getVisibleProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const currentUser = await getCurrentUser();
  const { slug } = await params;
  const product = await getStorefrontProduct(slug);

  if (!product) {
    notFound();
  }

  const related = (await getVisibleProducts()).filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 4);
  const isLowStock = product.stock <= product.lowStockThreshold;

  return (
    <main className="app-container flex flex-col gap-10 py-8 sm:py-10">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel overflow-hidden p-3">
          <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#0F172A,#111827_48%,#A8844F)] p-8 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_24%,rgb(214_185_140/0.30),transparent_28%),linear-gradient(145deg,rgb(255_255_255/0.12),transparent_48%)]" />
            <div className="absolute right-5 top-5 z-10 flex flex-wrap gap-2">
              {product.featured ? <span className="badge bg-primary/80 text-white backdrop-blur">مميز</span> : null}
              {product.discountPercent > 0 ? <span className="badge bg-accent text-white">خصم {product.discountPercent}%</span> : null}
            </div>
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" priority />
            ) : (
              <div className="relative grid h-44 w-44 place-items-center rounded-[2rem] border border-secondary/35 bg-white/15 text-5xl font-black text-[#f7ead2] shadow-lift backdrop-blur">
                {product.categoryName.slice(0, 2)}
              </div>
            )}
          </div>
          <div className="grid gap-3 p-3 sm:grid-cols-3">
            <InfoPill Icon={ShieldCheck} title="جودة مختارة" />
            <InfoPill Icon={Truck} title="جاهز للتجهيز" />
            <InfoPill Icon={PackageCheck} title={isLowStock ? "كمية محدودة" : "متوفر بالمخزون"} />
          </div>
        </div>

        <div className="surface-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/categories/${product.categorySlug}`} className="badge-primary">
              {product.categoryName}
            </Link>
            <span className="badge border border-border bg-slate-50 text-muted">{product.sku}</span>
            {product.badge ? <span className="badge-accent">{product.badge}</span> : null}
          </div>

          <h1 className="mt-5 text-3xl font-black leading-tight text-primary sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-muted">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-black text-amber-700">
              <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
              تقييم {product.rating}
            </span>
            <span className={isLowStock ? "inline-flex items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700" : "inline-flex items-center gap-2 rounded-2xl border border-secondary/25 bg-[#fbf7ef] px-4 py-3 text-sm font-black text-[#73572f]"}>
              <PackageCheck className="h-4 w-4" aria-hidden="true" />
              {isLowStock ? `كمية محدودة: ${product.stock}` : `متوفر: ${product.stock}`}
            </span>
            {product.discountPercent > 0 ? (
              <span className="inline-flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-black text-amber-800">
                <BadgePercent className="h-4 w-4" aria-hidden="true" />
                خصم فعال
              </span>
            ) : null}
          </div>

          <div className="mt-7">
            <PriceDisplay product={product} viewer={currentUser} variant="details" />
          </div>

          <div className="mt-7 grid gap-3 rounded-3xl border border-border bg-slate-50 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex h-12 items-center rounded-2xl border border-border bg-white p-1">
              <button type="button" className="h-10 w-10 rounded-xl text-lg font-black text-primary transition hover:bg-slate-100">+</button>
              <span className="grid h-10 w-12 place-items-center text-sm font-black text-primary">1</span>
              <button type="button" className="h-10 w-10 rounded-xl text-lg font-black text-primary transition hover:bg-slate-100">-</button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" className="btn-primary h-12">
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                إضافة للسلة
              </button>
              <button type="button" className="btn-soft h-12">
                طلب سعر جملة
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec} className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-soft">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-dark-gold" aria-hidden="true" />
                {spec}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <ProductGrid
          title="منتجات مشابهة"
          subtitle="خيارات قريبة من نفس القسم لتسهيل المقارنة وإكمال الطلب."
          products={related}
          viewer={currentUser}
        />
      ) : null}
    </main>
  );
}

function InfoPill({ Icon, title }: { Icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
      <Icon className="h-4 w-4 text-dark-gold" aria-hidden="true" />
      {title}
    </div>
  );
}
