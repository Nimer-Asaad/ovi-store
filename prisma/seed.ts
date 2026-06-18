import "dotenv/config";

import bcrypt from "bcryptjs";
import { copyFile, mkdir, writeFile } from "fs/promises";
import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import type { PriceGroup, Role } from "../src/generated/prisma/enums";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

const uploadProductsDir = path.join(process.cwd(), "public", "uploads", "products");
const uploadCatalogsDir = path.join(process.cwd(), "public", "uploads", "catalogs");

const demoUsers: Array<{
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  priceGroup: PriceGroup;
  isApproved: boolean;
}> = [
  { name: "مدير Ovi", email: "admin@ovi.local", password: "Admin123456", phone: "0599000001", role: "ADMIN", priceGroup: "VIP", isApproved: true },
  { name: "عميل تجريبي", email: "customer@ovi.local", password: "Customer123456", phone: "0599000002", role: "CUSTOMER", priceGroup: "RETAIL", isApproved: true },
  { name: "تاجر تجريبي", email: "merchant@ovi.local", password: "Merchant123456", phone: "0599000003", role: "MERCHANT", priceGroup: "WHOLESALE", isApproved: true },
  { name: "موزع تجريبي", email: "dealer@ovi.local", password: "Dealer123456", phone: "0599000004", role: "DEALER", priceGroup: "DEALER", isApproved: true },
  { name: "مندوب مبيعات", email: "sales@ovi.local", password: "Sales123456", phone: "0599000005", role: "SALES_REP", priceGroup: "RETAIL", isApproved: true },
  { name: "مورد تجريبي", email: "supplier@ovi.local", password: "Supplier123456", phone: "0599000006", role: "SUPPLIER", priceGroup: "RETAIL", isApproved: true },
  { name: "تاجر بانتظار الموافقة", email: "pending@ovi.local", password: "Pending123456", phone: "0599000007", role: "MERCHANT", priceGroup: "WHOLESALE", isApproved: false },
];

const categoryData = [
  ["كفرات الهواتف", "Phone Cases", "phone-cases"],
  ["حمايات الشاشة", "Screen Protectors", "screen-protectors"],
  ["الشواحن", "Chargers", "chargers"],
  ["الكوابل", "Cables", "cables"],
  ["السماعات", "Headphones", "headphones"],
  ["باور بانك", "Power Banks", "power-banks"],
  ["البطاريات", "Batteries", "batteries"],
  ["الساعات الذكية", "Smart Watches", "smart-watches"],
  ["اكسسوارات السيارات", "Car Accessories", "car-accessories"],
  ["أدوات الصيانة", "Repair Tools", "repair-tools"],
  ["اكسسوارات الشبكات", "Network Accessories", "network-accessories"],
  ["أجهزة موبايل", "Mobile Devices", "mobile-devices"],
] as const;

const brandData = [
  ["MagShield", "magshield"],
  ["GlassPro", "glasspro"],
  ["GaN Pro", "gan-pro"],
  ["AirBeat", "airbeat"],
  ["PowerHub", "powerhub"],
  ["SmartFit", "smartfit"],
] as const;

const supplierData = [
  { name: "Ovi Import", phone: "0599111000", email: "import@ovi.local", address: "رام الله" },
  { name: "Levant Mobile Supply", phone: "0599222000", email: "levant@ovi.local", address: "الخليل" },
  { name: "Tech Wholesale Hub", phone: "0599333000", email: "hub@ovi.local", address: "نابلس" },
];

