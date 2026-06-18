import type { Product } from "@/data/mock";
import type { DemoViewerRole } from "@/lib/demo-user";

export type PriceKind = "retailPrice" | "wholesalePrice" | "dealerPrice";

export function getBasePriceForRole(product: Product, role: DemoViewerRole): {
  amount: number;
  kind: PriceKind;
  label: string;
} {
  if (role === "MERCHANT") {
    return { amount: product.wholesalePrice, kind: "wholesalePrice", label: "سعر التاجر" };
  }

  if (role === "DEALER") {
    return {
      amount: product.dealerPrice ?? product.wholesalePrice,
      kind: product.dealerPrice ? "dealerPrice" : "wholesalePrice",
      label: product.dealerPrice ? "سعر الموزع" : "سعر الجملة",
    };
  }

  return { amount: product.retailPrice, kind: "retailPrice", label: "سعر التجزئة" };
}

export function applyDiscount(amount: number, discountPercent: number) {
  if (discountPercent <= 0) {
    return amount;
  }

  return Math.round(amount * (1 - discountPercent / 100));
}

export function getVisibleUnitPrice(product: Product, role: DemoViewerRole) {
  const base = getBasePriceForRole(product, role);

  return {
    ...base,
    originalAmount: base.amount,
    finalAmount: applyDiscount(base.amount, product.discountPercent),
    discountPercent: product.discountPercent,
  };
}

export function getProfitMargin(product: Product) {
  const profit = product.retailPrice - product.costPrice;
  const percent = product.retailPrice === 0 ? 0 : Math.round((profit / product.retailPrice) * 100);

  return { profit, percent };
}
