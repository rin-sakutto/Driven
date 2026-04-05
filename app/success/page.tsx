import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "決済完了 — DRIVEN",
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="border border-white/10 p-12 text-center max-w-md w-full">
        <div className="text-5xl mb-6">▲</div>
        <p className="text-white font-black text-lg tracking-widest uppercase mb-2">
          決済が完了した。
        </p>
        <p className="text-white/40 text-sm tracking-widest leading-relaxed">
          ご購入ありがとうございます。<br />
          確認メールをお送りします。待て。
        </p>
        <Link
          href="/"
          className="inline-block mt-10 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors duration-300 border-b border-white/10 pb-1 hover:border-white/30"
        >
          ← コレクションに戻る
        </Link>
      </div>
    </main>
  );
}
