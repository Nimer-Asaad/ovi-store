import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import type { PriceGroup, Role } from "../src/generated/prisma/enums";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

const demoUsers: Array<{
  name: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  priceGroup: PriceGroup;
  isApproved: boolean;
}> = [
  {
    name: "مدير Ovi",
    email: "admin@ovi.local",
    password: "Admin123456",
    phone: "0599000001",
    role: "ADMIN",
    priceGroup: "VIP",
    isApproved: true,
  },
  {
    name: "عميل تجريبي",
    email: "customer@ovi.local",
    password: "Customer123456",
    phone: "0599000002",
    role: "CUSTOMER",
    priceGroup: "RETAIL",
    isApproved: true,
  },
  {
    name: "تاجر تجريبي",
    email: "merchant@ovi.local",
    password: "Merchant123456",
    phone: "0599000003",
    role: "MERCHANT",
    priceGroup: "WHOLESALE",
    isApproved: true,
  },
  {
    name: "موزع تجريبي",
    email: "dealer@ovi.local",
    password: "Dealer123456",
    phone: "0599000004",
    role: "DEALER",
    priceGroup: "DEALER",
    isApproved: true,
  },
  {
    name: "مندوب مبيعات",
    email: "sales@ovi.local",
    password: "Sales123456",
    phone: "0599000005",
    role: "SALES_REP",
    priceGroup: "RETAIL",
    isApproved: true,
  },
  {
    name: "مورد تجريبي",
    email: "supplier@ovi.local",
    password: "Supplier123456",
    phone: "0599000006",
    role: "SUPPLIER",
    priceGroup: "RETAIL",
    isApproved: true,
  },
  {
    name: "تاجر بانتظار الموافقة",
    email: "pending@ovi.local",
    password: "Pending123456",
    phone: "0599000007",
    role: "MERCHANT",
    priceGroup: "WHOLESALE",
    isApproved: false,
  },
];

async function main() {
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
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Seeded ${demoUsers.length} demo users.`);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
