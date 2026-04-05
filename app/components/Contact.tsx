"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "送信に失敗しました");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-black py-32 md:py-48 overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Background large text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter leading-none whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left side */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-white/20 text-xs tracking-[0.5em] uppercase mb-4"
            >
              — GET IN TOUCH
            </motion.p>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-none"
              >
                話しかけるな。<br />
                <span className="text-white/30">でも連絡しろ。</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/40 text-sm leading-loose mb-12"
            >
              問い合わせは歓迎する。ただし、覚悟して送れ。<br />
              我々は選ぶ側だ。
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              {["INSTAGRAM", "X (TWITTER)", "EMAIL"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ x: 8, color: "rgba(255,255,255,0.9)" }}
                  className="text-white/30 text-xs tracking-widest uppercase flex items-center gap-4 transition-all duration-300 group"
                >
                  <span className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white/60 transition-all duration-300" />
                  {social}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right side — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-white/10 p-12 text-center"
              >
                <div className="text-5xl mb-6">▲</div>
                <p className="text-white font-black text-lg tracking-widest uppercase mb-2">
                  受信した。
                </p>
                <p className="text-white/40 text-sm tracking-widest">
                  返信するかどうかは、我々が決める。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none resize-none transition-colors duration-300 placeholder:text-white/20"
                    placeholder="Say something..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={sending ? {} : { scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
                  whileTap={sending ? {} : { scale: 0.98 }}
                  className="mt-4 border border-white text-white text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full md:w-auto self-start disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? "SENDING..." : "SEND MESSAGE"}
                </motion.button>

                {error && (
                  <p className="text-red-400 text-xs tracking-wider mt-2">{error}</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
