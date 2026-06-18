"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { deletePublicUpload, isUsableFile, saveUpload } from "@/lib/uploads";

const numberFields = ["costPrice", "retailPrice", "wholesalePrice", "dealerPrice", "discountPercent", "stock", "minStock"] as const;

type ProductFormData = {
  nameAr: string;
  nameEn: string;
  slug: string;
  sku: string;
  barcode: string | null;
  descriptionAr: string;
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  dealerPrice: number | null;
  discountPercent: number;
  stock: number;
  minStock: number;
  categoryId: string;
  brandId: string;
  supplierId: string;
  isFeatured: boolean;
  isNew: boolean;
  isVisible: boolean;
};

export async function createProductAction(formData: FormData) {
  const result = await createProductFromFormData(formData);

  if (!result.ok) {
    redirect(`/admin/products/new?error=${encodeURIComponent(result.message)}`);
  }

  revalidateCatalog();
  redirect("/admin/products");
}

export async function updateProductAction(productId: string, formData: FormData) {
  const result = await updateProductFromFormData(productId, formData);

  if (!result.ok) {
    redirect(`/admin/products/${productId}/edit?error=${encodeURIComponent(result.message)}`);
  }

  revalidateCatalog(productId);
  redirect("/admin/products");
}

export async function toggleProductVisibilityAction(productId: string) {
  const product = await prisma.product.findUnique({ where: { id: productId }, select: { isVisible: true } });

  if (product) {
    await prisma.product.update({ where: { id: productId }, data: { isVisible: !product.isVisible } });
  }

  revalidateCatalog(productId);
}

export async function deleteProductAction(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true, catalogs: true },
  });

  if (!product) {
    return;
  }

  await prisma.product.delete({ where: { id: productId } });

  await Promise.all([
    ...product.images.map((image) => deletePublicUpload(image.url)),
    ...product.catalogs.map((catalog) => deletePublicUpload(catalog.fileUrl)),
  ]);

  revalidateCatalog(productId);
}

export async function setMainProductImageAction(productId: string, imageId: string) {
  await prisma.$transaction([
    prisma.productImage.updateMany({ where: { productId }, data: { isMain: false } }),
    prisma.productImage.update({ where: { id: imageId }, data: { isMain: true } }),
  ]);

  revalidateCatalog(productId);
}

export async function deleteProductImageAction(productId: string, imageId: string) {
  const image = await prisma.productImage.findUnique({ where: { id: imageId } });

  if (!image || image.productId !== productId) {
    return;
  }

  await prisma.productImage.delete({ where: { id: imageId } });
  await deletePublicUpload(image.url);

  const mainImage = await prisma.productImage.findFirst({ where: { productId, isMain: true } });

  if (!mainImage) {
    const firstImage = await prisma.productImage.findFirst({ where: { productId }, orderBy: { sortOrder: "asc" } });

    if (firstImage) {
      await prisma.productImage.update({ where: { id: firstImage.id }, data: { isMain: true } });
    }
  }

  revalidateCatalog(productId);
}

export async function deleteProductCatalogAction(productId: string, catalogId: string) {
  const catalog = await prisma.productCatalog.findUnique({ where: { id: catalogId } });

  if (!catalog || catalog.productId !== productId) {
    return;
  }

  await prisma.productCatalog.delete({ where: { id: catalogId } });
  await deletePublicUpload(catalog.fileUrl);
  revalidateCatalog(productId);
}

export async function createProductFromFormData(formData: FormData) {
  const parsed = await parseProductForm(formData);

  if (!parsed.ok) {
    return parsed;
  }

  const assetError = validateUploadTypes(formData);

  if (assetError) {
    return { ok: false as const, message: assetError };
  }

  const duplicate = await findDuplicate(parsed.data.slug, parsed.data.sku);

  if (duplicate) {
    return { ok: false as const, message: duplicate };
  }

  try {
    const product = await prisma.product.create({ data: parsed.data });
    await saveProductAssets(product.id, parsed.data.nameAr, formData, false);

    return { ok: true as const, productId: product.id };
  } catch (error) {
    return { ok: false as const, message: error instanceof Error ? error.message : "تعذر حفظ المنتج. تأكد من صحة البيانات وحاول مرة أخرى." };
  }
}

export async function updateProductFromFormData(productId: string, formData: FormData) {
  const parsed = await parseProductForm(formData);

  if (!parsed.ok) {
    return parsed;
  }

  const assetError = validateUploadTypes(formData);

  if (assetError) {
    return { ok: false as const, message: assetError };
  }

  const duplicate = await findDuplicate(parsed.data.slug, parsed.data.sku, productId);

  if (duplicate) {
    return { ok: false as const, message: duplicate };
  }

  try {
    await prisma.product.update({ where: { id: productId }, data: parsed.data });
    await saveProductAssets(productId, parsed.data.nameAr, formData, true);

    return { ok: true as const, productId };
  } catch (error) {
    return { ok: false as const, message: error instanceof Error ? error.message : "تعذر تحديث المنتج. تأكد من صحة البيانات وحاول مرة أخرى." };
  }
}