const productData = [
  {
    nameAr: "كفر MagShield شفاف مقاوم للصدمات",
    nameEn: "MagShield Clear Shockproof Case",
    slug: "magshield-clear-shockproof-case",
    sku: "OVI-CASE-001",
    barcode: "729000000001",
    categorySlug: "phone-cases",
    brandSlug: "magshield",
    supplierEmail: "import@ovi.local",
    costPrice: 18,
    retailPrice: 45,
    wholesalePrice: 32,
    dealerPrice: 28,
    discountPercent: 10,
    stock: 120,
    minStock: 20,
    isFeatured: true,
    isNew: true,
    descriptionAr: "كفر شفاف بجوانب مرنة وحماية عالية للحواف مع تصميم مناسب للبيع بالتجزئة والجملة.",
  },
  {
    nameAr: "حماية شاشة GlassPro 9D",
    nameEn: "GlassPro 9D Screen Protector",
    slug: "glasspro-9d-screen-protector",
    sku: "OVI-GLASS-002",
    barcode: "729000000002",
    categorySlug: "screen-protectors",
    brandSlug: "glasspro",
    supplierEmail: "levant@ovi.local",
    costPrice: 7,
    retailPrice: 25,
    wholesalePrice: 15,
    dealerPrice: 12,
    discountPercent: 0,
    stock: 240,
    minStock: 30,
    isFeatured: true,
    isNew: false,
    descriptionAr: "لاصق زجاجي كامل التغطية بوضوح عالي وحواف ناعمة، مناسب للمحال وكميات الجملة.",
  },
  {
    nameAr: "شاحن GaN Pro سريع 65 واط",
    nameEn: "GaN Pro 65W Fast Charger",
    slug: "gan-pro-65w-fast-charger",
    sku: "OVI-CHG-003",
    barcode: "729000000003",
    categorySlug: "chargers",
    brandSlug: "gan-pro",
    supplierEmail: "hub@ovi.local",
    costPrice: 55,
    retailPrice: 110,
    wholesalePrice: 88,
    dealerPrice: 78,
    discountPercent: 5,
    stock: 55,
    minStock: 10,
    isFeatured: true,
    isNew: true,
    descriptionAr: "شاحن سريع متعدد المنافذ بتقنية GaN، مناسب للهواتف والأجهزة اللوحية واللابتوبات الخفيفة.",
  },
  {
    nameAr: "كيبل Type-C مقوى بطول مترين",
    nameEn: "Reinforced 2M Type-C Cable",
    slug: "reinforced-2m-type-c-cable",
    sku: "OVI-CBL-004",
    barcode: "729000000004",
    categorySlug: "cables",
    brandSlug: "gan-pro",
    supplierEmail: "import@ovi.local",
    costPrice: 10,
    retailPrice: 30,
    wholesalePrice: 20,
    dealerPrice: 17,
    discountPercent: 0,
    stock: 180,
    minStock: 25,
    isFeatured: false,
    isNew: true,
    descriptionAr: "كيبل شحن ونقل بيانات بغطاء مقوى وطول عملي للاستخدام اليومي.",
  },
  {
    nameAr: "سماعة AirBeat لاسلكية",
    nameEn: "AirBeat Wireless Earbuds",
    slug: "airbeat-wireless-earbuds",
    sku: "OVI-AIR-005",
    barcode: "729000000005",
    categorySlug: "headphones",
    brandSlug: "airbeat",
    supplierEmail: "levant@ovi.local",
    costPrice: 45,
    retailPrice: 95,
    wholesalePrice: 75,
    dealerPrice: 68,
    discountPercent: 8,
    stock: 70,
    minStock: 12,
    isFeatured: true,
    isNew: false,
    descriptionAr: "سماعات لاسلكية بتصميم خفيف وصوت واضح مع علبة شحن مناسبة للبيع السريع.",
  },
  {
    nameAr: "باور بانك PowerHub 20000mAh",
    nameEn: "PowerHub 20000mAh Power Bank",
    slug: "powerhub-20000mah-power-bank",
    sku: "OVI-PWR-006",
    barcode: "729000000006",
    categorySlug: "power-banks",
    brandSlug: "powerhub",
    supplierEmail: "hub@ovi.local",
    costPrice: 60,
    retailPrice: 130,
    wholesalePrice: 102,
    dealerPrice: 94,
    discountPercent: 0,
    stock: 42,
    minStock: 8,
    isFeatured: false,
    isNew: false,
    descriptionAr: "باور بانك بسعة عالية ومخارج متعددة لتغطية احتياجات العملاء والتجار.",
  },
];

