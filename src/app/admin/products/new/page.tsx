import { AdminProductForm } from "@/components/AdminProductForm";
import { AdminSidebar } from "@/components/AdminSidebar";
import { getCatalogFormOptions } from "@/lib/catalog";

export default async function NewProductPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [options, params] = await Promise.all([getCatalogFormOptions(), searchParams]);

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">منتج جديد</p>
          <h1 className="mt-4 text-3xl font-black text-primary">إضافة منتج</h1>
          <p className="mt-2 text-sm text-muted">أضف منتجا حقيقيا مع الأسعار والصور والكتالوجات المحلية.</p>
        </div>
        <AdminProductForm options={options} error={params.error} />
      </section>
    </div>
  );
}
