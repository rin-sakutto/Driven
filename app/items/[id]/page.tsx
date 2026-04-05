import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "../../lib/products";
import PurchaseForm from "./PurchaseForm";
import ProductImage from "../../components/ProductImage";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — product display */}
          <div>
            <ProductImage product={product} />

            {/* Product info below image */}
            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="flex items-end justify-between">
                <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">
                  {product.name}
                </h1>
                <span className="text-white text-lg font-black tracking-widest">
                  ${product.price.toLocaleString()}
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right — purchase form (Client Component) */}
          <PurchaseForm product={product} />
        </div>
      </div>
    </main>
  );
}
