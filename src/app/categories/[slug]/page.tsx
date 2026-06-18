import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, getCategory, mockProducts } from "@/data/mock";
import { getCurrentDemoRole } from "@/lib/demo-user";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const role = await getCurrentDemoRole();
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = mockProducts.filter((product) => product.categorySlug === category.slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="border border-slate-200 bg-white p-6">
        <p className="text-sm font-black text-teal-700">قسم</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">{category.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{category.description}</p>
      </section>
      <ProductGrid title={`منتجات ${category.name}`} products={products} role={role} />
    </div>
  );
}
