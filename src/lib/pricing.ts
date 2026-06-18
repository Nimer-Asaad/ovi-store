import "server-only";

import type { Product } from "@/data/mock";
import type { AuthUser } from "@/lib/auth";

export type PriceKind = "retailPrice" | "wholesalePrice" | "dealerPrice";

export type PricingViewer = Pick<AuthUser, "role" | "isApproved"> | null;

export function getBasePriceForViewer(product: Product, viewer: PricingViewer): {
  amount: number;
  kind: PriceKind;
  label: string;
} {
  if (!viewer?.isApproved) {
    return { amount: product.retailPrice, kind: "retailPrice", label: "سعر التجزئة" };
  }

  if (viewer.role === "ADMIN") {
    return { amount: product.retailPrice, kind: "retailPrice", label: "سعر التجزئة" };
  }

  if (viewer.role === "MERCHANT") {
    return { amount: product.wholesalePrice, kind: "wholesalePrice", label: "سعر التاجر" };
  }

  if (viewer.role === "DEALER") {
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

export function getVisibleUnitPrice(product: Product, viewer: PricingViewer) {
  const base = getBasePriceForViewer(product, viewer);

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
