import Link from "next/link";
import { LayoutDashboard, Package, ReceiptText } from "lucide-react";

const links = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/orders", label: "الطلبات", icon: ReceiptText },
];

export function AdminSidebar() {
  return (
    <aside className="border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-black text-slate-950">لوحة الإدارة</h2>
      <nav className="mt-4 grid gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 bg-slate-50 px-3 py-3 text-sm font-black text-slate-700 transition hover:bg-teal-50 hover:text-teal-800">
            <link.icon className="h-5 w-5" aria-hidden="true" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
