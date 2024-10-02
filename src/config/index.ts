import { ICartItem, ProductCategory } from "@/types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    label: "New Releases",
    value: "new_releases" as const,
    href: "/",
  },
  {
    label: "Jordan",
    value: "jordan_brand" as const,
    featured: {
      shoes: [
        { label: "View all", href: "/" },
        { label: "Air Jordan 1", href: "/" },
        { label: "Air Jordan 2", href: "/" },
        { label: "Air Jordan 3", href: "/" },
        { label: "Air Jordan 4", href: "/" },
        { label: "Air Jordan 5", href: "/" },
        { label: "Air Jordan 6", href: "/" },
        { label: "Air Jordan 7", href: "/" },
        { label: "Air Jordan 8", href: "/" },
        { label: "Air Jordan 9", href: "/" },
        { label: "Air Jordan 10", href: "/" },
        { label: "Air Jordan 11", href: "/" },
        { label: "Air Jordan 12", href: "/" },
        { label: "Air Jordan 13", href: "/" },
        { label: "Air Jordan 14", href: "/" },
        { label: "Air Jordan 15", href: "/" },
        { label: "Air Jordan 16", href: "/" },
        { label: "More Jordan Shoes", href: "/" },
      ],
      popular: [
        {
          label: "Air Jordan 1",
          value: "air_jordan_1",
          imageSrc: "/assets/jordan/air-jordan-1.png",
          href: "/",
        },
        {
          label: "Air Jordan 4",
          value: "air_jordan_4",
          imageSrc: "/assets/jordan/air-jordan-4.png",
          href: "/",
        },
        {
          label: "Air Jordan 5",
          value: "air_jordan_5",
          imageSrc: "/assets/jordan/air-jordan-5.png",
          href: "/",
        },
      ],
    },
  },
  {
    label: "Nike",
    value: "nike_brand" as const,
  },
  {
    label: "Adidas",
    value: "adidas_brand" as const,
  },
  {
    label: "Yeezy",
    value: "yeezy_brand" as const,
  },
  {
    label: "New Balance",
    value: "new_balance_brand" as const,
  },
  {
    label: "Womens",
    value: "womens_sizes" as const,
  },
  {
    label: "Kids",
    value: "kids_sizes" as const,
  },
  {
    label: "Brands",
    value: "all_brands" as const,
  },
  {
    label: "Below Retail",
    value: "below_retail",
    href: "/",
  },
  {
    label: "Sale",
    value: "on_sale",
    href: "/",
  },
];

export const PRODUCT_LIST: ICartItem[] = [
  // {
  //   name: "Travis Scott - Cactus Jack",
  //   model: "Air Force 1 Low",
  //   size: 9.5,
  //   price: 517.6,
  // },
  // {
  //   name: "Glow",
  //   model: "Basketball Knit",
  //   size: 9.5,
  //   price: 121.6,
  // },
];
