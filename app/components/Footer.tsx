"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-white/20 text-xs tracking-widest uppercase font-black">
            DRIVEN © 2025
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/10 text-[10px] tracking-widest uppercase"
        >
          We are everywhere. We are nowhere.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex gap-6"
        >
          {["IG", "X", "Mail"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-white/20 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors duration-300"
            >
              {s}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
