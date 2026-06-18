import Link from "next/link";
import { categories } from "@/data/mock";

export function CategoryNav() {
  return (
    <nav className="border-b border-border bg-white/85 backdrop-blur">
      <div className="app-container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        <Link
          href="/products"
          className="shrink-0 rounded-full border border-secondary/35 bg-[#f4eadb] px-4 py-2 text-sm font-extrabold text-[#73572f] transition hover:bg-[#ead8bb]"
        >
          كل المنتجات
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="shrink-0 rounded-full border border-border bg-slate-50/80 px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:border-secondary/50 hover:bg-[#fbf7ef] hover:text-[#73572f]"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
