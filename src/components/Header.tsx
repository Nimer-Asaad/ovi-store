import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchBar } from "@/components/SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 shadow-[0_8px_30px_rgb(15_23_42/0.04)] backdrop-blur-xl">
      <div className="app-container grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4 md:gap-5">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-black text-white shadow-soft ring-1 ring-white/20">
              OV
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xl font-black tracking-normal text-primary">OVI Store</span>
              <span className="text-xs font-extrabold text-secondary">اكسسوارات موبايل بالجملة والتجزئة</span>
            </span>
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/login"
            className="btn-ghost hidden md:inline-flex"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            دخول
          </Link>
          <Link href="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-teal-600" aria-label="السلة">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-black text-primary shadow-sm">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
