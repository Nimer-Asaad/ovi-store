import Link from "next/link";
import { Star } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import type { Product } from "@/data/mock";
import type { DemoViewerRole } from "@/lib/demo-user";

export function ProductCard({ product, role }: { product: Product; role: DemoViewerRole }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-border bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-card">
      <Link href={`/products/${product.slug}`} className="block p-3 pb-0">
        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.1rem] bg-slate-100 p-6 text-primary">
          <div className="grid h-24 w-24 place-items-center rounded-3xl border border-white bg-white text-2xl font-black shadow-soft">
            {product.categoryName.slice(0, 2)}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="badge-primary">{product.categoryName}</span>
          {product.badge ? <span className="badge-accent">{product.badge}</span> : null}
        </div>
        <Link href={`/products/${product.slug}`} className="mt-4 text-lg font-black leading-7 text-primary transition hover:text-teal-700">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
        <div className="mt-4 flex items-center gap-1 text-sm font-bold text-muted">
          <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
          {product.rating}
          <span className="text-slate-300">|</span>
          <span>المخزون {product.stock}</span>
        </div>
        <div className="mt-auto pt-4">
          <PriceDisplay product={product} role={role} />
          <button className="btn-primary mt-5 w-full">
            إضافة للسلة
          </button>
        </div>
      </div>
    </article>
  );
}
