import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export default async function ProductsPage() {
  const role = await getCurrentDemoRole();
  const visibleProducts = mockProducts.filter((product) => product.visible);

  return (
    <div className="app-container flex flex-col gap-10 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <p className="badge-primary w-fit">كل المنتجات</p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-4xl">كتالوج اكسسوارات الموبايل</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          أسعار تجريبية ومخزون وهمي لمرحلة البداية. لاحقا يمكن ربط هذه الصفحة بقاعدة بيانات Prisma وفلترة حقيقية.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-full border border-border bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-secondary/40 hover:bg-teal-50">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <ProductGrid title="المنتجات المتاحة" subtitle="كل الأصناف الأساسية لمتجر اكسسوارات موبايل عربي." products={visibleProducts} role={role} />
    </div>
  );
}
