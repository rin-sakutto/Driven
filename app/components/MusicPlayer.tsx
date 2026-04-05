"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Track } from "../lib/tracks";

/* ─── アイコンSVG ─── */
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
  </svg>
);
const PrevIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
);
const NextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 18h2V6h-2zM6 18l8.5-6L6 6z" />
  </svg>
);
const VolumeIcon = ({ muted }: { muted: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    {muted ? (
      <path d="M16.5 12A4.5 4.5 0 0 0 14 8.18v1.7l2.4 2.4c.1-.41.1-.84.1-1.28zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
    ) : (
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.18v7.64c1.48-.69 2.5-2.16 2.5-3.82zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    )}
  </svg>
);

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface Props {
  tracks: Track[];
}

export default function MusicPlayer({ tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const track = tracks[currentIndex];

  /* ── 再生制御 ── */
  const play = useCallback(() => {
    audioRef.current?.play();
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    playing ? pause() : play();
  }, [playing, play, pause]);

  const playTrack = useCallback(
    (idx: number) => {
      setCurrentIndex(idx);
      setLoaded(false);
      // 新しいsrcが読み込まれたら自動再生 (onCanPlayで)
      setTimeout(() => {
        audioRef.current?.play();
        setPlaying(true);
      }, 100);
    },
    [],
  );

  const prev = useCallback(() => {
    playTrack((currentIndex - 1 + tracks.length) % tracks.length);
  }, [currentIndex, tracks.length, playTrack]);

  const next = useCallback(() => {
    playTrack((currentIndex + 1) % tracks.length);
  }, [currentIndex, tracks.length, playTrack]);

  /* ── 音量 ── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  /* ── シーク ── */
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  /* ── イベント ── */
  const onTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime ?? 0);
  const onLoadedMetadata = () => {
    setDuration(audioRef.current?.duration ?? 0);
    setLoaded(true);
  };
  const onEnded = () => next();

  if (tracks.length === 0) {
    return (
      <div className="text-center py-20 text-white/30 text-sm tracking-widest uppercase">
        Coming Soon...
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── 現在のトラック表示 + コントローラ ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={track?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 mb-8"
        >
          {/* 波形風のビジュアライザー (装飾) */}
          <div className="flex items-end justify-center gap-[3px] h-12 mb-6">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-white/30 origin-bottom"
                animate={
                  playing
                    ? {
                        scaleY: [0.2, 0.5 + Math.random() * 0.5, 0.2],
                        opacity: [0.3, 0.7, 0.3],
                      }
                    : { scaleY: 0.15, opacity: 0.15 }
                }
                transition={
                  playing
                    ? {
                        duration: 0.4 + Math.random() * 0.4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: i * 0.02,
                      }
                    : { duration: 0.5 }
                }
                style={{ height: "100%" }}
              />
            ))}
          </div>

          {/* トラック情報 */}
          <div className="text-center mb-6">
            <h3 className="text-white text-lg md:text-xl font-bold tracking-wide mb-1">
              {track?.title ?? "—"}
            </h3>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              {track?.artist ?? "—"}
            </p>
          </div>

          {/* シークバー */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={seek}
              className="w-full h-[2px] appearance-none bg-white/10 outline-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: duration
                  ? `linear-gradient(to right, rgba(255,255,255,0.5) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.1) ${(currentTime / duration) * 100}%)`
                  : undefined,
              }}
            />
            <div className="flex justify-between text-white/30 text-[10px] tracking-widest mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{loaded ? formatTime(duration) : track?.duration ?? "—"}</span>
            </div>
          </div>

          {/* コントロールボタン */}
          <div className="flex items-center justify-center gap-6">
            <button onClick={prev} className="text-white/50 hover:text-white transition-colors cursor-pointer">
              <PrevIcon />
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-14 h-14 flex items-center justify-center border border-white/30 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </motion.button>
            <button onClick={next} className="text-white/50 hover:text-white transition-colors cursor-pointer">
              <NextIcon />
            </button>
          </div>

          {/* 音量 */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button onClick={() => setMuted((m) => !m)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
              <VolumeIcon muted={muted} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (muted) setMuted(false);
              }}
              className="w-24 h-[2px] appearance-none bg-white/10 outline-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white/60 [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white/60 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── トラックリスト ── */}
      {tracks.length > 1 && (
        <div className="border border-white/10 divide-y divide-white/5">
          {tracks.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => playTrack(i)}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors cursor-pointer ${
                i === currentIndex ? "bg-white/[0.04]" : ""
              }`}
            >
              <span
                className={`text-xs font-mono w-6 text-right ${
                  i === currentIndex ? "text-white" : "text-white/20"
                }`}
              >
                {i === currentIndex && playing ? "▶" : String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm tracking-wide truncate ${
                    i === currentIndex ? "text-white" : "text-white/60"
                  }`}
                >
                  {t.title}
                </p>
                <p className="text-white/25 text-xs tracking-wider truncate">{t.artist}</p>
              </div>
              {t.duration && (
                <span className="text-white/20 text-xs tracking-widest">{t.duration}</span>
              )}
            </motion.button>
          ))}
        </div>
      )}

      {/* ── audio要素 (非表示) ── */}
      <audio
        ref={audioRef}
        src={track?.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        preload="metadata"
      />
    </div>
  );
}
