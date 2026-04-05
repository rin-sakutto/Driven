"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseUnits } from "viem";

// JPYC v2 on Polygon Mainnet
const JPYC_CONTRACT_ADDRESS = "0x6FbC59D90623376593789049E6F99017c8410225" as const;
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
  /** Amount in JPYC (integer, 1 JPYC = ¥1). */
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
        whileHover={{ scale: 1.02, backgroundColor: "#7c3aed", color: "#ffffff" }}
        whileTap={{ scale: 0.98 }}
        className="border border-purple-600/60 text-purple-300 text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full"
      >
        ウォレット送金 (JPYC)
      </motion.button>
    );
  }

  return (
    <div className="border border-purple-600/30 bg-purple-950/20 p-6 flex flex-col gap-4">
      <p className="text-purple-300/50 text-[10px] tracking-[0.4em] uppercase">— CRYPTO PAYMENT · JPYC (Polygon)</p>

      {/* RainbowKit connect button */}
      <div className="flex justify-center">
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            if (!connected) {
              return (
                <button
                  type="button"
                  onClick={openConnectModal}
                  className="border border-purple-600/60 text-purple-300 text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300 hover:bg-purple-900/40 w-full"
                >
                  ウォレットを接続
                </button>
              );
            }

            return (
              <div className="flex items-center gap-2 w-full">
                {/* Chain selector — Polygon icon */}
                <button
                  type="button"
                  onClick={openChainModal}
                  title={chain.name}
                  className="flex items-center gap-1.5 border border-white/10 px-3 py-2 text-[10px] tracking-widest text-white/50 uppercase hover:border-white/30 transition-colors shrink-0"
                >
                  {chain.iconUrl ? (
                    <img src={chain.iconUrl} alt={chain.name} width={16} height={16} className="rounded-full" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-purple-600 inline-block" />
                  )}
                  <span>{chain.name}</span>
                </button>

                {/* Account button — less truncated address */}
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="flex-1 border border-white/10 px-3 py-2 text-[10px] tracking-wider text-white/50 hover:border-white/30 hover:text-white/70 transition-colors text-left font-mono overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {account.address.slice(0, 10)}…{account.address.slice(-8)}
                </button>
              </div>
            );
          }}
        </ConnectButton.Custom>
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
              whileHover={isSending || isConfirming ? {} : { scale: 1.02, backgroundColor: "#7c3aed", color: "#ffffff" }}
              whileTap={isSending || isConfirming ? {} : { scale: 0.98 }}
              className="border border-purple-600/60 text-purple-300 text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? "署名中..." : isConfirming ? "確認中..." : "JPYC で支払う"}
            </motion.button>
          ) : (
            <div className="flex flex-col gap-2 text-center">
              <p className="text-green-400 text-xs tracking-widest uppercase">送金完了</p>
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
