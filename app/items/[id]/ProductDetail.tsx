"use client";

import { useState } from "react";
import ProductImage from "../../components/ProductImage";
import PurchaseForm from "./PurchaseForm";
import type { Product } from "../../lib/products";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.name ?? null,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
      {/* Left — product display */}
      <div>
        <ProductImage
          product={product}
          selectedColor={selectedColor}
        />

        {/* Product info below image */}
        <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
          <div className="flex items-end justify-between">
            <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">
              {product.name}
            </h1>
            <span className="text-white text-lg font-black tracking-widest">
              ¥{product.price.toLocaleString()}
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Right — purchase form */}
      <PurchaseForm
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
    </div>
  );
}
