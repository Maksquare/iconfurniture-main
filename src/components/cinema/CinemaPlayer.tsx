'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Sun,
  Moon,
  Tv,
  Phone,
  ArrowRight,
  Share2,
  Check,
} from 'lucide-react';
import { OFFICIAL_CONTACTS } from '@/components/common/ProductContactChannels';

export interface CinemaFilm {
  id: string;
  title: string;
  subtitle: string;
  category: 'Atelier Craft' | 'Raw Material' | 'Living Vignettes' | 'Upholstery' | 'Showroom Tour';
  src: string;
  duration: string;
  resolution: string;
  description: string;
  featuredProducts?: { name: string; slug: string }[];
}

interface CinemaPlayerProps {
  film: CinemaFilm;
  onNextFilm?: () => void;
  onPrevFilm?: () => void;
  autoPlay?: boolean;
}

export default function CinemaPlayer({ film, onNextFilm, onPrevFilm, autoPlay = true }: CinemaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Handle Volume Change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Picture in Picture
  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.warn('PiP error', e);
    }
  };

  // Speed options
  const cyclePlaybackRate = () => {
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  // Progress Bar Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(pos * 100);
    setHoverTime(pos * duration);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, duration, isMuted]);

  // Hide Controls on Inactivity
  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 2800);
  };

  // Auto-play when film changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (autoPlay) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [film, autoPlay]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className={`space-y-6 ${isTheaterMode ? 'relative z-50' : ''}`}>
      {/* Dimmed Theater Backdrop */}
      {isTheaterMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsTheaterMode(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
        />
      )}

      {/* ─── 1. Main Cinema Stage Container ───────────────────────── */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setControlsVisible(false)}
        className={`relative rounded-3xl overflow-hidden bg-stone-950 border border-white/10 shadow-2xl group select-none ${
          isTheaterMode ? 'relative z-50 ring-2 ring-[#859F3C]/50 shadow-[0_0_80px_rgba(133,159,60,0.25)]' : ''
        }`}
      >
        {/* Ambient Cinema Halo Glow behind video */}
        <div className="absolute inset-0 bg-radial from-[#859F3C]/20 via-transparent to-transparent opacity-60 pointer-events-none -z-10" />

        {/* The HTML5 Video Element */}
        <video
          ref={videoRef}
          src={film.src}
          playsInline
          loop
          onClick={togglePlay}
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          onEnded={() => {
            setIsPlaying(false);
            if (onNextFilm) onNextFilm();
          }}
          className="w-full aspect-16/9 object-cover cursor-pointer"
        />

        {/* Center Big Play Flash */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs cursor-pointer z-20"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-[#859F3C] transition-all duration-300 group/btn">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1 text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Overlay */}
        <AnimatePresence>
          {controlsVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between z-30 pointer-events-auto"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#859F3C] animate-pulse shadow-[0_0_8px_#859F3C]" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#859F3C] font-mono font-bold">
                    {film.category} • {film.resolution}
                  </div>
                  <h2 className="font-serif text-sm sm:text-lg text-white font-medium drop-shadow-md">
                    {film.title}
                  </h2>
                </div>
              </div>

              {/* Theater Dim & Share Action */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className={`p-2 rounded-full backdrop-blur-md text-xs transition-all cursor-pointer border ${
                    isTheaterMode
                      ? 'bg-[#859F3C] text-white border-[#859F3C]'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                  title={isTheaterMode ? 'Exit Theater Mode' : 'Theater Mode (Dim Lights)'}
                >
                  {isTheaterMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 text-xs transition-all cursor-pointer"
                  title="Share Film Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#859F3C]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Custom Luxury Control Bar */}
        <AnimatePresence>
          {controlsVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-30 pointer-events-auto space-y-3"
            >
              {/* Scrubber Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                onMouseMove={handleProgressMouseMove}
                onMouseLeave={() => setHoverTime(null)}
                className="relative h-2 hover:h-3 w-full bg-white/20 rounded-full cursor-pointer transition-all duration-200 group/bar flex items-center"
              >
                {/* Buffered/Fill bar */}
                <div
                  className="h-full bg-gradient-to-r from-[#859F3C] to-[#a8c950] rounded-full relative"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                >
                  {/* Glowing Thumb Handle */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#859F3C] scale-0 group-hover/bar:scale-100 transition-transform" />
                </div>

                {/* Hover Time Tooltip */}
                {hoverTime !== null && (
                  <div
                    className="absolute -top-7 px-2 py-0.5 rounded-md bg-black/90 text-white font-mono text-[10px] -translate-x-1/2 pointer-events-none border border-white/15"
                    style={{ left: `${hoverPosition}%` }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}
              </div>

              {/* Controls Strip */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                {/* Left Controls: Play/Pause, Replay, Time, Volume */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  {/* Restart 5s */}
                  <button
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                    title="Restart Film"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2 group/vol">
                    <button
                      onClick={toggleMute}
                      className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-16 sm:w-20 accent-[#859F3C] h-1 bg-white/20 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Time Counter */}
                  <div className="font-mono text-[11px] text-stone-300">
                    <span className="text-white font-semibold">{formatTime(currentTime)}</span>
                    <span className="text-stone-500"> / </span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Right Controls: Speed, PiP, Fullscreen */}
                <div className="flex items-center gap-3">
                  {/* Playback Rate */}
                  <button
                    onClick={cyclePlaybackRate}
                    className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] font-bold transition-colors cursor-pointer"
                    title="Change Playback Speed"
                  >
                    {playbackRate}x
                  </button>

                  {/* PiP */}
                  <button
                    onClick={togglePiP}
                    className="p-1.5 text-stone-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
                    title="Picture-in-Picture"
                  >
                    <Tv className="w-4 h-4" />
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen (F)"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── 2. Film Monograph Details & Featured Furniture Links ─── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#859F3C]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{film.subtitle}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal leading-snug">
            {film.title}
          </h1>
          <p className="text-stone-600 text-sm font-sans leading-relaxed">
            {film.description}
          </p>
        </div>

        {/* Action Concierge Button */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <a
            href={OFFICIAL_CONTACTS.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#859F3C] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Inquire About Featured Pieces</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={OFFICIAL_CONTACTS.phonePrimary.tel}
            className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#859F3C]" />
            <span>Direct Concierge: {OFFICIAL_CONTACTS.phonePrimary.display}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
