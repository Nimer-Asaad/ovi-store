export type Category = {
  name: string;
  slug: string;
  short: string;
  count: number;
  description: string;
};

export type Product = {
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  price: number;
  wholesale: number;
  stock: number;
  rating: number;
  featured?: boolean;
  badge?: string;
  specs: string[];
  color: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  customer: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
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
    name: "كفر حماية MagShield للايفون",
    slug: "magshield-iphone-case",
    sku: "OVI-CF-1001",
    categorySlug: "phone-cases",
    categoryName: "كفرات حماية",
    description: "كفر قوي بظهر شفاف وحواف ممتصة للصدمات مع دعم شحن مغناطيسي.",
    price: 39,
    wholesale: 28,
    stock: 120,
    rating: 4.8,
    featured: true,
    badge: "الأكثر طلبا",
    specs: ["ماغ سيف", "حواف مرتفعة", "مقاوم للاصفرار"],
    color: "from-teal-500 to-slate-900",
  },
  {
    name: "زجاج حماية Privacy 9D",
    slug: "privacy-9d-screen-protector",
    sku: "OVI-SP-2040",
    categorySlug: "screen-protectors",
    categoryName: "لزقات شاشة",
    description: "لزقة شاشة خصوصية كاملة التغطية مع طبقة مضادة للبصمات.",
    price: 19,
    wholesale: 11,
    stock: 340,
    rating: 4.7,
    featured: true,
    badge: "جملة",
    specs: ["خصوصية", "9D", "تركيب سريع"],
    color: "from-cyan-500 to-slate-800",
  },
  {
    name: "شاحن GaN سريع 65W",
    slug: "gan-fast-charger-65w",
    sku: "OVI-CH-6500",
    categorySlug: "chargers",
    categoryName: "شواحن",
    description: "شاحن جداري صغير بتقنية GaN مع منفذي Type-C ومنفذ USB.",
    price: 89,
    wholesale: 68,
    stock: 75,
    rating: 4.9,
    featured: true,
    badge: "65W",
    specs: ["GaN", "3 منافذ", "PD/QC"],
    color: "from-amber-400 to-slate-900",
  },
  {
    name: "كيبل Type-C مضفر 2 متر",
    slug: "braided-type-c-cable-2m",
    sku: "OVI-CB-2200",
    categorySlug: "cables",
    categoryName: "كيابل",
    description: "كيبل شحن ونقل بيانات بطول عملي ومقاومة عالية للانحناء.",
    price: 24,
    wholesale: 15,
    stock: 210,
    rating: 4.6,
    specs: ["2 متر", "مضفر", "3A"],
    color: "from-emerald-500 to-slate-800",
  },
  {
    name: "سماعات بلوتوث AirBeat",
    slug: "airbeat-wireless-earbuds",
    sku: "OVI-HP-3310",
    categorySlug: "headphones",
    categoryName: "سماعات",
    description: "سماعات لاسلكية بعلبة شحن وصوت نقي للمكالمات والموسيقى.",
    price: 119,
    wholesale: 92,
    stock: 58,
    rating: 4.5,
    featured: true,
    badge: "بلوتوث",
    specs: ["عزل ضجيج", "24 ساعة", "USB-C"],
    color: "from-sky-500 to-slate-900",
  },
  {
    name: "باور بانك 20000mAh",
    slug: "power-bank-20000mah",
    sku: "OVI-PB-2000",
    categorySlug: "power-banks",
    categoryName: "باور بانك",
    description: "بطارية متنقلة بسعة كبيرة وشاشة رقمية ومنفذين للشحن.",
    price: 129,
    wholesale: 99,
    stock: 44,
    rating: 4.7,
    featured: true,
    specs: ["20000mAh", "PD 22.5W", "شاشة رقمية"],
    color: "from-lime-500 to-slate-900",
  },
  {
    name: "ساعة Smart Fit X2",
    slug: "smart-fit-x2-watch",
    sku: "OVI-SW-4102",
    categorySlug: "smart-watches",
    categoryName: "ساعات ذكية",
    description: "ساعة ذكية بشاشة واضحة، تتبع رياضي، وتنبيهات عربية.",
    price: 159,
    wholesale: 125,
    stock: 33,
    rating: 4.4,
    specs: ["مقاومة رذاذ", "قياس نبض", "7 أيام"],
    color: "from-rose-500 to-slate-900",
  },
  {
    name: "حامل سيارة مغناطيسي",
    slug: "magnetic-car-mount",
    sku: "OVI-CA-5100",
    categorySlug: "car-accessories",
    categoryName: "اكسسوارات سيارات",
    description: "حامل ثابت للتابلوه وفتحة المكيف مع مغناطيس قوي.",
    price: 35,
    wholesale: 23,
    stock: 96,
    rating: 4.3,
    specs: ["360 درجة", "مغناطيسي", "قاعدة ثابتة"],
    color: "from-orange-400 to-slate-900",
  },
  {
    name: "طقم أدوات صيانة 18 قطعة",
    slug: "repair-toolkit-18pcs",
    sku: "OVI-RT-1800",
    categorySlug: "repair-tools",
    categoryName: "أدوات صيانة",
    description: "مجموعة أدوات مناسبة لمحلات صيانة الهواتف والتابلت.",
    price: 59,
    wholesale: 42,
    stock: 64,
    rating: 4.6,
    specs: ["18 قطعة", "مفكات دقيقة", "علبة تنظيم"],
    color: "from-stone-500 to-slate-950",
  },
];

export const mockOrders: Order[] = [
  { id: "OVI-1042", customer: "محمود عواد", total: 438, status: "processing", date: "2026-06-18", items: 8 },
  { id: "OVI-1041", customer: "شركة القدس موبايل", total: 1260, status: "shipped", date: "2026-06-17", items: 24 },
  { id: "OVI-1040", customer: "نور الخطيب", total: 178, status: "delivered", date: "2026-06-15", items: 3 },
  { id: "OVI-1039", customer: "رامي تيليكوم", total: 740, status: "pending", date: "2026-06-14", items: 14 },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ar-PS", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export const getProduct = (slug: string) => mockProducts.find((product) => product.slug === slug);

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
