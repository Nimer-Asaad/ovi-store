import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowLeft, PackageCheck, ShoppingCart, Star, Warehouse } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import type { Product } from "@/data/mock";
import type { PricingViewer } from "@/lib/pricing";

export function ProductCard({ product, viewer }: { product: Product; viewer: PricingViewer }) {
  const isLowStock = product.stock <= product.lowStockThreshold;
  const showWholesaleBadge = viewer?.role === "MERCHANT" || viewer?.role === "DEALER" || viewer?.role === "ADMIN";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-card">
      <Link href={`/products/${product.slug}`} className="block p-3 pb-0" aria-label={product.name}>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.1rem] bg-[linear-gradient(135deg,#0F172A,#1E293B_52%,#A8844F)] p-6 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgb(214_185_140/0.30),transparent_30%),linear-gradient(135deg,rgb(255_255_255/0.10),transparent_45%)]" />
          <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-2">
            {product.featured ? <ProductBadge tone="dark">مميز</ProductBadge> : null}
            {product.discountPercent > 0 ? <ProductBadge tone="accent">خصم {product.discountPercent}%</ProductBadge> : null}
          </div>
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 768px) 90vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" />
          ) : (
            <div className="relative grid h-24 w-24 place-items-center rounded-[1.45rem] border border-secondary/35 bg-white/15 text-2xl font-black text-[#f7ead2] shadow-lift backdrop-blur transition duration-300 group-hover:scale-105">
              {product.categoryName.slice(0, 2)}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge bg-slate-100 text-slate-700">{product.categoryName}</span>
          {product.badge ? <span className="badge border border-amber-200 bg-amber-50 text-amber-800">{product.badge}</span> : null}
          {showWholesaleBadge ? (
            <span className="badge border border-secondary/35 bg-[#fbf7ef] text-[#73572f]">
              <Warehouse className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              جملة
            </span>
          ) : null}
        </div>

        <Link href={`/products/${product.slug}`} className="mt-4 line-clamp-2 text-lg font-black leading-7 text-primary transition hover:text-dark-gold">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-black">
          <span className="inline-flex items-center gap-1 text-amber-700">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
            {product.rating}
          </span>
          <span className={isLowStock ? "inline-flex items-center gap-1 text-rose-700" : "inline-flex items-center gap-1 text-[#73572f]"}>
            <PackageCheck className="h-4 w-4" aria-hidden="true" />
            {isLowStock ? `كمية محدودة: ${product.stock}` : `متوفر: ${product.stock}`}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <PriceDisplay product={product} viewer={viewer} />
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
            <button type="button" className="btn-primary w-full">
              <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              إضافة للسلة
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-primary transition hover:border-secondary/50 hover:bg-[#fbf7ef] hover:text-dark-gold"
              aria-label={`عرض ${product.name}`}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductBadge({ children, tone }: { children: ReactNode; tone: "dark" | "accent" }) {
  return (
    <span
      className={
        tone === "accent"
          ? "rounded-full bg-secondary px-3 py-1 text-xs font-black text-primary shadow-soft"
          : "rounded-full bg-primary/85 px-3 py-1 text-xs font-black text-white shadow-soft backdrop-blur"
      }
    >
      {children}
    </span>
  );
}
