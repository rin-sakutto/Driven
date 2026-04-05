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
};

export const products: Product[] = [
  {
    id: 1,
    label: "SS25 — 001",
    tag: "HOODIE",
    tileSize: "large",
    name: "DRIVEN HOODIE",
    description:
      "重量感のあるコットンフリース。無骨で純粋。着ることは、主張することだ。",
    price: 185,
    availableSizes: ["S", "M", "L", "XL"],
    shade: "#111111",
    images: ["/images/products/hoodie.svg"],
  },
  {
    id: 2,
    label: "SS25 — 002",
    tag: "JACKET",
    tileSize: "small",
    name: "DRIVEN JACKET",
    description:
      "テクニカルファブリック。どんな状況にも対応する。弱さを許さない一着。",
    price: 345,
    availableSizes: ["S", "M", "L", "XL"],
    shade: "#1a1a1a",
    images: ["/images/products/jacket.svg"],
  },
  {
    id: 3,
    label: "SS25 — 003",
    tag: "TEE",
    tileSize: "small",
    name: "DRIVEN TEE",
    description:
      "オーバーサイズシルエット。余白は強さだ。語らずして語るグラフィック。",
    price: 30,
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    shade: "#0d0d0d",
    images: [
      "https://github.com/user-attachments/assets/858c569b-99e6-409a-8ba9-5221f29c102a",
      "https://github.com/user-attachments/assets/bf4e5c92-ba6f-472a-a789-c41b42fc6a86",
    ],
  },
  {
    id: 4,
    label: "SS25 — 004",
    tag: "CARGO",
    tileSize: "medium",
    name: "DRIVEN CARGO",
    description:
      "機能性と美学の融合。余分なポケット、余分な言葉は要らない。動きが語る。",
    price: 250,
    availableSizes: ["S", "M", "L", "XL"],
    shade: "#161616",
    images: ["/images/products/cargo.svg"],
  },
  {
    id: 5,
    label: "SS25 — 005",
    tag: "KNIT",
    tileSize: "medium",
    name: "DRIVEN KNIT",
    description: "手で編まれた密度。時間が宿る素材。量産品には出せない温度がある。",
    price: 225,
    availableSizes: ["S", "M", "L"],
    shade: "#141414",
    images: ["/images/products/knit.svg"],
  },
  {
    id: 6,
    label: "SS25 — 006",
    tag: "CAP",
    tileSize: "small",
    name: "DRIVEN CAP",
    description:
      "六方向の構造。顔を隠せ、意図を見せろ。スタイルは目線から始まる。",
    price: 55,
    availableSizes: ["FREE"],
    shade: "#0a0a0a",
    images: ["/images/products/cap.svg"],
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
