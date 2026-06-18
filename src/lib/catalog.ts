import type { Product } from "@/data/mock";
import { prisma } from "@/lib/db";

const productInclude = {
  category: true,
  brand: true,
  supplier: true,
  images: { orderBy: [{ isMain: "desc" as const }, { sortOrder: "asc" as const }, { createdAt: "asc" as const }] },
  catalogs: { orderBy: { createdAt: "desc" as const } },
};

export type AdminProduct = NonNullable<Awaited<ReturnType<typeof getAdminProductById>>>;

export async function getVisibleProducts() {
  const products = await prisma.product.findMany({
    where: { isVisible: true, category: { isVisible: true }, brand: { isVisible: true } },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });

  return products.map(mapProductForStorefront);
}

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: { isVisible: true, isFeatured: true, category: { isVisible: true }, brand: { isVisible: true } },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });

  return products.map(mapProductForStorefront);
}

export async function getStorefrontProduct(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug, isVisible: true, category: { isVisible: true }, brand: { isVisible: true } },
    include: productInclude,
  });

  return product ? mapProductForStorefront(product) : null;
}

export async function getProductsByCategory(slug: string) {
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category || !category.isVisible) {
    return null;
  }

  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isVisible: true, brand: { isVisible: true } },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });

  return {
    category,
    products: products.map(mapProductForStorefront),
  };
}

export async function getVisibleCategoriesWithCounts() {
  return prisma.category.findMany({
    where: { isVisible: true },
    include: {
      _count: {
        select: { products: { where: { isVisible: true } } },
      },
    },
    orderBy: { nameAr: "asc" },
  });
}

export async function getAdminProducts() {
  return prisma.product.findMany({
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
}

export async function getAdminProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });
}

export async function getCatalogFormOptions() {
  const [categories, brands, suppliers] = await Promise.all([
    prisma.category.findMany({ orderBy: { nameAr: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.supplier.findMany({ orderBy: { name: "asc" } }),
  ]);

  return { categories, brands, suppliers };
}

export function mapProductForStorefront(product: {
  id: string;
  nameAr: string;
  slug: string;
  sku: string;
  descriptionAr: string;
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  dealerPrice: number | null;
  discountPercent: number;
  stock: number;
  minStock: number;
  isVisible: boolean;
  isFeatured: boolean;
  isNew: boolean;
  supplierId: string;
  category: { nameAr: string; slug: string };
  brand: { name: string };
  images: Array<{ url: string; isMain: boolean }>;
}): Product {
  const mainImage = product.images.find((image) => image.isMain) ?? product.images[0];

  return {
    id: product.id,
    name: product.nameAr,
    slug: product.slug,
    sku: product.sku,
    categorySlug: product.category.slug,
    categoryName: product.category.nameAr,
    description: product.descriptionAr,
    costPrice: product.costPrice,
    retailPrice: product.retailPrice,
    wholesalePrice: product.wholesalePrice,
    dealerPrice: product.dealerPrice ?? undefined,
    discountPercent: product.discountPercent,
    stock: product.stock,
    lowStockThreshold: product.minStock,
    visible: product.isVisible,
    supplierId: product.supplierId,
    rating: 4.8,
    featured: product.isFeatured,
    badge: product.isNew ? "جديد" : product.isFeatured ? "مميز" : undefined,
    specs: [product.brand.name, product.sku],
    color: "from-slate-900 to-amber-700",
    imageUrl: mainImage?.url,
    brandName: product.brand.name,
  };
}
