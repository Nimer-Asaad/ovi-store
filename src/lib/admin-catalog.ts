"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type ActionResult = { ok: true; id: string } | { ok: false; message: string };

export async function createCategoryAction(formData: FormData) {
  const result = await createCategoryFromFormData(formData);
  redirectWithResult("/admin/categories", result);
}

export async function updateCategoryAction(categoryId: string, formData: FormData) {
  const result = await updateCategoryFromFormData(categoryId, formData);
  redirectWithResult("/admin/categories", result);
}

export async function toggleCategoryVisibilityAction(categoryId: string) {
  const category = await prisma.category.findUnique({ where: { id: categoryId }, select: { isVisible: true } });

  if (category) {
    await prisma.category.update({ where: { id: categoryId }, data: { isVisible: !category.isVisible } });
  }

  revalidateCatalogManagement();
}

export async function deleteCategoryAction(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { _count: { select: { products: true } } },
  });

  if (!category) {
    return;
  }

  if (category._count.products > 0) {
    redirect(`/admin/categories?error=${encodeURIComponent("لا يمكن حذف قسم مرتبط بمنتجات.")}`);
  }

  await prisma.category.delete({ where: { id: categoryId } });
  revalidateCatalogManagement();
}

export async function createBrandAction(formData: FormData) {
  const result = await createBrandFromFormData(formData);
  redirectWithResult("/admin/brands", result);
}

export async function updateBrandAction(brandId: string, formData: FormData) {
  const result = await updateBrandFromFormData(brandId, formData);
  redirectWithResult("/admin/brands", result);
}

export async function toggleBrandVisibilityAction(brandId: string) {
  const brand = await prisma.brand.findUnique({ where: { id: brandId }, select: { isVisible: true } });

  if (brand) {
    await prisma.brand.update({ where: { id: brandId }, data: { isVisible: !brand.isVisible } });
  }

  revalidateCatalogManagement();
}

export async function deleteBrandAction(brandId: string) {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: { _count: { select: { products: true } } },
  });

  if (!brand) {
    return;
  }

  if (brand._count.products > 0) {
    redirect(`/admin/brands?error=${encodeURIComponent("لا يمكن حذف علامة تجارية مرتبطة بمنتجات.")}`);
  }

  await prisma.brand.delete({ where: { id: brandId } });
  revalidateCatalogManagement();
}

export async function createSupplierAction(formData: FormData) {
  const result = await createSupplierFromFormData(formData);
  redirectWithResult("/admin/suppliers", result);
}

export async function updateSupplierAction(supplierId: string, formData: FormData) {
  const result = await updateSupplierFromFormData(supplierId, formData);
  redirectWithResult("/admin/suppliers", result);
}

export async function toggleSupplierActiveAction(supplierId: string) {
  const supplier = await prisma.supplier.findUnique({ where: { id: supplierId }, select: { isActive: true } });

  if (supplier) {
    await prisma.supplier.update({ where: { id: supplierId }, data: { isActive: !supplier.isActive } });
  }

  revalidateCatalogManagement();
}

export async function deleteSupplierAction(supplierId: string) {
  const supplier = await prisma.supplier.findUnique({
    where: { id: supplierId },
    include: { _count: { select: { products: true } } },
  });

  if (!supplier) {
    return;
  }

  if (supplier._count.products > 0) {
    redirect(`/admin/suppliers?error=${encodeURIComponent("لا يمكن حذف مورد مرتبط بمنتجات.")}`);
  }

  await prisma.supplier.delete({ where: { id: supplierId } });
  revalidateCatalogManagement();
}

export async function createCategoryFromFormData(formData: FormData): Promise<ActionResult> {
  const data = parseCategoryForm(formData);

  if (!data.ok) {
    return data;
  }

  const duplicate = await prisma.category.findUnique({ where: { slug: data.data.slug }, select: { id: true } });

  if (duplicate) {
    return { ok: false, message: "الرابط المختصر للقسم مستخدم مسبقا." };
  }

  const category = await prisma.category.create({ data: data.data });
  return { ok: true, id: category.id };
}

