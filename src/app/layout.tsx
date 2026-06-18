import type { Metadata } from "next";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "OVI Store | اكسسوارات موبايل بالجملة والتجزئة",
  description: "متجر عربي حديث لاكسسوارات الهواتف، الشواحن، السماعات وقطع الصيانة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="flex min-h-full flex-col bg-[#f6f8fb] text-slate-950 antialiased">
        <TopBar />
        <Header />
        <CategoryNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
