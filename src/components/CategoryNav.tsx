import Link from "next/link";
import { categories } from "@/data/mock";

export function CategoryNav() {
  return (
    <nav className="border-b border-border bg-white/85 backdrop-blur">
      <div className="app-container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        <Link
          href="/products"
          className="shrink-0 rounded-full border border-secondary/25 bg-teal-50 px-4 py-2 text-sm font-extrabold text-teal-800 transition hover:bg-teal-100"
        >
          كل المنتجات
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="shrink-0 rounded-full border border-border bg-slate-50/80 px-4 py-2 text-sm font-extrabold text-slate-700 transition hover:border-secondary/40 hover:bg-teal-50 hover:text-teal-800"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
