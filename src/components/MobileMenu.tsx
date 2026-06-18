"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/mock";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-primary shadow-soft"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm">
          <div className="mr-auto flex h-full w-[86%] max-w-sm flex-col rounded-r-[2rem] bg-white p-5 shadow-lift">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-black tracking-normal text-primary" onClick={() => setOpen(false)}>
                OVI Store
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-primary"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 grid gap-2 text-base font-bold">
              {[
                ["الرئيسية", "/"],
                ["المنتجات", "/products"],
                ["السلة", "/cart"],
                ["حسابي", "/account"],
                ["لوحة الإدارة", "/admin"],
              ].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl border-b border-slate-100 px-3 py-3 text-slate-800 transition hover:bg-slate-50">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <p className="text-sm font-black text-muted">الأقسام</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
