import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/AdminProductForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { getAdminProductById, getCatalogFormOptions } from "@/lib/catalog";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const [product, options, query] = await Promise.all([getAdminProductById(id), getCatalogFormOptions(), searchParams]);

  if (!product) {
    notFound();
  }

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">تعديل منتج</p>
          <h1 className="mt-4 text-3xl font-black text-primary">{product.nameAr}</h1>
          <p className="mt-2 text-sm text-muted">تعديل الأسعار، المخزون، الصور، الكتالوجات، وحالة ظهور المنتج.</p>
        </div>
        <AdminProductForm product={product} options={options} error={query.error} />
      </section>
    </div>
  );
}
