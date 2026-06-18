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
      <div className={variant === "line" ? "grid gap-2" : "grid gap-3"}>
        <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
          <AdminPriceRow label="التكلفة" value={formatPrice(product.costPrice)} highlight="danger" />
          <AdminPriceRow label="التجزئة" value={formatPrice(product.retailPrice)} />
          <AdminPriceRow label="التاجر" value={formatPrice(product.wholesalePrice)} />
          <AdminPriceRow label="الموزع" value={product.dealerPrice ? formatPrice(product.dealerPrice) : "غير محدد"} />
          <AdminPriceRow label="المخزون" value={`${product.stock}`} />
          <AdminPriceRow label="هامش الربح" value={`${formatPrice(margin.profit)} (${margin.percent}%)`} highlight="success" />
        </div>
        {product.discountPercent > 0 ? (
          <span className="badge-accent w-fit">خصم {product.discountPercent}%</span>
        ) : null}
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <p className="text-lg font-black text-primary">{formatPrice(price.finalAmount)}</p>
        {price.discountPercent > 0 ? (
          <p className="text-sm font-bold text-slate-400 line-through">{formatPrice(price.originalAmount)}</p>
        ) : null}
        <span className="text-xs font-black text-muted">{price.label}</span>
      </div>
    );
  }

  return (
    <div className={variant === "details" ? "rounded-3xl border border-border bg-white p-5 shadow-soft" : "grid gap-2"}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-black text-muted">{price.label}</p>
        <span className="badge bg-slate-100 text-slate-700">{roleLabels[role]}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-2">
        <p className={variant === "details" ? "text-4xl font-black leading-none text-primary" : "text-2xl font-black leading-none text-primary"}>
          {formatPrice(price.finalAmount)}
        </p>
        {price.discountPercent > 0 ? (
          <p className="text-sm font-bold text-slate-400 line-through">{formatPrice(price.originalAmount)}</p>
        ) : null}
      </div>
      {price.discountPercent > 0 ? (
        <span className="badge-accent mt-2 w-fit">خصم {price.discountPercent}%</span>
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
  const color = highlight === "danger" ? "text-rose-700" : highlight === "success" ? "text-dark-gold" : "text-primary";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 pb-1.5 last:border-b-0 last:pb-0">
      <span className="font-bold text-muted">{label}</span>
      <span className={`font-black ${color}`}>{value}</span>
    </div>
  );
}
