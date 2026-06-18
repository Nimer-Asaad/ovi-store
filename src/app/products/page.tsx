import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export default async function ProductsPage() {
  const role = await getCurrentDemoRole();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border border-slate-200 bg-white p-6">
        <p className="text-sm font-black text-teal-700">كل المنتجات</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">كتالوج اكسسوارات الموبايل</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
          أسعار تجريبية ومخزون وهمي لمرحلة البداية. لاحقا يمكن ربط هذه الصفحة بقاعدة بيانات Prisma وفلترة حقيقية.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 hover:border-teal-300 hover:bg-teal-50">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <ProductGrid title="المنتجات المتاحة" subtitle="كل الأصناف الأساسية لمتجر اكسسوارات موبايل عربي." products={mockProducts} role={role} />
    </div>
  );
}
