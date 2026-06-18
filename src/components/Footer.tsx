import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/mock";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-primary text-white">
      <div className="app-container grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-14 w-14 overflow-hidden rounded-2xl border border-secondary/30 bg-slate-900 shadow-soft">
              <Image src="/images/ovi-logo.png" alt="Ovi Mobile Store" fill sizes="56px" className="object-cover" />
            </span>
            <h2 className="text-2xl font-black text-white">Ovi Mobile Store</h2>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            متجر عربي حديث لاكسسوارات الموبايل، يدعم البيع بالتجزئة والجملة ويقدم تجربة منظمة للمحال والتجار.
          </p>
          <p className="mt-4 text-sm font-black text-secondary">0599 000 000</p>
          <p className="mt-1 text-sm text-slate-300">info@ovistore.test</p>
        </div>
        <div>
          <h3 className="font-black text-secondary">روابط</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-slate-300">
            <Link href="/products">المنتجات</Link>
            <Link href="/cart">السلة</Link>
            <Link href="/account/orders">طلباتي</Link>
            <Link href="/admin">الإدارة</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black text-secondary">تواصل وخدمة</h3>
          <div className="mt-3 grid gap-2 text-sm font-bold text-slate-300">
            <span>طلبات الجملة</span>
            <span>دعم التجار</span>
            <span>متابعة المخزون</span>
            <span>الشحن والتوصيل</span>
          </div>
        </div>
        <div>
          <h3 className="font-black text-secondary">أقسام سريعة</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:border-secondary/40 hover:text-secondary">
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
