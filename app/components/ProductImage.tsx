"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "../lib/products";

type Props = { product: Product };

export default function ProductImage({ product }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  const heightClass =
    product.tileSize === "large"
      ? "h-[500px] md:h-[620px]"
      : product.tileSize === "medium"
      ? "h-[400px] md:h-[500px]"
      : "h-[340px] md:h-[440px]";

  const images = product.images ?? [];
  const src = images[imgIndex] ?? "";
  const isExternal = src.startsWith("http");

  return (
    <div
      className={`relative overflow-hidden ${heightClass}`}
      style={{ backgroundColor: product.shade }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {images.length > 0 && (
        <>
          {isExternal ? (
            /* External raster (e.g. GitHub-hosted TEE photos) */
            <Image
              src={src}
              alt={`${product.name} — ${product.label}`}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            /* Local SVG illustration */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={`${product.name} — ${product.label}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                    imgIndex === i ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Label + tag overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <div className="relative z-10">
          <span className="block text-white/20 text-[10px] tracking-widest uppercase mb-2">
            {product.label}
          </span>
          <span className="text-white text-2xl md:text-3xl font-black tracking-wider">
            {product.tag}
          </span>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-white/10" />
    </div>
  );
}
