import Link from "next/link";
import { categories } from "@/data/mock";

export function Footer() {
  return (
    <footer className="mt-14 border-t border-border bg-white">
      <div className="app-container grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black text-primary">OVI Store</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            متجر جديد مبني من الصفر لاكسسوارات الموبايل، يدعم التجزئة والجملة وواجهة عربية RTL.
          </p>
        </div>
        <div>
          <h3 className="font-black text-primary">روابط</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-muted">
            <Link href="/products">المنتجات</Link>
            <Link href="/cart">السلة</Link>
            <Link href="/account/orders">طلباتي</Link>
            <Link href="/admin">الإدارة</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black text-primary">أقسام سريعة</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
