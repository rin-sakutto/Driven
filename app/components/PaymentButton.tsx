"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseUnits } from "viem";

// JPYC v2 on Polygon Mainnet
const JPYC_CONTRACT_ADDRESS = "0x6FBc59d90623376593789049e6f99017C8410225" as const;
const RECIPIENT_ADDRESS = "0xB2E7Fe289fa4a470c67F12600D37D684Bd22D765" as const;

// Minimal ABI — only the transfer function
const JPYC_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

interface PaymentButtonProps {
  /** Amount in JPYC (e.g. 5000 for ¥5,000). */
  amountJpyc: number;
}

export default function PaymentButton({ amountJpyc }: PaymentButtonProps) {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);

  const {
    writeContract,
    data: txHash,
    isPending: isSending,
    error: sendError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handlePay = () => {
    reset();
    writeContract({
      address: JPYC_CONTRACT_ADDRESS,
      abi: JPYC_ABI,
      functionName: "transfer",
      args: [RECIPIENT_ADDRESS, parseUnits(String(amountJpyc), 18)],
    });
  };

  if (!open) {
    return (
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02, backgroundColor: "#8b5cf6", color: "#ffffff" }}
        whileTap={{ scale: 0.98 }}
        className="border border-purple-500 text-purple-400 text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full"
      >
        💎 ウォレット送金 (JPYC)
      </motion.button>
    );
  }

  return (
    <div className="border border-purple-500/30 p-6 flex flex-col gap-4">
      <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">— CRYPTO PAYMENT</p>

      {/* RainbowKit connect button */}
      <div className="flex justify-center">
        <ConnectButton chainStatus="icon" showBalance={false} />
      </div>

      {isConnected && (
        <>
          <div className="h-px bg-white/10" />

          <div className="flex justify-between text-xs tracking-widest text-white/40 uppercase">
            <span>Token</span>
            <span>JPYC (Polygon)</span>
          </div>
          <div className="flex justify-between text-xs tracking-widest text-white/40 uppercase">
            <span>Amount</span>
            <span>¥{amountJpyc.toLocaleString()} JPYC</span>
          </div>

          <div className="h-px bg-white/10" />

          {!isSuccess ? (
            <motion.button
              type="button"
              onClick={handlePay}
              disabled={isSending || isConfirming}
              whileHover={isSending || isConfirming ? {} : { scale: 1.02, backgroundColor: "#8b5cf6", color: "#ffffff" }}
              whileTap={isSending || isConfirming ? {} : { scale: 0.98 }}
              className="border border-purple-500 text-purple-400 text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? "署名中..." : isConfirming ? "確認中..." : "JPYC で支払う"}
            </motion.button>
          ) : (
            <div className="flex flex-col gap-2 text-center">
              <p className="text-green-400 text-xs tracking-widest uppercase">✓ 送金完了</p>
              <a
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 text-[10px] tracking-wider break-all hover:text-white/60 transition-colors"
              >
                {txHash}
              </a>
            </div>
          )}

          {sendError && (
            <p role="alert" className="text-red-400/80 text-[10px] tracking-widest text-center">
              {sendError.message.split("\n")[0]}
            </p>
          )}
        </>
      )}

      <button
        type="button"
        onClick={() => { setOpen(false); reset(); }}
        className="text-white/20 hover:text-white/50 text-[10px] tracking-widest uppercase transition-colors self-center"
      >
        キャンセル
      </button>
    </div>
  );
}
