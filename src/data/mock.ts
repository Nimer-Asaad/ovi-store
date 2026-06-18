import type { UserRole } from "@/lib/user-roles";

export type Category = {
  name: string;
  slug: string;
  short: string;
  count: number;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  dealerPrice?: number;
  discountPercent: number;
  stock: number;
  lowStockThreshold: number;
  visible: boolean;
  supplierId: string;
  rating: number;
  featured?: boolean;
  badge?: string;
  specs: string[];
  color: string;
  imageUrl?: string;
  brandName?: string;
};

export type OrderStatus = "pending" | "under_review" | "confirmed" | "preparing" | "delivered" | "cancelled";

export type OrderLineItem = {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
};

export type Order = {
  id: string;
  customerId: string;
  customer: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
  lineItems: OrderLineItem[];
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Extract<UserRole, "CUSTOMER" | "MERCHANT" | "DEALER">;
  priceGroup: "retail" | "merchant" | "dealer";
  merchantStatus: "approved" | "pending" | "rejected" | "not_requested";
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  products: number;
  outstandingBalance: number;
  status: "active" | "paused";
};

export type SalesRep = {
  id: string;
  name: string;
  phone: string;
  territory: string;
  activeCustomers: number;
  monthlySales: number;
  status: "active" | "inactive";
};

export const categories: Category[] = [
  { name: "كفرات حماية", slug: "phone-cases", short: "CF", count: 42, description: "كفرات سيليكون، ماغ سيف، ودرع حماية للهواتف الحديثة." },
  { name: "لزقات شاشة", slug: "screen-protectors", short: "SP", count: 36, description: "زجاج حماية شفاف، خصوصية، ومضاد للكسر." },
  { name: "شواحن", slug: "chargers", short: "CH", count: 28, description: "شواحن سريعة، جداريات، وشواحن متعددة المنافذ." },
  { name: "كيابل", slug: "cables", short: "CB", count: 31, description: "كيابل Type-C وLightning وUSB متعددة الاستخدام." },
  { name: "سماعات", slug: "headphones", short: "HP", count: 22, description: "سماعات بلوتوث وسلكية بجودة عالية." },
  { name: "باور بانك", slug: "power-banks", short: "PB", count: 17, description: "بطاريات متنقلة بسعات مختلفة وشحن سريع." },
  { name: "بطاريات", slug: "batteries", short: "BT", count: 15, description: "بطاريات بديلة ومستلزمات صيانة للطاقة." },
  { name: "ساعات ذكية", slug: "smart-watches", short: "SW", count: 19, description: "ساعات ذكية وسوارات رياضية واكسسواراتها." },
  { name: "اكسسوارات سيارات", slug: "car-accessories", short: "CA", count: 21, description: "حوامل، شواحن سيارة، ووصلات للقيادة اليومية." },
  { name: "أدوات صيانة", slug: "repair-tools", short: "RT", count: 26, description: "مفكات، ملاقط، لواصق، وقطع صيانة للمحلات." },
  { name: "اكسسوارات شبكة", slug: "network-accessories", short: "NW", count: 13, description: "راوترات صغيرة، وصلات، ومقويات إشارة." },
  { name: "أجهزة موبايل", slug: "mobile-devices", short: "MD", count: 10, description: "أجهزة مختارة وحلول جاهزة للبيع." },
];

