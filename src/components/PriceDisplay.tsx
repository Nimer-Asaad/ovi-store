import { formatPrice, type Product } from "@/data/mock";
import type { DemoViewerRole } from "@/lib/demo-user";
import { getProfitMargin, getVisibleUnitPrice } from "@/lib/pricing";
import { roleLabels } from "@/lib/user-roles";

export function PriceDisplay({
  product,
  role,
  variant = "card",
}: {
  product: Product;
  role: DemoViewerRole;
  variant?: "card" | "details" | "line";
}) {
  const price = getVisibleUnitPrice(product, role);
  const isAdmin = role === "ADMIN";
  const margin = getProfitMargin(product);

  if (isAdmin) {
    return (
      <div className={variant === "line" ? "grid gap-1" : "grid gap-3"}>
        <div className="grid gap-2 text-sm">
          <AdminPriceRow label="التكلفة" value={formatPrice(product.costPrice)} highlight="danger" />
          <AdminPriceRow label="التجزئة" value={formatPrice(product.retailPrice)} />
          <AdminPriceRow label="التاجر" value={formatPrice(product.wholesalePrice)} />
          <AdminPriceRow label="الموزع" value={product.dealerPrice ? formatPrice(product.dealerPrice) : "غير محدد"} />
          <AdminPriceRow label="المخزون" value={`${product.stock}`} />
          <AdminPriceRow label="هامش الربح" value={`${formatPrice(margin.profit)} (${margin.percent}%)`} highlight="success" />
        </div>
        {product.discountPercent > 0 ? (
          <span className="w-fit bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">خصم {product.discountPercent}%</span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={variant === "details" ? "grid gap-2" : "grid gap-1"}>
      <p className="text-xs font-bold text-slate-500">
        {price.label} - {roleLabels[role]}
      </p>
      <div className="flex items-end gap-2">
        <p className={variant === "details" ? "text-3xl font-black text-slate-950" : "text-xl font-black text-slate-950"}>
          {formatPrice(price.finalAmount)}
        </p>
        {price.discountPercent > 0 ? (
          <p className="text-sm font-bold text-slate-400 line-through">{formatPrice(price.originalAmount)}</p>
        ) : null}
      </div>
      {price.discountPercent > 0 ? (
        <span className="w-fit bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">خصم {price.discountPercent}%</span>
      ) : null}
    </div>
  );
}

function AdminPriceRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "danger" | "success";
}) {
  const color = highlight === "danger" ? "text-rose-700" : highlight === "success" ? "text-teal-700" : "text-slate-950";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-1 last:border-b-0">
      <span className="font-bold text-slate-500">{label}</span>
      <span className={`font-black ${color}`}>{value}</span>
    </div>
  );
}
