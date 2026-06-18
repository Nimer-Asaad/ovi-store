import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceDisplay } from "@/components/PriceDisplay";
import { ProductGrid } from "@/components/ProductGrid";
import { getProduct, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export function generateStaticParams() {
  return mockProducts.filter((product) => product.visible).map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const role = await getCurrentDemoRole();
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product || !product.visible) {
    notFound();
  }

  const related = mockProducts.filter((item) => item.visible && item.categorySlug === product.categorySlug && item.slug !== product.slug);

  return (
    <div className="app-container flex flex-col gap-10 py-8">
      <section className="surface-panel grid gap-8 overflow-hidden p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-96 items-center justify-center rounded-[1.5rem] bg-slate-100 p-8 text-primary">
          <div className="grid h-40 w-40 place-items-center rounded-[2rem] border border-white bg-white text-4xl font-black shadow-card">
            {product.categoryName.slice(0, 2)}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Link href={`/categories/${product.categorySlug}`} className="badge-primary w-fit">
            {product.categoryName}
          </Link>
          <h1 className="mt-5 text-3xl font-black leading-tight text-primary sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-muted">{product.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {product.specs.map((spec) => (
              <span key={spec} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                {spec}
              </span>
            ))}
          </div>
          <div className="mt-7 border-y border-border py-5">
            <PriceDisplay product={product} role={role} variant="details" />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="btn-secondary h-12 px-8">إضافة للسلة</button>
            <button className="btn-ghost h-12 px-8">
              طلب سعر جملة
            </button>
          </div>
        </div>
      </section>

      {related.length > 0 ? <ProductGrid title="منتجات مشابهة" products={related} role={role} /> : null}
    </div>
  );
}