export const mockProducts: Product[] = [
  {
    id: "prd-1001",
    name: "كفر حماية MagShield للايفون",
    slug: "magshield-iphone-case",
    sku: "OVI-CF-1001",
    categorySlug: "phone-cases",
    categoryName: "كفرات حماية",
    description: "كفر قوي بظهر شفاف وحواف ممتصة للصدمات مع دعم شحن مغناطيسي.",
    costPrice: 17,
    retailPrice: 39,
    wholesalePrice: 28,
    dealerPrice: 24,
    discountPercent: 10,
    stock: 120,
    lowStockThreshold: 25,
    visible: true,
    supplierId: "sup-001",
    rating: 4.8,
    featured: true,
    badge: "الأكثر طلبا",
    specs: ["ماغ سيف", "حواف مرتفعة", "مقاوم للاصفرار"],
    color: "from-teal-500 to-slate-900",
  },
  {
    id: "prd-2040",
    name: "زجاج حماية Privacy 9D",
    slug: "privacy-9d-screen-protector",
    sku: "OVI-SP-2040",
    categorySlug: "screen-protectors",
    categoryName: "لزقات شاشة",
    description: "لزقة شاشة خصوصية كاملة التغطية مع طبقة مضادة للبصمات.",
    costPrice: 6,
    retailPrice: 19,
    wholesalePrice: 11,
    dealerPrice: 9,
    discountPercent: 0,
    stock: 340,
    lowStockThreshold: 60,
    visible: true,
    supplierId: "sup-002",
    rating: 4.7,
    featured: true,
    badge: "جملة",
    specs: ["خصوصية", "9D", "تركيب سريع"],
    color: "from-cyan-500 to-slate-800",
  },
  {
    id: "prd-6500",
    name: "شاحن GaN سريع 65W",
    slug: "gan-fast-charger-65w",
    sku: "OVI-CH-6500",
    categorySlug: "chargers",
    categoryName: "شواحن",
    description: "شاحن جداري صغير بتقنية GaN مع منفذي Type-C ومنفذ USB.",
    costPrice: 49,
    retailPrice: 89,
    wholesalePrice: 68,
    dealerPrice: 61,
    discountPercent: 5,
    stock: 75,
    lowStockThreshold: 30,
    visible: true,
    supplierId: "sup-003",
    rating: 4.9,
    featured: true,
    badge: "65W",
    specs: ["GaN", "3 منافذ", "PD/QC"],
    color: "from-amber-400 to-slate-900",
  },
  {
    id: "prd-2200",
    name: "كيبل Type-C مضفر 2 متر",
    slug: "braided-type-c-cable-2m",
    sku: "OVI-CB-2200",
    categorySlug: "cables",
    categoryName: "كيابل",
    description: "كيبل شحن ونقل بيانات بطول عملي ومقاومة عالية للانحناء.",
    costPrice: 8,
    retailPrice: 24,
    wholesalePrice: 15,
    dealerPrice: 13,
    discountPercent: 0,
    stock: 18,
    lowStockThreshold: 25,
    visible: true,
    supplierId: "sup-002",
    rating: 4.6,
    specs: ["2 متر", "مضفر", "3A"],
    color: "from-emerald-500 to-slate-800",
  },
  {
    id: "prd-3310",
    name: "سماعات بلوتوث AirBeat",
    slug: "airbeat-wireless-earbuds",
    sku: "OVI-HP-3310",
    categorySlug: "headphones",
    categoryName: "سماعات",
    description: "سماعات لاسلكية بعلبة شحن وصوت نقي للمكالمات والموسيقى.",
    costPrice: 69,
    retailPrice: 119,
    wholesalePrice: 92,
    dealerPrice: 85,
    discountPercent: 12,
    stock: 58,
    lowStockThreshold: 20,
    visible: true,
    supplierId: "sup-004",
    rating: 4.5,
    featured: true,
    badge: "بلوتوث",
    specs: ["عزل ضجيج", "24 ساعة", "USB-C"],
    color: "from-sky-500 to-slate-900",
  },
  {
    id: "prd-2000",
    name: "باور بانك 20000mAh",
    slug: "power-bank-20000mah",
    sku: "OVI-PB-2000",
    categorySlug: "power-banks",
    categoryName: "باور بانك",
    description: "بطارية متنقلة بسعة كبيرة وشاشة رقمية ومنفذين للشحن.",
    costPrice: 76,
    retailPrice: 129,
    wholesalePrice: 99,
    dealerPrice: 92,
    discountPercent: 0,
    stock: 12,
    lowStockThreshold: 18,
    visible: true,
    supplierId: "sup-003",
    rating: 4.7,
    featured: true,
    specs: ["20000mAh", "PD 22.5W", "شاشة رقمية"],
    color: "from-lime-500 to-slate-900",
  },
  {
    id: "prd-4102",
    name: "ساعة Smart Fit X2",
    slug: "smart-fit-x2-watch",
    sku: "OVI-SW-4102",
    categorySlug: "smart-watches",
    categoryName: "ساعات ذكية",
    description: "ساعة ذكية بشاشة واضحة، تتبع رياضي، وتنبيهات عربية.",
    costPrice: 98,
    retailPrice: 159,
    wholesalePrice: 125,
    discountPercent: 8,
    stock: 33,
    lowStockThreshold: 12,
    visible: false,
    supplierId: "sup-004",
    rating: 4.4,
    specs: ["مقاومة رذاذ", "قياس نبض", "7 أيام"],
    color: "from-rose-500 to-slate-900",
  },
  {
    id: "prd-5100",
    name: "حامل سيارة مغناطيسي",
    slug: "magnetic-car-mount",
    sku: "OVI-CA-5100",
    categorySlug: "car-accessories",
    categoryName: "اكسسوارات سيارات",
    description: "حامل ثابت للتابلوه وفتحة المكيف مع مغناطيس قوي.",
    costPrice: 14,
    retailPrice: 35,
    wholesalePrice: 23,
    dealerPrice: 20,
    discountPercent: 0,
    stock: 96,
    lowStockThreshold: 25,
    visible: true,
    supplierId: "sup-001",
    rating: 4.3,
    specs: ["360 درجة", "مغناطيسي", "قاعدة ثابتة"],
    color: "from-orange-400 to-slate-900",
  },
  {
    id: "prd-1800",
    name: "طقم أدوات صيانة 18 قطعة",
    slug: "repair-toolkit-18pcs",
    sku: "OVI-RT-1800",
    categorySlug: "repair-tools",
    categoryName: "أدوات صيانة",
    description: "مجموعة أدوات مناسبة لمحلات صيانة الهواتف والتابلت.",
    costPrice: 27,
    retailPrice: 59,
    wholesalePrice: 42,
    dealerPrice: 38,
    discountPercent: 0,
    stock: 9,
    lowStockThreshold: 15,
    visible: true,
    supplierId: "sup-005",
    rating: 4.6,
    specs: ["18 قطعة", "مفكات دقيقة", "علبة تنظيم"],
    color: "from-stone-500 to-slate-950",
  },
];