async function parseProductForm(formData: FormData): Promise<{ ok: true; data: ProductFormData } | { ok: false; message: string }> {
  const requiredText = ["nameAr", "nameEn", "slug", "sku", "descriptionAr", "categoryId", "brandId", "supplierId"] as const;
  const values = Object.fromEntries(requiredText.map((key) => [key, String(formData.get(key) ?? "").trim()])) as Record<(typeof requiredText)[number], string>;

  for (const key of requiredText) {
    if (!values[key]) {
      return { ok: false, message: "يرجى تعبئة كل الحقول الأساسية قبل الحفظ." };
    }
  }

  const numbers = Object.fromEntries(numberFields.map((key) => [key, parseOptionalNumber(formData.get(key))])) as Record<(typeof numberFields)[number], number | null>;

  if (numbers.costPrice === null || numbers.retailPrice === null || numbers.wholesalePrice === null) {
    return { ok: false, message: "يرجى إدخال أسعار التكلفة والتجزئة والجملة بشكل صحيح." };
  }

  if (numbers.costPrice <= 0 || numbers.retailPrice <= 0 || numbers.wholesalePrice <= 0 || (numbers.dealerPrice !== null && numbers.dealerPrice <= 0)) {
    return { ok: false, message: "الأسعار يجب أن تكون أرقام موجبة." };
  }

  if ((numbers.stock ?? 0) < 0 || (numbers.minStock ?? 0) < 0) {
    return { ok: false, message: "المخزون لا يمكن أن يكون رقما سالبا." };
  }

  if ((numbers.discountPercent ?? 0) < 0 || (numbers.discountPercent ?? 0) > 100) {
    return { ok: false, message: "نسبة الخصم يجب أن تكون بين 0 و 100." };
  }

  return {
    ok: true,
    data: {
      nameAr: values.nameAr,
      nameEn: values.nameEn,
      slug: values.slug,
      sku: values.sku,
      barcode: String(formData.get("barcode") ?? "").trim() || null,
      descriptionAr: values.descriptionAr,
      costPrice: numbers.costPrice,
      retailPrice: numbers.retailPrice,
      wholesalePrice: numbers.wholesalePrice,
      dealerPrice: numbers.dealerPrice,
      discountPercent: numbers.discountPercent ?? 0,
      stock: numbers.stock ?? 0,
      minStock: numbers.minStock ?? 10,
      categoryId: values.categoryId,
      brandId: values.brandId,
      supplierId: values.supplierId,
      isFeatured: formData.get("isFeatured") === "on",
      isNew: formData.get("isNew") === "on",
      isVisible: formData.get("isVisible") === "on",
    },
  };
}

async function saveProductAssets(productId: string, productName: string, formData: FormData, editing: boolean) {
  const images = formData.getAll("images").filter(isUsableFile);
  const catalogs = formData.getAll("catalogs").filter(isUsableFile);
  const mainImageIndex = Math.max(0, Number(formData.get("mainImageIndex") ?? 1) - 1);
  const makeNewImageMain = formData.get("makeNewImageMain") === "on";

  if (images.length > 0) {
    const existingMain = editing ? await prisma.productImage.findFirst({ where: { productId, isMain: true } }) : null;
    const shouldUseNewMain = !existingMain || makeNewImageMain;

    if (shouldUseNewMain) {
      await prisma.productImage.updateMany({ where: { productId }, data: { isMain: false } });
    }

    for (const [index, file] of images.entries()) {
      const saved = await saveUpload(file, "products");

      await prisma.productImage.create({
        data: {
          productId,
          url: saved.url,
          alt: productName,
          isMain: shouldUseNewMain && index === mainImageIndex,
          sortOrder: index,
        },
      });
    }
  }

  for (const file of catalogs) {
    const saved = await saveUpload(file, "catalogs");

    await prisma.productCatalog.create({
      data: {
        productId,
        title: file.name.replace(/\.[^/.]+$/, "") || "كتالوج المنتج",
        fileUrl: saved.url,
        fileType: saved.fileType,
      },
    });
  }
}

async function findDuplicate(slug: string, sku: string, excludeId?: string) {
  const duplicateSlug = await prisma.product.findFirst({
    where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    select: { id: true },
  });

  if (duplicateSlug) {
    return "الرابط المختصر مستخدم مسبقا.";
  }

  const duplicateSku = await prisma.product.findFirst({
    where: { sku, ...(excludeId ? { id: { not: excludeId } } : {}) },
    select: { id: true },
  });

  if (duplicateSku) {
    return "رمز SKU مستخدم مسبقا.";
  }

  return null;
}

function parseOptionalNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();

  if (!text) {
    return null;
  }

  const number = Number(text);
  return Number.isFinite(number) ? Math.round(number) : null;
}

function validateUploadTypes(formData: FormData) {
  const images = formData.getAll("images").filter(isUsableFile);
  const catalogs = formData.getAll("catalogs").filter(isUsableFile);
  const validImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  const validCatalogTypes = new Set(["application/pdf"]);

  if (images.some((file) => !validImageTypes.has(file.type))) {
    return "نوع الصورة غير مدعوم. استخدم jpg أو jpeg أو png أو webp.";
  }

  if (catalogs.some((file) => !validCatalogTypes.has(file.type))) {
    return "نوع الكتالوج غير مدعوم. ارفع ملف PDF فقط.";
  }

  return null;
}

function revalidateCatalog(productId?: string) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  if (productId) {
    revalidatePath(`/admin/products/${productId}/edit`);
  }
}
