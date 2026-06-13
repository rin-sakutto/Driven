export type Color = { name: string; image: string };

export type Product = {
  id: number;
  label: string;
  tag: string;
  tileSize: "large" | "small" | "medium";
  name: string;
  description: string;
  price: number;
  availableSizes: string[];
  shade: string;
  images?: string[];
  colors?: Color[];
};

export const products: Product[] = [
  {
    id: 1,
    label: "SS25 — 001",
    tag: "TEE",
    tileSize: "large",
    name: "DRIVEN TEE — LOGO",
    description: "胸元に宿る静かな主張。座標が刻む、ここにいた証。",
    price: 4000,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    shade: "#080808",
    images: [
      "/images/products/tee-black-front.jpg",
      "/images/products/tee-black-back.jpg",
    ],
  },
  {
    id: 3,
    label: "SS25 — 003",
    tag: "TEE",
    tileSize: "large",
    name: "DRIVEN TEE — DONUT",
    description:
      "オーバーサイズシルエット。余白は強さだ。語らずして語るグラフィック。",
    price: 4000,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    shade: "#0a1628",
    images: ["/images/products/IMG_4911.jpg"],
  },
  {
    id: 7,
    label: "SS25 — 007",
    tag: "TEE",
    tileSize: "large",
    name: "DRIVEN TEE — BEACH",
    description: "砂と波の記憶を纏う。どこにいても、夏を連れてくる一枚。",
    price: 4000,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    shade: "#101820",
    images: ["/images/products/IMG_4914.jpg"],
    colors: [
      { name: "GRAY", image: "/images/products/IMG_4914.jpg" },
      { name: "BLUE", image: "/images/products/IMG_4915.jpg" },
      { name: "YELLOW", image: "/images/products/IMG_4916.jpg" },
      { name: "WHITE", image: "/images/products/IMG_4917.jpg" },
    ],
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
