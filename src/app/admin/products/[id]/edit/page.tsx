import { notFound } from "next/navigation";
import { AdminProductForm } from "@/components/AdminProductForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { getProductById, mockProducts } from "@/data/mock";

export function generateStaticParams() {
  return mockProducts.map((product) => ({ id: product.id }));
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">تعديل منتج</p>
          <h1 className="mt-4 text-3xl font-black text-primary">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">تعديل الأسعار، المخزون، وظهور المنتج.</p>
        </div>
        <AdminProductForm product={product} />
      </section>
    </div>
  );
}
