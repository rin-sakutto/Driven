"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { getProduct } from "../../lib/products";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProductPage() {
  const params = useParams();
  const id = Number(params.id);
  const product = getProduct(id);

  const [selectedSize, setSelectedSize] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) {
    notFound();
  }

  const clearError = (field: string) =>
    setErrors((prev) => ({ ...prev, [field]: "" }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!selectedSize) next.size = "サイズを選択してください";
    if (!form.name.trim()) next.name = "お名前を入力してください";
    if (!form.email.trim()) next.email = "メールアドレスを入力してください";
    else if (!EMAIL_REGEX.test(form.email))
      next.email = "正しいメールアドレスを入力してください";
    if (!form.address.trim()) next.address = "お届け先住所を入力してください";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 bg-black/80 backdrop-blur-sm">
        <Link
          href="/"
          className="text-white/40 hover:text-white text-xs tracking-[0.4em] uppercase transition-colors duration-300"
        >
          ← DRIVEN
        </Link>
        <span className="text-white/20 text-[10px] tracking-widest uppercase">
          {product.label}
        </span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — product display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Product image placeholder */}
            <div
              className="relative overflow-hidden"
              style={{ backgroundColor: product.shade }}
            >
              <div
                className={`${
                  product.size === "large"
                    ? "h-[500px] md:h-[620px]"
                    : product.size === "medium"
                    ? "h-[400px] md:h-[500px]"
                    : "h-[340px] md:h-[440px]"
                } relative flex items-end p-8 md:p-10`}
              >
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

                {/* Large background tag */}
                <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                  <span className="text-[22vw] md:text-[12vw] font-black text-white/[0.04] tracking-tighter leading-none">
                    {product.tag}
                  </span>
                </div>

                <div className="relative z-10 w-full">
                  <span className="block text-white/20 text-[10px] tracking-widest uppercase mb-2">
                    {product.label}
                  </span>
                  <span className="text-white text-2xl md:text-3xl font-black tracking-wider">
                    {product.tag}
                  </span>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-white/10" />
              </div>
            </div>

            {/* Product info below image */}
            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="flex items-end justify-between">
                <h1 className="text-xl md:text-2xl font-black tracking-wider text-white">
                  {product.name}
                </h1>
                <span className="text-white text-lg font-black tracking-widest">
                  ¥{product.price.toLocaleString()}
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>

          {/* Right — purchase form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-white/10 p-12 text-center mt-16 md:mt-0"
              >
                <div className="text-5xl mb-6">▲</div>
                <p className="text-white font-black text-lg tracking-widest uppercase mb-2">
                  注文を受け付けた。
                </p>
                <p className="text-white/40 text-sm tracking-widest leading-relaxed">
                  確認メールを送信する。<br />
                  待て。
                </p>
                <Link
                  href="/"
                  className="inline-block mt-10 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors duration-300 border-b border-white/10 pb-1 hover:border-white/30"
                >
                  ← コレクションに戻る
                </Link>
              </motion.div>
            ) : (
              <div>
                <p className="text-white/20 text-xs tracking-[0.5em] uppercase mb-4">
                  — PURCHASE
                </p>
                <div className="overflow-hidden mb-10">
                  <motion.h2
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none"
                  >
                    手に入れろ。
                  </motion.h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Size selector */}
                  <div className="flex flex-col gap-3">
                    <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((s) => (
                        <motion.button
                          key={s}
                          type="button"
                          onClick={() => {
                            setSelectedSize(s);
                            clearError("size");
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className={`px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                            selectedSize === s
                              ? "border-white bg-white text-black"
                              : "border-white/20 text-white/50 hover:border-white/50 hover:text-white/80"
                          }`}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                    {errors.size && (
                      <p className="text-red-400/80 text-[10px] tracking-widest">
                        {errors.size}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                      お名前
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        clearError("name");
                      }}
                      className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="山田 太郎"
                    />
                    {errors.name && (
                      <p className="text-red-400/80 text-[10px] tracking-widest">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        clearError("email");
                      }}
                      className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400/80 text-[10px] tracking-widest">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
                      お届け先住所
                    </label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => {
                        setForm({ ...form, address: e.target.value });
                        clearError("address");
                      }}
                      className="bg-transparent border-b border-white/20 focus:border-white/60 pb-3 text-white text-sm outline-none transition-colors duration-300 placeholder:text-white/20"
                      placeholder="東京都渋谷区..."
                    />
                    {errors.address && (
                      <p className="text-red-400/80 text-[10px] tracking-widest">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Order summary */}
                  <div className="border border-white/10 p-6 flex flex-col gap-3">
                    <div className="flex justify-between text-xs tracking-widest text-white/40 uppercase">
                      <span>Item</span>
                      <span>{product.name}</span>
                    </div>
                    {selectedSize && (
                      <div className="flex justify-between text-xs tracking-widest text-white/40 uppercase">
                        <span>Size</span>
                        <span>{selectedSize}</span>
                      </div>
                    )}
                    <div className="h-px bg-white/10 my-1" />
                    <div className="flex justify-between text-sm tracking-widest text-white font-black uppercase">
                      <span>Total</span>
                      <span>¥{product.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-white text-white text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full"
                  >
                    購入する
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
