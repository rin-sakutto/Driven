import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "../../lib/products";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 bg-black/80 backdrop-blur-sm">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-xs tracking-[0.4em] uppercase transition-colors duration-300"
        >
          ← DRIVEN
        </Link>
        <span className="text-white/20 text-[10px] tracking-widest uppercase">
          {product.label}
        </span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
