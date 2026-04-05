import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "../../lib/products";
import PurchaseForm from "./PurchaseForm";

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
            {/* Product image placeholder */}
            <div
              className="relative overflow-hidden"
              style={{ backgroundColor: product.shade }}
            >
              <div
                className={`${
                  product.tileSize === "large"
                    ? "h-[500px] md:h-[620px]"
                    : product.tileSize === "medium"
                    ? "h-[400px] md:h-[500px]"
                    : "h-[340px] md:h-[440px]"
                } relative flex items-end p-8 md:p-10`}
              >
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

                {/* Large background tag */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                  <span className="text-[22vw] md:text-[12vw] font-black text-white/[0.04] tracking-tighter leading-none">
                    {product.tag}
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <span className="block text-white/20 text-[10px] tracking-widest uppercase mb-2">
                    {product.label}
                  </span>
                  <span className="text-white text-2xl md:text-3xl font-black tracking-wider">
                    {product.tag}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-white/10" />
              </div>
            </div>

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
