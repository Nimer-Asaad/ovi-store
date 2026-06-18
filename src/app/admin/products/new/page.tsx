import { AdminProductForm } from "@/components/AdminProductForm";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function NewProductPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="border border-slate-200 bg-white p-6">
          <p className="text-sm font-black text-teal-700">منتج جديد</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">إضافة منتج</h1>
          <p className="mt-2 text-sm text-slate-600">نموذج mock جاهز للربط مع Prisma لاحقا.</p>
        </div>
        <AdminProductForm />
      </section>
    </div>
  );
}
