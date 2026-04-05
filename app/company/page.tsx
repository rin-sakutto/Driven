"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const history = [
  { year: "2019", month: "Mar", event: "DRIVEN Inc. founded in Thousand Oaks, California." },
  { year: "2019", month: "Sep", event: "Brand \"DRIVEN\" launched with its first capsule collection." },
  { year: "2020", month: "Apr", event: "Opened an offline exhibition space in Los Angeles." },
  { year: "2021", month: "Feb", event: "SS21 collection released. First international customers acquired." },
  { year: "2022", month: "Jun", event: "Pop-up store held in New York City." },
  { year: "2023", month: "Jan", event: "First full collection \"SHADOW 23\" presented." },
  { year: "2023", month: "Nov", event: "Flagship studio opened in Thousand Oaks." },
  { year: "2024", month: "Apr", event: "Participated in Berlin Design Week. Full-scale expansion into the European market." },
  { year: "2025", month: "Feb", event: "SS25 collection launched. Wholesale distribution to major select shops begins." },
];

const MAPS_QUERY = "1300-1348+Hendrix+Ave,+Thousand+Oaks,+CA+91360";
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const overview = [
  { label: "Company", value: "DRIVEN Inc." },
  { label: "Founded", value: "March 2019" },
  { label: "CEO", value: "Tino" },
  { label: "Employees", value: "12" },
  { label: "Business", value: "Apparel brand planning, manufacturing & sales" },
  { label: "Address", value: "1300-1348 Hendrix Ave, Thousand Oaks, CA 91360 USA" },
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
              <span className="text-white">COMPANY OVERVIEW</span>
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
              COMPANY HISTORY
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
              LOCATION
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            <FadeSection delay={0.1}>
              <div className="bg-black p-10 md:p-14">
                <p className="text-white/20 text-xs tracking-widest uppercase mb-6">
                  HEAD OFFICE
                </p>
                <address className="not-italic">
                  <p className="text-white/40 text-xs mb-2">CA 91360, USA</p>
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <p className="text-white text-lg font-black tracking-wider leading-relaxed mb-1 group-hover:text-white/70 transition-colors duration-300">
                      1300-1348 Hendrix Ave,
                    </p>
                    <p className="text-white text-lg font-black tracking-wider leading-relaxed mb-6 group-hover:text-white/70 transition-colors duration-300">
                      Thousand Oaks, CA 91360 USA
                    </p>
                  </a>
                  <p className="text-white/30 text-xs tracking-widest uppercase">
                    DRIVEN STUDIO — THOUSAND OAKS
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
                    { line: "By Car", station: "US-101 (Ventura Freeway) — Exit Thousand Oaks Blvd" },
                    { line: "By Bus", station: "Thousand Oaks Transit — Hendrix Ave Stop" },
                    { line: "From LA", station: "Approx. 40 min via US-101 W" },
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

          {/* Google Map embed */}
          <FadeSection delay={0.3}>
            <div className="mt-px bg-white/5">
              <div className="relative w-full h-96 md:h-[480px]">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  className="border-0 [filter:invert(90%)_hue-rotate(180deg)]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="DRIVEN Studio — Thousand Oaks"
                />
              </div>
              <div className="flex justify-end px-6 py-4 bg-black">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 text-[10px] tracking-[0.3em] uppercase hover:text-white/70 transition-colors duration-300"
                >
                  OPEN IN GOOGLE MAPS →
                </a>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
