import Link from "next/link";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { categories, mockProducts } from "@/data/mock";
import { getCurrentUser } from "@/lib/auth";

export default async function ProductsPage() {
  const currentUser = await getCurrentUser();
  const visibleProducts = mockProducts.filter((product) => product.visible);

  return (
    <main className="app-container flex flex-col gap-8 py-8 sm:py-10">
      <section className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-card">
        <div className="grid gap-6 bg-[linear-gradient(135deg,#0F172A,#111827_58%,#1E293B)] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="badge bg-white text-primary">كل المنتجات</span>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              كتالوج اكسسوارات الموبايل
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              تشكيلة منظمة للجملة والتجزئة مع أسعار تتغير حسب نوع الحساب الفعلي، ومخزون واضح لكل منتج.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-3 text-center">
            <Stat value={visibleProducts.length.toString()} label="منتج" />
            <Stat value={categories.length.toString()} label="قسم" />
            <Stat value="RTL" label="واجهة" />
          </div>
        </div>

        <div className="grid gap-4 border-t border-border p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <Link href="/products" className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-black text-white">
              الكل
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="shrink-0 rounded-full border border-border bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-secondary/50 hover:bg-[#fbf7ef] hover:text-[#73572f]"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge border border-border bg-white text-muted">
              <Filter className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              متوفر فقط
            </span>
            <span className="badge border border-border bg-white text-muted">
              <Sparkles className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              مميز
            </span>
            <span className="badge border border-border bg-white text-muted">
              <SlidersHorizontal className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              ترتيب افتراضي
            </span>
          </div>
        </div>
      </section>

      <ProductGrid
        title="المنتجات المتاحة"
        subtitle="كل الأصناف الأساسية لمتجر اكسسوارات موبايل عربي، بتصميم واضح ومناسب للتصفح السريع على الموبايل."
        products={visibleProducts}
        viewer={currentUser}
      />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
      <p className="text-xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-300">{label}</p>
    </div>
  );
}
