"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products, type Product } from "../lib/products";

type CardProps = { item: Product; index: number; isInView: boolean };

function GalleryCard({ item, index, isInView }: CardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const images = item.images ?? [];

  function prevImg(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation();
    e.preventDefault();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  }

  function nextImg(e: React.MouseEvent | React.TouchEvent) {
    e.stopPropagation();
    e.preventDefault();
    setImgIndex((i) => (i + 1) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? nextImg(e) : prevImg(e);
    }
    touchStartX.current = null;
  }

  const src = images[imgIndex] ?? "";
  const isExternal = src.startsWith("http");

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`group relative overflow-hidden cursor-pointer ${
        item.tileSize === "large" ? "row-span-2 md:col-span-1" : ""
      }`}
    >
      <Link href={`/items/${item.id}`} className="block h-full">
        {/* Card */}
        <div
          className={`${
            item.tileSize === "large"
              ? "h-[400px] md:h-[500px]"
              : item.tileSize === "medium"
              ? "h-[220px] md:h-[260px]"
              : "h-[180px] md:h-[220px]"
          } relative flex items-end p-4 md:p-6 transition-all duration-700 group-hover:brightness-125 select-none`}
          style={{ backgroundColor: item.shade }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

          {/* Product images */}
          {images.length > 0 && (
            <>
              {isExternal ? (
                <Image
                  key={src}
                  src={src}
                  alt={`${item.tag} — ${item.label}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  unoptimized
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt={`${item.tag} — ${item.label}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
              {images.length > 1 && (
                <>
                  {/* Prev / Next arrows (visible on hover) */}
                  <button
                    onClick={prevImg}
                    aria-label="前の画像"
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImg}
                    aria-label="次の画像"
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    ›
                  </button>
                  {/* Dot navigation */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setImgIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          imgIndex === idx ? "bg-white" : "bg-white/30"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Hover overlay */}
          <motion.div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />

          {/* Content */}
          <div className="relative z-10 w-full">
            <div className="flex items-end justify-between">
              <div>
                <span className="block text-white/20 text-[10px] tracking-widest uppercase mb-1 group-hover:text-white/40 transition-colors duration-300">
                  {item.label}
                </span>
                <span className="text-white text-sm md:text-base font-black tracking-wider">
                  {item.tag}
                </span>
                <span className="block text-white/70 text-xs tracking-widest mt-1">
                  ${item.price.toLocaleString()}
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="text-white/60 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                →
              </motion.div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white/5 group-hover:border-t-white/10 transition-colors duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="relative bg-black py-32 md:py-48 overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-white/20 text-xs tracking-[0.5em] uppercase mb-4"
            >
              — COLLECTION
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-black tracking-tighter text-white"
              >
                SS25
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/30 text-xs tracking-widest uppercase hidden sm:block"
          >
            Spring / Summer 2025
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {products.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} isInView={isInView} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#contact"
            whileHover={{ letterSpacing: "0.4em" }}
            transition={{ duration: 0.3 }}
            className="text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors duration-300 border-b border-white/10 pb-1 hover:border-white/30"
          >
            VIEW ALL PIECES
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
