"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { Product } from "../lib/products";

type Props = { product: Product };

export default function ProductImage({ product }: Props) {
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const heightClass =
    product.tileSize === "large"
      ? "h-[500px] md:h-[620px]"
      : product.tileSize === "medium"
      ? "h-[400px] md:h-[500px]"
      : "h-[340px] md:h-[440px]";

  const images = product.images ?? [];
  const src = images[imgIndex] ?? "";
  const isExternal = src.startsWith("http");

  function prev() {
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setImgIndex((i) => (i + 1) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  }

  return (
    <div
      className={`relative overflow-hidden ${heightClass} select-none`}
      style={{ backgroundColor: product.shade }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {images.length > 0 && (
        <>
          {isExternal ? (
            /* External raster (e.g. GitHub-hosted TEE photos) */
            <Image
              key={src}
              src={src}
              alt={`${product.name} — ${product.label}`}
              fill
              className="object-cover transition-opacity duration-300"
              unoptimized
            />
          ) : (
            /* Local SVG illustration */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${product.name} — ${product.label}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
            />
          )}

          {images.length > 1 && (
            <>
              {/* Prev / Next arrow buttons */}
              <button
                onClick={prev}
                aria-label="前の画像"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/70 hover:text-white transition-colors duration-200"
              >
                ‹
              </button>
              <button
                onClick={next}
                aria-label="次の画像"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/70 hover:text-white transition-colors duration-200"
              >
                ›
              </button>

              {/* Dot navigation */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      imgIndex === i ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </>
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
