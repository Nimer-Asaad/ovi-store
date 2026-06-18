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

  const products = mockProducts.filter((product) => product.visible && product.categorySlug === category.slug);

  return (
    <div className="app-container flex flex-col gap-10 py-8">
      <section className="surface-panel p-6 sm:p-8">
        <p className="badge-primary w-fit">قسم</p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-4xl">{category.name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{category.description}</p>
      </section>
      <ProductGrid title={`منتجات ${category.name}`} products={products} role={role} />
    </div>
  );
}
