import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

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
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="flex min-h-full flex-col antialiased">
        <TopBar />
        <Header />
        <CategoryNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
