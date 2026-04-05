"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const items = [
  {
    id: 1,
    label: "SS25 — 001",
    tag: "HOODIE",
    ja: "フーディー",
    price: "¥18,000",
    size: "large",
    gradient:
      "radial-gradient(ellipse 80% 60% at 50% 40%, #1e1e1e 0%, #0a0a0a 100%)",
  },
  {
    id: 2,
    label: "SS25 — 002",
    tag: "JACKET",
    ja: "ジャケット",
    price: "¥28,000",
    size: "small",
    gradient:
      "linear-gradient(135deg, #1c1c1c 0%, #111111 50%, #0e0e0e 100%)",
  },
  {
    id: 3,
    label: "SS25 — 003",
    tag: "LONG TEE",
    ja: "ロングTシャツ",
    price: "¥12,000",
    size: "medium",
    gradient:
      "linear-gradient(180deg, #141414 0%, #0d0d0d 60%, #111111 100%)",
  },
  {
    id: 4,
    label: "SS25 — 004",
    tag: "CARGO",
    ja: "カーゴパンツ",
    price: "¥22,000",
    size: "medium",
    gradient:
      "linear-gradient(160deg, #161616 0%, #101010 55%, #0c0c0c 100%)",
  },
  {
    id: 5,
    label: "SS25 — 005",
    tag: "PARKA",
    ja: "パーカー",
    price: "¥20,000",
    size: "medium",
    gradient:
      "radial-gradient(ellipse 90% 70% at 50% 30%, #1a1a1a 0%, #0b0b0b 100%)",
  },
  {
    id: 6,
    label: "SS25 — 006",
    tag: "CAP",
    ja: "帽子",
    price: "¥8,000",
    size: "small",
    gradient:
      "linear-gradient(180deg, #181818 0%, #0a0a0a 70%, #060606 100%)",
  },
  {
    id: 7,
    label: "SS25 — 007",
    tag: "SHOES",
    ja: "靴",
    price: "¥32,000",
    size: "medium",
    gradient:
      "linear-gradient(120deg, #121212 0%, #0f0f0f 40%, #181818 70%, #0a0a0a 100%)",
  },
];

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
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative overflow-hidden cursor-pointer ${
                item.size === "large" ? "row-span-2 md:col-span-1" : ""
              }`}
            >
              {/* Card */}
              <div
                className={`${
                  item.size === "large"
                    ? "h-[400px] md:h-[500px]"
                    : item.size === "medium"
                    ? "h-[220px] md:h-[260px]"
                    : "h-[180px] md:h-[220px]"
                } relative flex items-end p-4 md:p-6 transition-all duration-700 group-hover:brightness-125`}
                style={{ background: item.gradient }}
              >
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500"
                />

                {/* Content */}
                <div className="relative z-10 w-full">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block text-white/20 text-[10px] tracking-widest uppercase mb-1 group-hover:text-white/40 transition-colors duration-300">
                        {item.label}
                      </span>
                      <span className="text-white/40 text-[10px] tracking-widest uppercase block mb-1">
                        {item.ja}
                      </span>
                      <span className="text-white text-sm md:text-base font-black tracking-wider">
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-white/30 text-[10px] tracking-widest group-hover:text-white/60 transition-colors duration-300">
                        {item.price}
                      </span>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-white/60 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white/5 group-hover:border-t-white/10 transition-colors duration-300" />
              </div>
            </motion.div>
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
