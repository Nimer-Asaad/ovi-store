import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

export type UploadFolder = "products" | "catalogs";

export type SavedUpload = {
  url: string;
  fileType: string;
};

const allowedImageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

const allowedCatalogTypes = new Map([
  ["application/pdf", ".pdf"],
]);

export function isUsableFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

export async function saveUpload(file: File, folder: UploadFolder): Promise<SavedUpload> {
  const allowedTypes = folder === "products" ? allowedImageTypes : allowedCatalogTypes;
  const extension = allowedTypes.get(file.type);

  if (!extension) {
    throw new Error(folder === "products" ? "نوع الصورة غير مدعوم. استخدم jpg أو jpeg أو png أو webp." : "نوع الكتالوج غير مدعوم. ارفع ملف PDF فقط.");
  }

  const folderPath = path.join(uploadRoot, folder);
  await mkdir(folderPath, { recursive: true });

  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(folderPath, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return {
    url: `/uploads/${folder}/${fileName}`,
    fileType: file.type,
  };
}

export async function deletePublicUpload(url: string | null | undefined) {
  if (!url || (!url.startsWith("/uploads/products/") && !url.startsWith("/uploads/catalogs/"))) {
    return;
  }

  const filePath = path.join(process.cwd(), "public", url);

  try {
    await unlink(filePath);
  } catch {
    // Missing local files should not block deleting the database record.
  }
}