export const mockCustomers: Customer[] = [
  { id: "cus-001", name: "محمود عواد", email: "mahmoud@example.com", phone: "0599001001", role: "CUSTOMER", priceGroup: "retail", merchantStatus: "not_requested", totalOrders: 4, totalSpent: 438, joinedAt: "2026-05-02" },
  { id: "cus-002", name: "شركة القدس موبايل", email: "sales@qudsmobile.test", phone: "0599001002", role: "MERCHANT", priceGroup: "merchant", merchantStatus: "approved", totalOrders: 12, totalSpent: 1260, joinedAt: "2026-04-18" },
  { id: "cus-003", name: "نور الخطيب", email: "nour@example.com", phone: "0599001003", role: "CUSTOMER", priceGroup: "retail", merchantStatus: "not_requested", totalOrders: 2, totalSpent: 178, joinedAt: "2026-06-01" },
  { id: "cus-004", name: "رامي تيليكوم", email: "rami@telecom.test", phone: "0599001004", role: "DEALER", priceGroup: "dealer", merchantStatus: "approved", totalOrders: 9, totalSpent: 740, joinedAt: "2026-03-10" },
  { id: "cus-005", name: "البرج للاتصالات", email: "burj@example.com", phone: "0599001005", role: "MERCHANT", priceGroup: "merchant", merchantStatus: "pending", totalOrders: 0, totalSpent: 0, joinedAt: "2026-06-16" },
  { id: "cus-006", name: "متجر المدينة", email: "madina@example.com", phone: "0599001006", role: "CUSTOMER", priceGroup: "retail", merchantStatus: "rejected", totalOrders: 1, totalSpent: 95, joinedAt: "2026-06-10" },
];

export const mockSuppliers: Supplier[] = [
  { id: "sup-001", name: "TechLine Accessories", contact: "سامي مراد", phone: "0598002001", products: 18, outstandingBalance: 1200, status: "active" },
  { id: "sup-002", name: "GlassPro Trading", contact: "ليان عيسى", phone: "0598002002", products: 24, outstandingBalance: 640, status: "active" },
  { id: "sup-003", name: "Power Hub", contact: "رامز حمدان", phone: "0598002003", products: 11, outstandingBalance: 2180, status: "active" },
  { id: "sup-004", name: "Smart Wear Co.", contact: "نوران سالم", phone: "0598002004", products: 9, outstandingBalance: 0, status: "paused" },
  { id: "sup-005", name: "Repair Tools Market", contact: "أيمن خليل", phone: "0598002005", products: 15, outstandingBalance: 510, status: "active" },
];

export const mockSalesReps: SalesRep[] = [
  { id: "rep-001", name: "أحمد ناصر", phone: "0597003001", territory: "رام الله", activeCustomers: 22, monthlySales: 1840, status: "active" },
  { id: "rep-002", name: "سارة عوض", phone: "0597003002", territory: "الخليل", activeCustomers: 17, monthlySales: 1320, status: "active" },
  { id: "rep-003", name: "علاء زيد", phone: "0597003003", territory: "نابلس", activeCustomers: 11, monthlySales: 790, status: "inactive" },
];

