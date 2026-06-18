import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchBar } from "@/components/SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center bg-slate-950 text-lg font-black text-white">OV</span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xl font-black tracking-tight text-slate-950">OVI Store</span>
              <span className="text-xs font-bold text-teal-700">اكسسوارات موبايل</span>
            </span>
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/login"
            className="hidden h-11 items-center gap-2 border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:border-teal-300 hover:text-teal-700 md:flex"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            دخول
          </Link>
          <Link href="/cart" className="relative flex h-11 w-11 items-center justify-center bg-teal-600 text-white transition hover:bg-teal-700" aria-label="السلة">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-black text-slate-950">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
