import Link from "next/link";
import { categories } from "@/data/mock";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="app-container grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black text-primary">OVI Store</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            متجر عربي حديث لاكسسوارات الموبايل، يدعم البيع بالتجزئة والجملة ويقدم تجربة منظمة للمحال والتجار.
          </p>
          <p className="mt-4 text-sm font-black text-primary">0599 000 000</p>
          <p className="mt-1 text-sm text-muted">info@ovistore.test</p>
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
          <h3 className="font-black text-primary">تواصل وخدمة</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-muted">
            <span>طلبات الجملة</span>
            <span>دعم التجار</span>
            <span>متابعة المخزون</span>
            <span>الشحن والتوصيل</span>
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
