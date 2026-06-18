"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/mock";
import { roleLabels, type UserRole } from "@/lib/user-roles";

type MobileMenuUser = {
  name: string;
  role: UserRole;
  isApproved: boolean;
};

export function MobileMenu({ currentUser }: { currentUser: MobileMenuUser | null }) {
  const [open, setOpen] = useState(false);

  const authLinks = currentUser
    ? [
        ["حسابي", "/account"],
        currentUser.role === "ADMIN" ? ["لوحة الإدارة", "/admin"] : null,
        currentUser.role === "MERCHANT" || currentUser.role === "DEALER" ? ["لوحة التاجر", "/merchant"] : null,
        currentUser.role === "SUPPLIER" ? ["لوحة المورد", "/supplier"] : null,
        currentUser.role === "SALES_REP" ? ["لوحة المندوب", "/sales-rep"] : null,
      ].filter(Boolean) as Array<[string, string]>
    : [
        ["دخول", "/login"],
        ["إنشاء حساب", "/register"],
      ];

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
              <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <span className="relative flex h-12 w-12 overflow-hidden rounded-2xl border border-secondary/30 bg-primary">
                  <Image src="/images/ovi-logo.png" alt="Ovi Mobile Store" fill sizes="48px" className="object-cover" />
                </span>
                <span className="text-xl font-black tracking-normal text-primary">Ovi Mobile Store</span>
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
                ...authLinks,
              ].map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl border-b border-slate-100 px-3 py-3 text-slate-800 transition hover:bg-[#fbf7ef] hover:text-[#73572f]">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <p className="text-sm font-black text-muted">الأقسام</p>
              {currentUser ? (
                <p className="mt-2 text-xs font-bold text-muted">
                  {currentUser.name} - {roleLabels[currentUser.role]}{currentUser.isApproved ? "" : " - بانتظار الموافقة"}
                </p>
              ) : null}
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-[#fbf7ef] px-3 py-2 text-sm font-bold text-[#73572f]"
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
