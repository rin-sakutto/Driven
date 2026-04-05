"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import type { Product } from "../../lib/products";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PurchaseForm({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size: selectedSize }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setErrors({ submit: data.error ?? "決済の開始に失敗しました" });
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setErrors({ submit: "ネットワークエラーが発生しました" });
      setLoading(false);
    }
  };

  return (
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
        <fieldset className="flex flex-col gap-3 border-none p-0 m-0">
          <legend className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-1">
            Size
          </legend>
          <div role="radiogroup" aria-label="サイズを選択" className="flex flex-wrap gap-2">
            {product.availableSizes.map((s) => (
              <motion.button
                key={s}
                type="button"
                role="radio"
                aria-checked={selectedSize === s}
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
            <p role="alert" className="text-red-400/80 text-[10px] tracking-widest">
              {errors.size}
            </p>
          )}
        </fieldset>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="purchase-name"
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
          >
            お名前
          </label>
          <input
            id="purchase-name"
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
            <p role="alert" className="text-red-400/80 text-[10px] tracking-widest">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="purchase-email"
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
          >
            メールアドレス
          </label>
          <input
            id="purchase-email"
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
            <p role="alert" className="text-red-400/80 text-[10px] tracking-widest">
              {errors.email}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="purchase-address"
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
          >
            お届け先住所
          </label>
          <input
            id="purchase-address"
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
            <p role="alert" className="text-red-400/80 text-[10px] tracking-widest">
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
            <span>${product.price.toLocaleString()}</span>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? {} : { scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
          whileTap={loading ? {} : { scale: 0.98 }}
          className="border border-white text-white text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "処理中..." : "購入する"}
        </motion.button>

        {errors.submit && (
          <p role="alert" className="text-red-400/80 text-[10px] tracking-widest text-center">
            {errors.submit}
          </p>
        )}
      </form>
    </div>
  );
}
