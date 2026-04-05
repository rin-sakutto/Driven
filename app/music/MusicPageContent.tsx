"use client";

import { motion } from "framer-motion";
import MusicPlayer from "../components/MusicPlayer";
import { tracks } from "../lib/tracks";

export default function MusicPageContent() {
  return (
    <section className="relative pt-32 pb-24 px-6 md:px-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/20 text-xs uppercase mb-4 tracking-[0.6em]"
          >
            SOUNDS FROM THE VOID
          </motion.p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
            MUSIC
          </h1>
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* プレイヤー */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MusicPlayer tracks={tracks} />
        </motion.div>

        {/* コンセプト */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 border-t border-white/10 pt-10"
        >
          <p className="text-white/20 text-xs uppercase tracking-[0.4em] mb-4 text-center">
            CONCEPT
          </p>
          <p className="text-white/50 text-sm md:text-base leading-relaxed tracking-wide text-center">
            The concept of &apos;Driven&apos; explores urban solitude and the hidden conflicts within.
            By cooling down the heat of Latin rhythms into a dark, slow tempo, it captures a &apos;quiet impulse.&apos;
            It&apos;s an introspective piece, like facing your inner self during a late-night drive.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