export async function updateCategoryFromFormData(categoryId: string, formData: FormData): Promise<ActionResult> {
  const data = parseCategoryForm(formData);

  if (!data.ok) {
    return data;
  }

  const duplicate = await prisma.category.findFirst({
    where: { slug: data.data.slug, id: { not: categoryId } },
    select: { id: true },
  });

  if (duplicate) {
    return { ok: false, message: "الرابط المختصر للقسم مستخدم مسبقا." };
  }

  const category = await prisma.category.update({ where: { id: categoryId }, data: data.data });
  return { ok: true, id: category.id };
}

export async function createBrandFromFormData(formData: FormData): Promise<ActionResult> {
  const data = parseBrandForm(formData);

  if (!data.ok) {
    return data;
  }

  const duplicate = await prisma.brand.findUnique({ where: { slug: data.data.slug }, select: { id: true } });

  if (duplicate) {
    return { ok: false, message: "الرابط المختصر للعلامة التجارية مستخدم مسبقا." };
  }

  const brand = await prisma.brand.create({ data: data.data });
  return { ok: true, id: brand.id };
}

export async function updateBrandFromFormData(brandId: string, formData: FormData): Promise<ActionResult> {
  const data = parseBrandForm(formData);

  if (!data.ok) {
    return data;
  }

  const duplicate = await prisma.brand.findFirst({
    where: { slug: data.data.slug, id: { not: brandId } },
    select: { id: true },
  });

  if (duplicate) {
    return { ok: false, message: "الرابط المختصر للعلامة التجارية مستخدم مسبقا." };
  }

  const brand = await prisma.brand.update({ where: { id: brandId }, data: data.data });
  return { ok: true, id: brand.id };
}

export async function createSupplierFromFormData(formData: FormData): Promise<ActionResult> {
  const data = parseSupplierForm(formData);

  if (!data.ok) {
    return data;
  }

  const supplier = await prisma.supplier.create({ data: data.data });
  return { ok: true, id: supplier.id };
}

export async function updateSupplierFromFormData(supplierId: string, formData: FormData): Promise<ActionResult> {
  const data = parseSupplierForm(formData);

  if (!data.ok) {
    return data;
  }

  const supplier = await prisma.supplier.update({ where: { id: supplierId }, data: data.data });
  return { ok: true, id: supplier.id };
}

function parseCategoryForm(formData: FormData) {
  const nameAr = getText(formData, "nameAr");
  const nameEn = getText(formData, "nameEn");
  const slug = getText(formData, "slug");

  if (!nameAr || !nameEn || !slug) {
    return { ok: false as const, message: "يرجى تعبئة اسم القسم العربي والإنجليزي والرابط المختصر." };
  }

  return {
    ok: true as const,
    data: {
      nameAr,
      nameEn,
      slug,
      imageUrl: getText(formData, "imageUrl") || null,
      isVisible: formData.get("isVisible") === "on",
    },
  };
}

function parseBrandForm(formData: FormData) {
  const name = getText(formData, "name");
  const slug = getText(formData, "slug");

  if (!name || !slug) {
    return { ok: false as const, message: "يرجى تعبئة اسم العلامة التجارية والرابط المختصر." };
  }

  return {
    ok: true as const,
    data: {
      name,
      slug,
      logoUrl: getText(formData, "logoUrl") || null,
      isVisible: formData.get("isVisible") === "on",
    },
  };
}

function parseSupplierForm(formData: FormData) {
  const name = getText(formData, "name");

  if (!name) {
    return { ok: false as const, message: "اسم المورد مطلوب." };
  }

  return {
    ok: true as const,
    data: {
      name,
      phone: getText(formData, "phone") || null,
      email: getText(formData, "email") || null,
      address: getText(formData, "address") || null,
      isActive: formData.get("isActive") === "on",
    },
  };
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function redirectWithResult(path: string, result: ActionResult) {
  if (!result.ok) {
    redirect(`${path}?error=${encodeURIComponent(result.message)}`);
  }

  revalidateCatalogManagement();
  redirect(path);
}

function revalidateCatalogManagement() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/brands");
  revalidatePath("/admin/suppliers");
  revalidatePath("/admin/products/new");
  revalidatePath("/admin/products");
}
