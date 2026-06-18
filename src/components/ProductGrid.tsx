import { PackageOpen } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/mock";
import type { PricingViewer } from "@/lib/pricing";

export function ProductGrid({
  title,
  subtitle,
  products,
  viewer,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewer: PricingViewer;
}) {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black leading-tight text-primary sm:text-3xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{subtitle}</p> : null}
        </div>
        <span className="badge w-fit border border-border bg-white text-muted shadow-soft">{products.length} منتج</span>
      </div>

      {products.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} viewer={viewer} />
          ))}
        </div>
      ) : (
        <div className="surface-panel grid min-h-64 place-items-center p-8 text-center">
          <div>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-muted">
              <PackageOpen className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-xl font-black text-primary">لا توجد منتجات حاليا</h3>
            <p className="mt-2 text-sm leading-6 text-muted">سيتم عرض المنتجات هنا عند إضافتها أو إظهارها في الكتالوج.</p>
          </div>
        </div>
      )}
    </section>
  );
}
