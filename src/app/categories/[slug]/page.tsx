import Link from "next/link";
import { ArrowLeft, PackageCheck, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { getCurrentUser } from "@/lib/auth";
import { getProductsByCategory, getVisibleCategoriesWithCounts } from "@/lib/catalog";

export async function generateStaticParams() {
  const categories = await getVisibleCategoriesWithCounts();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const currentUser = await getCurrentUser();
  const { slug } = await params;
  const result = await getProductsByCategory(slug);

  if (!result) {
    notFound();
  }

  const { category, products } = result;
  const categories = await getVisibleCategoriesWithCounts();

  return (
    <main className="app-container flex flex-col gap-8 py-8 sm:py-10">
      <section className="surface-panel overflow-hidden">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div>
            <Link href="/products" className="badge-primary w-fit">
              قسم من الكتالوج
            </Link>
            <h1 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-5xl">{category.nameAr}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">{category.nameEn}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="badge border border-border bg-slate-50 text-muted">
                <PackageCheck className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                {products.length} منتج متاح
              </span>
              <span className="badge border border-border bg-slate-50 text-muted">
                <Sparkles className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                مناسب للجملة والتجزئة
              </span>
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-border bg-slate-50 p-5">
            <p className="text-sm font-black text-muted">استكشف المزيد</p>
            <div className="mt-4 grid gap-2">
              {categories
                .filter((item) => item.slug !== category.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/categories/${item.slug}`}
                    className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-primary transition hover:text-dark-gold"
                  >
                    {item.nameAr}
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <ProductGrid title={`منتجات ${category.nameAr}`} products={products} viewer={currentUser} />
    </main>
  );
}
