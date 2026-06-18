import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, UserRound } from "lucide-react";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchBar } from "@/components/SearchBar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 shadow-[0_10px_35px_rgb(15_23_42/0.05)] backdrop-blur-xl">
      <div className="app-container grid grid-cols-[auto_1fr_auto] items-center gap-3 py-4 md:gap-6">
        <div className="flex items-center gap-3">
          <MobileMenu />
          <Link href="/" className="flex items-center gap-3">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-secondary/30 bg-primary shadow-soft ring-1 ring-slate-900/5">
              <Image
                src="/images/ovi-logo.png"
                alt="Ovi Mobile Store"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-xl font-black tracking-normal text-primary">Ovi Mobile Store</span>
              <span className="text-xs font-extrabold text-dark-gold">جملة وتجزئة لاكسسوارات الموبايل</span>
            </span>
          </Link>
        </div>

        <div className="mx-auto w-full max-w-2xl">
          <SearchBar />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/account"
            className="btn-ghost hidden md:inline-flex"
          >
            <UserRound className="h-4 w-4" aria-hidden="true" />
            حسابي
          </Link>
          <Link href="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-soft-navy" aria-label="السلة">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -left-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-xs font-black text-primary shadow-sm">
              3
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
