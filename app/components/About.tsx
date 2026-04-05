"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    number: "01",
    title: "UNKNOWN",
    desc: "何者かは問わない。どこから来たかも問わない。ただ、動いているかだけが問われる。",
  },
  {
    number: "02",
    title: "DRIVEN",
    desc: "衝動に従え。理由はいらない。突き動かされるものがあれば、それがすべてだ。",
  },
  {
    number: "03",
    title: "COLLECTIVE",
    desc: "個であり、群れだ。名前はなくとも存在する。見えなくとも、そこにいる。",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative bg-black py-32 md:py-48 overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/4 w-px h-2/3 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute left-0 top-1/2 w-1/3 h-px bg-gradient-to-r from-transparent to-white/5" />

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/20 text-xs tracking-[0.5em] uppercase mb-4"
        >
          — WHO WE ARE
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none"
          >
            <span className="text-white">謎の集団。</span>
            <br />
            <span className="text-white/30">それだけでいい。</span>
          </motion.h2>
        </div>

        {/* Large quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mb-24 md:mb-32"
        >
          <p className="text-white/50 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
            私たちは語らない。ただ纏う。<br />
            <span className="text-white/80">Driven</span>は定義を拒否するブランドだ。
            見た者だけが理解できる、それで十分だ。
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {values.map((v, i) => (
            <motion.div
              key={v.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="group bg-black p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500 cursor-default"
            >
              <span className="text-white/10 text-6xl font-black block mb-6 group-hover:text-white/20 transition-colors duration-500">
                {v.number}
              </span>
              <h3 className="text-white text-lg font-black tracking-widest mb-4">{v.title}</h3>
              <p className="text-white/40 text-sm leading-loose group-hover:text-white/60 transition-colors duration-500">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
