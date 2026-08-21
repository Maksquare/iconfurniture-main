'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  UploadCloud,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  CheckCircle2,
  X,
  Sparkles,
  Smartphone,
  HardDrive,
} from 'lucide-react';

interface VideoUploadDropzoneProps {
  onUploadComplete: (url: string, duration?: string) => void;
  currentPreviewUrl?: string;
  label?: string;
  sublabel?: string;
  onClearPreview?: () => void;
}

export default function VideoUploadDropzone({
  onUploadComplete,
  currentPreviewUrl,
  label = 'Upload Cinema Video Track',
  sublabel = 'Upload 4K/HD video clips (MP4, MOV, WebM) from any phone camera, device, or drag & drop',
  onClearPreview,
}: VideoUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPreviewUrl || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [detectedDuration, setDetectedDuration] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleVideoFile = useCallback(
    async (file: File) => {
      if (!file) return;

      const isVideo =
        file.type.startsWith('video/') ||
        file.name.match(/\.(mp4|mov|webm|m4v|avi|mkv)$/i);

      if (!isVideo) {
        alert('Please select a valid video file (MP4, MOV, WebM, M4V).');
        return;
      }

      // Generate local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Measure duration
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = objectUrl;
      tempVideo.onloadedmetadata = () => {
        const dur = formatTime(tempVideo.duration || 0);
        setDetectedDuration(dur);
      };

      setIsUploading(true);
      setUploadProgress(15);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev === null || prev >= 90) return prev;
            return prev + Math.floor(Math.random() * 15) + 5;
          });
        }, 300);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        const data = await res.json();
        if (data.success && data.url) {
          setPreviewUrl(data.url);
          onUploadComplete(data.url, detectedDuration || undefined);
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      } catch (err: any) {
        console.error('Video upload failed:', err);
        alert(`Video upload failed: ${err.message || 'Please try again.'}`);
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(null), 1000);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
      }
    },
    [onUploadComplete, detectedDuration]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleVideoFile(e.dataTransfer.files[0]);
    }
  };

  const togglePlay = () => {
    if (!videoPlayerRef.current) return;
    if (isPlaying) {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      videoPlayerRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const clearVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setDetectedDuration('');
    if (onClearPreview) onClearPreview();
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      {/* Hidden file inputs for File Picker and Direct Camera on Mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/quicktime,video/webm,video/x-m4v,video/*,.mp4,.mov,.webm,.m4v"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleVideoFile(e.target.files[0]);
          }
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="video/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleVideoFile(e.target.files[0]);
          }
        }}
      />

      {/* Main Upload Dropzone or Video Preview Player */}
      {previewUrl ? (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-stone-800 shadow-xl group">
          <video
            ref={videoPlayerRef}
            src={previewUrl}
            muted={isMuted}
            playsInline
            loop
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={(e) => {
              const dur = formatTime(e.currentTarget.duration || 0);
              setDetectedDuration(dur);
            }}
          />

          {/* Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#124903] text-white text-[10px] font-bold font-mono shadow-md">
                {detectedDuration ? `Duration: ${detectedDuration}` : 'Active Video Track'}
              </span>
              <button
                type="button"
                onClick={clearVideo}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-red-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Remove video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#124903] hover:bg-[#0e3802] text-white text-xs font-bold cursor-pointer"
              >
                Change Video
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 transition-all cursor-pointer text-center ${
            isDragging
              ? 'border-[#124903] bg-[#124903]/10 scale-[0.99]'
              : 'border-stone-300 hover:border-[#124903] bg-stone-50/70 hover:bg-stone-100/70'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#124903]/15 border border-[#124903]/30 flex items-center justify-center text-[#124903] shadow-sm">
              <Video className="w-7 h-7" />
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-stone-900">{label}</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 leading-relaxed">
                {sublabel}
              </p>
            </div>

            {/* Quick Action Devices Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-[#1A1A1A] hover:bg-[#124903] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Browse Files (PC/Mac)</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-stone-200 hover:bg-[#124903] hover:text-white text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Record on Mobile Camera</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="p-3 rounded-2xl bg-stone-900 text-white space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-[#124903] font-semibold">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Uploading video to Atelier server...</span>
            </span>
            <span className="font-mono font-bold">{uploadProgress || 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#124903] transition-all duration-300 rounded-full"
              style={{ width: `${uploadProgress || 10}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
