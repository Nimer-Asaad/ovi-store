import Link from "next/link";
import { Star } from "lucide-react";
import { formatPrice, type Product } from "@/data/mock";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${product.color} p-6 text-white`}>
          <div className="grid h-24 w-24 place-items-center border border-white/30 bg-white/10 text-2xl font-black backdrop-blur">
            {product.categoryName.slice(0, 2)}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-black text-teal-700">{product.categoryName}</span>
          {product.badge ? <span className="bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">{product.badge}</span> : null}
        </div>
        <Link href={`/products/${product.slug}`} className="mt-3 text-lg font-black leading-7 text-slate-950 hover:text-teal-700">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-3 flex items-center gap-1 text-sm font-bold text-slate-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
          {product.rating}
          <span className="text-slate-300">|</span>
          <span>المخزون {product.stock}</span>
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-500">سعر التجزئة</p>
              <p className="text-xl font-black text-slate-950">{formatPrice(product.price)}</p>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-slate-500">الجملة</p>
              <p className="text-sm font-black text-teal-700">{formatPrice(product.wholesale)}</p>
            </div>
          </div>
          <button className="mt-4 h-11 w-full bg-slate-950 text-sm font-black text-white transition hover:bg-teal-700">
            إضافة للسلة
          </button>
        </div>
      </div>
    </article>
  );
}