async function main() {
  await mkdir(uploadProductsDir, { recursive: true });
  await mkdir(uploadCatalogsDir, { recursive: true });
  await prisma.session.deleteMany();

  for (const user of demoUsers) {
    const passwordHash = await bcrypt.hash(user.password, 12);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        passwordHash,
        phone: user.phone,
        role: user.role,
        priceGroup: user.priceGroup,
        isApproved: user.isApproved,
        isActive: true,
      },
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        phone: user.phone,
        role: user.role,
        priceGroup: user.priceGroup,
        isApproved: user.isApproved,
        isActive: true,
      },
    });
  }

  for (const [nameAr, nameEn, slug] of categoryData) {
    await prisma.category.upsert({
      where: { slug },
      update: { nameAr, nameEn, isVisible: true },
      create: { nameAr, nameEn, slug, isVisible: true },
    });
  }

  for (const [name, slug] of brandData) {
    await prisma.brand.upsert({
      where: { slug },
      update: { name, isVisible: true },
      create: { name, slug, isVisible: true },
    });
  }

  for (const supplier of supplierData) {
    const existing = await prisma.supplier.findFirst({ where: { email: supplier.email } });

    if (existing) {
      await prisma.supplier.update({ where: { id: existing.id }, data: { ...supplier, isActive: true } });
    } else {
      await prisma.supplier.create({ data: { ...supplier, isActive: true } });
    }
  }

  const logoPath = path.join(process.cwd(), "public", "images", "ovi-logo.png");

  for (const product of productData) {
    const [category, brand, supplier] = await Promise.all([
      prisma.category.findUniqueOrThrow({ where: { slug: product.categorySlug } }),
      prisma.brand.findUniqueOrThrow({ where: { slug: product.brandSlug } }),
      prisma.supplier.findFirstOrThrow({ where: { email: product.supplierEmail } }),
    ]);

    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        sku: product.sku,
        barcode: product.barcode,
        descriptionAr: product.descriptionAr,
        costPrice: product.costPrice,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        dealerPrice: product.dealerPrice,
        discountPercent: product.discountPercent,
        stock: product.stock,
        minStock: product.minStock,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isVisible: true,
        categoryId: category.id,
        brandId: brand.id,
        supplierId: supplier.id,
      },
      create: {
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        slug: product.slug,
        sku: product.sku,
        barcode: product.barcode,
        descriptionAr: product.descriptionAr,
        costPrice: product.costPrice,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        dealerPrice: product.dealerPrice,
        discountPercent: product.discountPercent,
        stock: product.stock,
        minStock: product.minStock,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isVisible: true,
        categoryId: category.id,
        brandId: brand.id,
        supplierId: supplier.id,
      },
    });

    await prisma.productImage.deleteMany({ where: { productId: saved.id } });
    await prisma.productCatalog.deleteMany({ where: { productId: saved.id } });

    const imageFileName = `seed-${product.slug}.png`;
    const imagePath = path.join(uploadProductsDir, imageFileName);

    await copyFile(logoPath, imagePath);

    await prisma.productImage.create({
      data: {
        productId: saved.id,
        url: `/uploads/products/${imageFileName}`,
        alt: product.nameAr,
        isMain: true,
        sortOrder: 0,
      },
    });

    const catalogFileName = `seed-${product.slug}.pdf`;
    await writeFile(path.join(uploadCatalogsDir, catalogFileName), minimalPdf(product.nameEn));

    await prisma.productCatalog.create({
      data: {
        productId: saved.id,
        title: `كتالوج ${product.nameAr}`,
        fileUrl: `/uploads/catalogs/${catalogFileName}`,
        fileType: "application/pdf",
      },
    });
  }
}

function minimalPdf(title: string) {
  return Buffer.from(`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT /F1 12 Tf 30 90 Td (${title}) Tj ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000059 00000 n 
0000000116 00000 n 
0000000207 00000 n 
trailer
<< /Root 1 0 R /Size 5 >>
startxref
300
%%EOF`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Seeded ${demoUsers.length} users and ${productData.length} products.`);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
