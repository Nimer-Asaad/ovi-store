import { revalidatePath } from "next/cache";
import { AdminSidebar } from "@/components/AdminSidebar";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { priceGroupLabels, roleLabels, userRoles, type UserRole } from "@/lib/user-roles";

const priceGroups = ["RETAIL", "WHOLESALE", "DEALER", "VIP"] as const;

export default async function AdminCustomersPage() {
  await requireRole("ADMIN");
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  async function updateUserAction(formData: FormData) {
    "use server";

    await requireRole("ADMIN");

    const userId = String(formData.get("userId") ?? "");
    const role = String(formData.get("role") ?? "CUSTOMER");
    const priceGroup = String(formData.get("priceGroup") ?? "RETAIL");
    const isApproved = formData.get("isApproved") === "on";
    const isActive = formData.get("isActive") === "on";

    if (!userId || !userRoles.includes(role as UserRole) || !priceGroups.includes(priceGroup as (typeof priceGroups)[number])) {
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        role: role as UserRole,
        priceGroup: priceGroup as (typeof priceGroups)[number],
        isApproved,
        isActive,
      },
    });

    revalidatePath("/admin/customers");
  }

  return (
    <div className="app-container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <section className="grid gap-6">
        <div className="surface-panel p-6 sm:p-8">
          <p className="badge-primary w-fit">إدارة العملاء</p>
          <h1 className="mt-4 text-3xl font-black text-primary">العملاء وحسابات التجار</h1>
          <p className="mt-2 text-sm text-muted">عرض المستخدمين الحقيقيين من قاعدة البيانات، مع التحكم بالدور، مجموعة السعر، والموافقة.</p>
        </div>

        <div className="surface-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px] text-right">
              <thead className="bg-slate-50 text-sm font-black text-muted">
                <tr>
                  <th className="p-4">الاسم</th>
                  <th className="p-4">الدور</th>
                  <th className="p-4">مجموعة السعر</th>
                  <th className="p-4">الموافقة</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">الهاتف</th>
                  <th className="p-4">البريد الإلكتروني</th>
                  <th className="p-4">الإنشاء</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-4">
                      <p className="font-black text-primary">{user.name}</p>
                      <p className="mt-1 text-xs text-muted">{user.id}</p>
                    </td>
                    <td className="p-4">
                      <select form={`user-form-${user.id}`} name="role" defaultValue={user.role} className="form-control h-10 px-3 text-xs">
                        {userRoles.map((role) => (
                          <option key={role} value={role}>
                            {roleLabels[role]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <select form={`user-form-${user.id}`} name="priceGroup" defaultValue={user.priceGroup} className="form-control h-10 px-3 text-xs">
                        {priceGroups.map((priceGroup) => (
                          <option key={priceGroup} value={priceGroup}>
                            {priceGroupLabels[priceGroup]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <label className="inline-flex items-center gap-2 text-xs font-black text-slate-700">
                        <input form={`user-form-${user.id}`} name="isApproved" type="checkbox" defaultChecked={user.isApproved} className="h-4 w-4 accent-[#A8844F]" />
                        {user.isApproved ? "معتمد" : "بانتظار الموافقة"}
                      </label>
                    </td>
                    <td className="p-4">
                      <span className={user.isActive ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800" : "rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700"}>
                        {user.isActive ? "نشط" : "موقوف"}
                      </span>
                    </td>
                    <td className="p-4">{user.phone ?? "-"}</td>
                    <td className="p-4 text-xs font-bold text-muted">{user.email}</td>
                    <td className="p-4 text-xs font-bold text-muted">{new Date(user.createdAt).toLocaleDateString("ar-EG")}</td>
                    <td className="p-4">
                      <form id={`user-form-${user.id}`} action={updateUserAction} className="flex flex-wrap gap-2">
                        <input type="hidden" name="userId" value={user.id} />
                        <label className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-black text-slate-700">
                          <input form={`user-form-${user.id}`} name="isActive" type="checkbox" defaultChecked={user.isActive} className="h-4 w-4 accent-[#A8844F]" />
                          {user.isActive ? "إيقاف" : "تفعيل"}
                        </label>
                        <button type="submit" className="rounded-lg bg-secondary px-3 py-2 text-xs font-black text-primary hover:bg-accent">
                          حفظ التغييرات
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
