"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "../lib/products";

function ClothingSilhouette({ tag }: { tag: string }) {
  switch (tag) {
    case "HOODIE":
      return (
        <svg
          viewBox="0 0 240 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "55%", height: "55%", opacity: 0.45 }}
        >
          {/* Hood opening */}
          <path d="M85 55 Q120 30 155 55" stroke="white" strokeWidth="1.5" />
          {/* Left sleeve */}
          <path d="M85 55 Q55 75 40 115 L32 185 L68 190 L72 155 L90 155" stroke="white" strokeWidth="1.5" />
          {/* Right sleeve */}
          <path d="M155 55 Q185 75 200 115 L208 185 L172 190 L168 155 L150 155" stroke="white" strokeWidth="1.5" />
          {/* Body */}
          <path d="M90 155 L90 268 L150 268 L150 155" stroke="white" strokeWidth="1.5" />
          {/* Shoulder join lines */}
          <path d="M85 55 Q103 85 120 85 Q137 85 155 55" stroke="white" strokeWidth="1.5" />
          {/* Kangaroo pocket */}
          <path d="M90 210 Q120 205 150 210 L150 250 L90 250 Z" stroke="white" strokeWidth="1" />
          {/* Centre seam */}
          <line x1="120" y1="85" x2="120" y2="268" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 3" />
        </svg>
      );

    case "JACKET":
      return (
        <svg
          viewBox="0 0 240 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "55%", height: "55%", opacity: 0.45 }}
        >
          {/* Left lapel */}
          <path d="M120 45 L92 95 L87 130" stroke="white" strokeWidth="1.5" />
          {/* Right lapel */}
          <path d="M120 45 L148 95 L153 130" stroke="white" strokeWidth="1.5" />
          {/* Left sleeve */}
          <path d="M92 95 L38 135 L28 205 L60 208 L70 158 L87 155" stroke="white" strokeWidth="1.5" />
          {/* Right sleeve */}
          <path d="M148 95 L202 135 L212 205 L180 208 L170 158 L153 155" stroke="white" strokeWidth="1.5" />
          {/* Body */}
          <path d="M87 130 L82 268 L158 268 L153 130" stroke="white" strokeWidth="1.5" />
          {/* Left pocket */}
          <rect x="87" y="205" width="33" height="22" rx="1" stroke="white" strokeWidth="1" />
          {/* Right pocket */}
          <rect x="120" y="205" width="33" height="22" rx="1" stroke="white" strokeWidth="1" />
          {/* Zipper */}
          <line x1="120" y1="95" x2="120" y2="268" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 2" />
        </svg>
      );

    case "TEE":
      return (
        <svg
          viewBox="0 0 240 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "55%", height: "55%", opacity: 0.45 }}
        >
          {/* Neckline */}
          <path d="M100 42 Q120 58 140 42" stroke="white" strokeWidth="1.5" />
          {/* Full outline: left sleeve + body + right sleeve */}
          <path
            d="M100 42 L38 105 L55 133 L95 95 L93 255 L147 255 L145 95 L185 133 L202 105 L140 42"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "CARGO":
      return (
        <svg
          viewBox="0 0 200 310"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "45%", height: "55%", opacity: 0.45 }}
        >
          {/* Waistband */}
          <rect x="35" y="38" width="130" height="16" rx="2" stroke="white" strokeWidth="1.5" />
          {/* Fly */}
          <line x1="100" y1="54" x2="100" y2="100" stroke="white" strokeWidth="1" />
          {/* Left leg */}
          <path d="M35 54 L28 175 L72 275 L100 275 L100 155" stroke="white" strokeWidth="1.5" />
          {/* Right leg */}
          <path d="M165 54 L172 175 L128 275 L100 275 L100 155" stroke="white" strokeWidth="1.5" />
          {/* Left cargo pocket */}
          <rect x="30" y="122" width="42" height="52" rx="2" stroke="white" strokeWidth="1" />
          {/* Right cargo pocket */}
          <rect x="128" y="122" width="42" height="52" rx="2" stroke="white" strokeWidth="1" />
        </svg>
      );

    case "KNIT":
      return (
        <svg
          viewBox="0 0 240 290"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "55%", height: "55%", opacity: 0.45 }}
        >
          {/* Round neckline */}
          <path d="M97 46 Q120 62 143 46" stroke="white" strokeWidth="1.5" />
          {/* Full outline */}
          <path
            d="M97 46 L38 100 L48 128 L92 85 L90 256 L150 256 L148 85 L192 128 L202 100 L143 46"
            stroke="white"
            strokeWidth="1.5"
          />
          {/* Knit horizontal texture lines */}
          {[108, 126, 144, 162, 180, 198, 216, 234].map((y, i) => (
            <line key={i} x1="92" y1={y} x2="148" y2={y} stroke="white" strokeWidth="0.5" strokeOpacity="0.22" />
          ))}
          {/* Ribbed hem */}
          {[244, 250, 256].map((y, i) => (
            <line key={i} x1="90" y1={y} x2="150" y2={y} stroke="white" strokeWidth="1" strokeOpacity="0.3" />
          ))}
        </svg>
      );

    case "CAP":
      return (
        <svg
          viewBox="0 0 280 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "60%", height: "auto", opacity: 0.45 }}
        >
          {/* Crown */}
          <path d="M55 148 Q55 58 140 48 Q225 58 225 148" stroke="white" strokeWidth="1.5" />
          {/* Brim */}
          <path d="M55 148 Q35 153 25 160 Q35 170 72 168 Q90 165 100 158 L100 148" stroke="white" strokeWidth="1.5" />
          {/* Bottom edge */}
          <line x1="55" y1="148" x2="225" y2="148" stroke="white" strokeWidth="1.5" />
          {/* Button */}
          <circle cx="140" cy="50" r="5" stroke="white" strokeWidth="1" />
          {/* Panel seams */}
          <path d="M140 50 Q130 98 127 148" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M140 50 Q150 98 153 148" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Sweatband */}
          <path d="M65 146 Q140 138 215 146" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 2" />
        </svg>
      );

    default:
      return null;
  }
}

type Props = { product: Product };

export default function ProductImage({ product }: Props) {
  const [imgIndex, setImgIndex] = useState(0);

  const heightClass =
    product.tileSize === "large"
      ? "h-[500px] md:h-[620px]"
      : product.tileSize === "medium"
      ? "h-[400px] md:h-[500px]"
      : "h-[340px] md:h-[440px]";

  const hasImages = product.images && product.images.length > 0;

  return (
    <div
      className={`relative overflow-hidden ${heightClass}`}
      style={{ backgroundColor: product.shade }}
    >
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {hasImages ? (
        /* Real product photo(s) */
        <>
          <Image
            src={product.images![imgIndex]}
            alt={`${product.name} — ${product.label}`}
            fill
            className="object-cover"
            unoptimized
          />
          {product.images!.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {product.images!.map((_, i) => (
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
      ) : (
        /* SVG clothing silhouette */
        <>
          {/* Ghost tag text behind silhouette */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <span className="text-[18vw] md:text-[10vw] font-black text-white/[0.03] tracking-tighter leading-none">
              {product.tag}
            </span>
          </div>
          {/* Clothing SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ClothingSilhouette tag={product.tag} />
          </div>
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