export const mockOrders: Order[] = [
  {
    id: "OVI-1042",
    customerId: "cus-001",
    customer: "محمود عواد",
    total: 438,
    status: "preparing",
    date: "2026-06-18",
    items: 8,
    shippingAddress: "رام الله، شارع الإرسال",
    phone: "0599001001",
    paymentMethod: "الدفع عند الاستلام",
    lineItems: [
      { productId: "prd-1001", productName: "كفر حماية MagShield للايفون", sku: "OVI-CF-1001", quantity: 4, unitPrice: 39, costPrice: 17 },
      { productId: "prd-6500", productName: "شاحن GaN سريع 65W", sku: "OVI-CH-6500", quantity: 2, unitPrice: 89, costPrice: 49 },
      { productId: "prd-2200", productName: "كيبل Type-C مضفر 2 متر", sku: "OVI-CB-2200", quantity: 2, unitPrice: 24, costPrice: 8 },
    ],
  },
  {
    id: "OVI-1041",
    customerId: "cus-002",
    customer: "شركة القدس موبايل",
    total: 1260,
    status: "confirmed",
    date: "2026-06-17",
    items: 24,
    shippingAddress: "القدس، بيت حنينا",
    phone: "0599001002",
    paymentMethod: "تحويل بنكي",
    lineItems: [
      { productId: "prd-2040", productName: "زجاج حماية Privacy 9D", sku: "OVI-SP-2040", quantity: 16, unitPrice: 11, costPrice: 6 },
      { productId: "prd-3310", productName: "سماعات بلوتوث AirBeat", sku: "OVI-HP-3310", quantity: 8, unitPrice: 92, costPrice: 69 },
      { productId: "prd-2000", productName: "باور بانك 20000mAh", sku: "OVI-PB-2000", quantity: 4, unitPrice: 99, costPrice: 76 },
    ],
  },
  {
    id: "OVI-1040",
    customerId: "cus-003",
    customer: "نور الخطيب",
    total: 178,
    status: "delivered",
    date: "2026-06-15",
    items: 3,
    shippingAddress: "نابلس، رفيديا",
    phone: "0599001003",
    paymentMethod: "الدفع عند الاستلام",
    lineItems: [
      { productId: "prd-6500", productName: "شاحن GaN سريع 65W", sku: "OVI-CH-6500", quantity: 2, unitPrice: 89, costPrice: 49 },
    ],
  },
  {
    id: "OVI-1039",
    customerId: "cus-004",
    customer: "رامي تيليكوم",
    total: 740,
    status: "pending",
    date: "2026-06-14",
    items: 14,
    shippingAddress: "الخليل، وسط البلد",
    phone: "0599001004",
    paymentMethod: "آجل",
    lineItems: [
      { productId: "prd-1001", productName: "كفر حماية MagShield للايفون", sku: "OVI-CF-1001", quantity: 10, unitPrice: 24, costPrice: 17 },
      { productId: "prd-1800", productName: "طقم أدوات صيانة 18 قطعة", sku: "OVI-RT-1800", quantity: 5, unitPrice: 38, costPrice: 27 },
    ],
  },
  {
    id: "OVI-1038",
    customerId: "cus-006",
    customer: "متجر المدينة",
    total: 95,
    status: "under_review",
    date: "2026-06-13",
    items: 5,
    shippingAddress: "بيت لحم، شارع القدس",
    phone: "0599001006",
    paymentMethod: "الدفع عند الاستلام",
    lineItems: [
      { productId: "prd-2200", productName: "كيبل Type-C مضفر 2 متر", sku: "OVI-CB-2200", quantity: 5, unitPrice: 19, costPrice: 8 },
    ],
  },
  {
    id: "OVI-1037",
    customerId: "cus-002",
    customer: "شركة القدس موبايل",
    total: 320,
    status: "cancelled",
    date: "2026-06-12",
    items: 7,
    shippingAddress: "القدس، بيت حنينا",
    phone: "0599001002",
    paymentMethod: "تحويل بنكي",
    lineItems: [
      { productId: "prd-5100", productName: "حامل سيارة مغناطيسي", sku: "OVI-CA-5100", quantity: 10, unitPrice: 23, costPrice: 14 },
    ],
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ar-PS", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (slug: string) => mockProducts.find((product) => product.slug === slug);

export const getProductById = (id: string) => mockProducts.find((product) => product.id === id);

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);

export const getOrderById = (id: string) => mockOrders.find((order) => order.id === id);

export const getOrderProfit = (order: Order) =>
  order.lineItems.reduce((sum, item) => sum + (item.unitPrice - item.costPrice) * item.quantity, 0);
