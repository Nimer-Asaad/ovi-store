import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export default async function Home() {
  const role = await getCurrentDemoRole();
  const featured = mockProducts.filter((product) => product.visible && product.featured);

  return (
    <div className="app-container flex flex-col gap-10 py-8">
      <HeroSection />
      <PromoBanner />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="surface-card group p-5 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-secondary">{category.count} منتج</p>
                <h2 className="mt-2 text-xl font-black text-primary">{category.name}</h2>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white shadow-soft transition group-hover:bg-secondary">
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
