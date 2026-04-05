"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const history = [
  { year: "2019", month: "3月", event: "東京都渋谷区にて株式会社ドリブンを設立。" },
  { year: "2019", month: "9月", event: "ブランド「DRIVEN」を立ち上げ、初のカプセルコレクションを発表。" },
  { year: "2020", month: "4月", event: "東京・原宿にオフライン展示スペースを開設。" },
  { year: "2021", month: "2月", event: "SS21コレクションを発表。初の海外顧客獲得。" },
  { year: "2022", month: "6月", event: "ロサンゼルスにてポップアップストアを開催。" },
  { year: "2023", month: "1月", event: "ブランド初のフルコレクション「SHADOW 23」を発表。" },
  { year: "2023", month: "11月", event: "東京・渋谷にフラッグシップスタジオを開設。" },
  { year: "2024", month: "4月", event: "ベルリン・デザインウィークに参加。欧州市場への本格展開を開始。" },
  { year: "2025", month: "2月", event: "SS25コレクションを発表。国内外の主要セレクトショップへの卸を開始。" },
];

const overview = [
  { label: "社名", value: "株式会社ドリブン（DRIVEN Inc.）" },
  { label: "設立", value: "2019年3月" },
  { label: "代表取締役", value: "黒木 凌" },
  { label: "従業員数", value: "12名" },
  { label: "事業内容", value: "アパレルブランドの企画・製造・販売" },
  { label: "所在地", value: "〒150-0001 東京都渋谷区神宮前4-12-7 DRIVENスタジオ 3F" },
];

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CompanyPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/20 text-xs tracking-[0.5em] uppercase mb-6"
          >
            — COMPANY
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
            >
              <span className="text-white">会社概要</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
          />
        </div>
      </section>

      {/* Overview table */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection>
            <p className="text-white/20 text-xs tracking-[0.5em] uppercase mb-10">
              — OVERVIEW
            </p>
          </FadeSection>
          <div className="border-t border-white/10">
            {overview.map((item, i) => (
              <FadeSection key={item.label} delay={i * 0.05}>
                <div className="flex flex-col md:flex-row border-b border-white/10 py-6 gap-2 md:gap-0">
                  <span className="md:w-48 text-white/30 text-xs tracking-widest uppercase shrink-0">
                    {item.label}
                  </span>
                  <span className="text-white/80 text-sm leading-relaxed">
                    {item.value}
                  </span>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Company history */}
      <section className="pb-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection>
            <p className="text-white/20 text-xs tracking-[0.5em] uppercase mb-10">
              — HISTORY
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-16">
              会社沿革
            </h2>
          </FadeSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-24 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

            <div className="flex flex-col gap-0">
              {history.map((item, i) => (
                <FadeSection key={i} delay={i * 0.07}>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-0 border-b border-white/5 py-8 group">
                    {/* Year + Month */}
                    <div className="md:w-24 shrink-0 flex md:flex-col gap-2 md:gap-0">
                      <span className="text-white font-black text-sm tracking-widest">
                        {item.year}
                      </span>
                      <span className="text-white/30 text-xs tracking-widest">
                        {item.month}
                      </span>
                    </div>
                    {/* Dot (desktop) */}
                    <div className="hidden md:flex items-start pt-1.5 px-6">
                      <span className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/70 transition-colors duration-300 shrink-0 mt-0.5" />
                    </div>
                    {/* Event */}
                    <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300 flex-1">
                      {item.event}
                    </p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="pb-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeSection>
            <p className="text-white/20 text-xs tracking-[0.5em] uppercase mb-10">
              — LOCATION
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-16">
              所在地
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            <FadeSection delay={0.1}>
              <div className="bg-black p-10 md:p-14">
                <p className="text-white/20 text-xs tracking-widest uppercase mb-6">
                  HEAD OFFICE
                </p>
                <address className="not-italic">
                  <p className="text-white/40 text-xs mb-2">〒150-0001</p>
                  <p className="text-white text-lg font-black tracking-wider leading-relaxed mb-1">
                    東京都渋谷区神宮前
                  </p>
                  <p className="text-white text-lg font-black tracking-wider leading-relaxed mb-6">
                    4-12-7 DRIVENスタジオ 3F
                  </p>
                  <p className="text-white/30 text-xs tracking-widest uppercase">
                    4-12-7 Jingumae, Shibuya-ku, Tokyo
                  </p>
                </address>
              </div>
            </FadeSection>

            <FadeSection delay={0.2}>
              <div className="bg-black p-10 md:p-14">
                <p className="text-white/20 text-xs tracking-widest uppercase mb-6">
                  ACCESS
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    { line: "東京メトロ千代田線", station: "明治神宮前〈原宿〉駅 徒歩5分" },
                    { line: "JR山手線", station: "原宿駅 徒歩8分" },
                    { line: "東京メトロ副都心線", station: "北参道駅 徒歩7分" },
                  ].map((access) => (
                    <li key={access.line} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <p className="text-white/30 text-[10px] tracking-widest uppercase mb-1">
                        {access.line}
                      </p>
                      <p className="text-white/70 text-sm">{access.station}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
