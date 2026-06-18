import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export default async function Home() {
  const role = await getCurrentDemoRole();
  const featured = mockProducts.filter((product) => product.featured);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <HeroSection />
      <PromoBanner />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700">{category.count} منتج</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">{category.name}</h2>
              </div>
              <span className="flex h-12 w-12 items-center justify-center bg-slate-950 text-lg font-black text-white transition group-hover:bg-teal-600">
                {category.short}
              </span>
            </div>
          </Link>
        ))}
      </section>

      <ProductGrid
        title="منتجات مختارة"
        subtitle="تشكيلة جاهزة للعرض بالجملة والتجزئة مع أسعار تجريبية."
        products={featured}
        role={role}
      />
    </div>
  );
}
