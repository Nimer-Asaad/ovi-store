import Link from "next/link";
import { categories } from "@/data/mock";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-black text-slate-950">OVI Store</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
            متجر جديد مبني من الصفر لاكسسوارات الموبايل، يدعم التجزئة والجملة وواجهة عربية RTL.
          </p>
        </div>
        <div>
          <h3 className="font-black text-slate-950">روابط</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-slate-600">
            <Link href="/products">المنتجات</Link>
            <Link href="/cart">السلة</Link>
            <Link href="/account/orders">طلباتي</Link>
            <Link href="/admin">الإدارة</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black text-slate-950">أقسام سريعة</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
