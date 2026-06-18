import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { formatPrice, getProduct, mockProducts } from "@/data/mock";

export function generateStaticParams() {
  return mockProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = mockProducts.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 border border-slate-200 bg-white p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`flex min-h-96 items-center justify-center bg-gradient-to-br ${product.color} p-8 text-white`}>
          <div className="grid h-40 w-40 place-items-center border border-white/30 bg-white/10 text-4xl font-black backdrop-blur">
            {product.categoryName.slice(0, 2)}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Link href={`/categories/${product.categorySlug}`} className="w-fit bg-teal-50 px-3 py-1 text-sm font-black text-teal-700">
            {product.categoryName}
          </Link>
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {product.specs.map((spec) => (
              <span key={spec} className="border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-black text-slate-700">
                {spec}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-4 border-y border-slate-200 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">سعر التجزئة</p>
              <p className="text-3xl font-black text-slate-950">{formatPrice(product.price)}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">سعر الجملة</p>
              <p className="text-2xl font-black text-teal-700">{formatPrice(product.wholesale)}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">المخزون</p>
              <p className="text-2xl font-black text-slate-950">{product.stock}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="h-12 bg-teal-600 px-8 text-sm font-black text-white transition hover:bg-teal-700">إضافة للسلة</button>
            <button className="h-12 border border-slate-200 px-8 text-sm font-black text-slate-800 transition hover:border-teal-300 hover:text-teal-700">
              طلب سعر جملة
            </button>
          </div>
        </div>
      </section>

      {related.length > 0 ? <ProductGrid title="منتجات مشابهة" products={related} /> : null}
    </div>
  );
}
