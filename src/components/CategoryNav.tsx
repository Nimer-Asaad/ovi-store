import Link from "next/link";
import { categories } from "@/data/mock";

export function CategoryNav() {
  return (
    <nav className="border-b border-border bg-white/80 backdrop-blur">
      <div className="app-container flex gap-2 overflow-x-auto py-3">
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
