"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Deterministic star positions to avoid hydration mismatch
const STARS = Array.from({ length: 55 }, (_, i) => ({
  top: ((i * 37 + 11) % 47) + 2,
  left: ((i * 79 + 23) % 96) + 2,
  size: ((i * 13 + 5) % 3) * 0.45 + 0.65,
  opacity: ((i * 17 + 3) % 5) * 0.08 + 0.08,
  pulseDuration: ((i * 7 + 1) % 5) * 0.6 + 2.2,
  pulseDelay: ((i * 11 + 3) % 8) * 0.4,
}));

export default function Landscape() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-black"
      style={{ height: "75vh" }}
    >
      {/* Parallax background container */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-[1.18]"
        aria-hidden="true"
      >
        {/* Night sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #000000 0%, #01010a 12%, #03031a 28%, #050720 42%, #060820 55%, #030410 72%, #000000 100%)",
          }}
        />

        {/* Atmospheric horizon glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 28% at 50% 68%, rgba(25,25,55,0.65) 0%, transparent 100%)",
          }}
        />

        {/* Secondary glow — subtle warmth from streetlights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 15% at 30% 72%, rgba(40,25,10,0.35) 0%, transparent 100%)",
          }}
        />

        {/* Stars */}
        {STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
            }}
            animate={{ opacity: [s.opacity, s.opacity * 2.8, s.opacity] }}
            transition={{
              duration: s.pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.pulseDelay,
            }}
          />
        ))}

        {/* City silhouette — back layer (slight blue-grey, depth) */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 280"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,280 L0,210 L30,210 L30,175 L45,175 L45,155 L55,155 L55,135 L65,135 L65,155 L75,155 L75,175 L100,175 L100,205 L130,205 L130,175 L148,175 L148,148 L158,148 L158,125 L165,125 L165,105 L172,105 L172,125 L180,125 L180,148 L192,148 L192,175 L220,175 L220,200 L255,200 L255,172 L270,172 L270,148 L278,148 L278,122 L285,122 L285,100 L292,100 L292,122 L300,122 L300,148 L312,148 L312,172 L340,172 L340,195 L370,195 L370,170 L385,170 L385,145 L395,145 L395,120 L402,120 L402,98 L410,98 L410,120 L418,120 L418,145 L430,145 L430,170 L460,170 L460,192 L495,192 L495,165 L510,165 L510,140 L520,140 L520,118 L528,118 L528,96 L536,96 L536,118 L544,118 L544,140 L558,140 L558,165 L588,165 L588,188 L620,188 L620,162 L635,162 L635,138 L644,138 L644,115 L652,115 L652,94 L660,94 L660,115 L668,115 L668,138 L680,138 L680,162 L710,162 L710,185 L745,185 L745,158 L760,158 L760,134 L769,134 L769,112 L777,112 L777,90 L785,90 L785,112 L793,112 L793,134 L808,134 L808,158 L840,158 L840,182 L875,182 L875,155 L890,155 L890,130 L900,130 L900,108 L908,108 L908,88 L916,88 L916,108 L924,108 L924,130 L938,130 L938,155 L968,155 L968,180 L1005,180 L1005,152 L1020,152 L1020,128 L1030,128 L1030,105 L1038,105 L1038,84 L1046,84 L1046,105 L1054,105 L1054,128 L1068,128 L1068,152 L1100,152 L1100,176 L1135,176 L1135,150 L1150,150 L1150,126 L1160,126 L1160,103 L1168,103 L1168,82 L1176,82 L1176,103 L1184,103 L1184,126 L1198,126 L1198,150 L1228,150 L1228,174 L1262,174 L1262,148 L1278,148 L1278,125 L1288,125 L1288,103 L1296,103 L1296,125 L1308,125 L1308,148 L1340,148 L1340,170 L1375,170 L1375,195 L1440,195 L1440,280 Z"
            fill="rgba(8,8,22,0.75)"
          />
          {/* Front layer — solid black skyline */}
          <path
            d="M0,280 L0,232 L38,232 L38,205 L52,205 L52,188 L60,188 L60,170 L66,170 L66,152 L72,152 L72,170 L78,170 L78,188 L92,188 L92,210 L125,210 L125,228 L158,228 L158,205 L172,205 L172,182 L180,182 L180,160 L186,160 L186,140 L192,140 L192,160 L198,160 L198,182 L212,182 L212,205 L245,205 L245,225 L278,225 L278,200 L293,200 L293,178 L302,178 L302,156 L308,156 L308,136 L314,136 L314,156 L320,156 L320,178 L335,178 L335,200 L368,200 L368,222 L402,222 L402,197 L418,197 L418,173 L428,173 L428,152 L434,152 L434,130 L440,130 L440,152 L446,152 L446,173 L460,173 L460,197 L495,197 L495,218 L530,218 L530,194 L546,194 L546,170 L556,170 L556,148 L562,148 L562,128 L568,128 L568,148 L574,148 L574,170 L590,170 L590,194 L625,194 L625,216 L660,216 L660,192 L676,192 L676,168 L686,168 L686,146 L692,146 L692,125 L698,125 L698,146 L704,146 L704,168 L720,168 L720,192 L756,192 L756,214 L792,214 L792,188 L808,188 L808,165 L818,165 L818,142 L824,142 L824,122 L830,122 L830,142 L836,142 L836,165 L852,165 L852,188 L888,188 L888,212 L925,212 L925,186 L942,186 L942,162 L952,162 L952,140 L958,140 L958,118 L964,118 L964,140 L970,140 L970,162 L986,162 L986,186 L1024,186 L1024,210 L1062,210 L1062,182 L1078,182 L1078,158 L1088,158 L1088,136 L1094,136 L1094,115 L1100,115 L1100,136 L1106,136 L1106,158 L1122,158 L1122,182 L1160,182 L1160,206 L1198,206 L1198,180 L1215,180 L1215,156 L1225,156 L1225,134 L1231,134 L1231,112 L1237,112 L1237,134 L1243,134 L1243,156 L1259,156 L1259,180 L1298,180 L1298,204 L1336,204 L1336,222 L1380,222 L1380,238 L1440,238 L1440,280 Z"
            fill="rgba(0,0,0,1)"
          />
          {/* Window lights — subtle warm glows in back-layer buildings */}
          <g fill="rgba(255,240,180,0.12)">
            <rect x="164" y="107" width="3" height="3" />
            <rect x="174" y="107" width="3" height="3" />
            <rect x="164" y="117" width="3" height="3" />
            <rect x="289" y="102" width="3" height="3" />
            <rect x="299" y="102" width="3" height="3" />
            <rect x="289" y="112" width="3" height="3" />
            <rect x="530" y="98" width="3" height="3" />
            <rect x="540" y="98" width="3" height="3" />
            <rect x="530" y="108" width="3" height="3" />
            <rect x="648" y="96" width="3" height="3" />
            <rect x="658" y="96" width="3" height="3" />
            <rect x="781" y="92" width="3" height="3" />
            <rect x="791" y="92" width="3" height="3" />
            <rect x="781" y="102" width="3" height="3" />
            <rect x="912" y="90" width="3" height="3" />
            <rect x="922" y="90" width="3" height="3" />
            <rect x="1042" y="86" width="3" height="3" />
            <rect x="1052" y="86" width="3" height="3" />
            <rect x="1042" y="96" width="3" height="3" />
            <rect x="1172" y="84" width="3" height="3" />
            <rect x="1182" y="84" width="3" height="3" />
            <rect x="1172" y="94" width="3" height="3" />
            <rect x="1300" y="105" width="3" height="3" />
            <rect x="1310" y="105" width="3" height="3" />
          </g>
        </svg>

        {/* Ground-level warm glow (streetlights) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background:
              "linear-gradient(to top, rgba(18,12,4,0.6) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Top fade to black */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10" />
      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Horizontal accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

      {/* Text overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/20 text-[10px] tracking-[0.5em] uppercase mb-5"
        >
          — WORLD
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white"
          >
            闇の中を動く。
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.75 }}
          className="text-white/30 text-xs tracking-[0.45em] uppercase mb-8"
        >
          Moving through the dark.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>
    </section>
  );
}
