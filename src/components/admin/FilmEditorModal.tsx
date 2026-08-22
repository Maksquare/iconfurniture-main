'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Sparkles, Check, Play, Clock, Layers, Upload, Video as VideoIcon } from 'lucide-react';
import { CinemaFilm } from '@/components/cinema/CinemaPlayer';
import VideoUploadDropzone from '@/components/admin/VideoUploadDropzone';

const LOCAL_VIDEOS = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  const ext = i === 9 ? 'mp4' : 'MP4';
  return `/videos/ifvideo_${num}.${ext}`;
});

interface FilmEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (filmData: Partial<CinemaFilm>) => void;
  film?: CinemaFilm | null;
}

export default function FilmEditorModal({
  isOpen,
  onClose,
  onSave,
  film,
}: FilmEditorModalProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Table Joinery');
  const [src, setSrc] = useState('/videos/ifvideo_001.MP4');
  const [duration, setDuration] = useState('01:20');
  const [resolution, setResolution] = useState('4K Ultra HD');
  const [description, setDescription] = useState('');
  const [videoSourceTab, setVideoSourceTab] = useState<'upload' | 'vault' | 'url'>('upload');

  useEffect(() => {
    if (film) {
      setTitle(film.title || '');
      setSubtitle(film.subtitle || '');
      setCategory(film.category || 'Table Joinery');
      setSrc(film.src || '/videos/ifvideo_001.MP4');
      setDuration(film.duration || '01:20');
      setResolution(film.resolution || '4K Ultra HD');
      setDescription(film.description || '');
      if (film.src?.startsWith('/uploads/')) {
        setVideoSourceTab('upload');
      } else {
        setVideoSourceTab('vault');
      }
    } else {
      setTitle('');
      setSubtitle('Chapter • Visual Journal');
      setCategory('Table Joinery');
      setSrc('/videos/ifvideo_001.MP4');
      setDuration('01:30');
      setResolution('4K Ultra HD');
      setDescription('');
      setVideoSourceTab('upload');
    }
  }, [film, isOpen]);

  const handleVideoUploadComplete = (url: string, detectedDur?: string) => {
    setSrc(url);
    if (detectedDur) {
      setDuration(detectedDur);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      category: category.trim() as any,
      src,
      duration: duration.trim(),
      resolution: resolution.trim(),
      description: description.trim(),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <div key="film-editor-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#869e32]/15 border border-[#869e32]/30 flex items-center justify-center text-[#869e32]">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  {film ? 'Edit Cinema Film Chapter' : 'Add New Atelier Film Chapter'}
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Upload video from any phone or device, set duration, and story details.
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 text-stone-500 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
            {/* Title & Subtitle */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                Film Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Master Sculptural Pedestal Assembly"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#869e32] text-sm font-medium text-stone-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Chapter Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Chapter XI • Sculptural Joinery"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Craft Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Table Joinery / Finishing / Stone Craft"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>
            </div>

            {/* Video Source Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700">
                  Video Track *
                </label>
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                  {(['upload', 'vault', 'url'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setVideoSourceTab(tab)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        videoSourceTab === tab
                          ? 'bg-[#869e32] text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {tab === 'upload' ? 'Upload from Device' : tab === 'vault' ? 'Vault (10 Clips)' : 'URL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Tab */}
              {videoSourceTab === 'upload' && (
                <VideoUploadDropzone
                  onUploadComplete={handleVideoUploadComplete}
                  currentPreviewUrl={src}
                  label="Upload Video from Phone or PC"
                  sublabel="Drag & drop, record with phone camera, or browse 4K/HD files (MP4, MOV, WebM)"
                />
              )}

              {/* Vault Tab */}
              {videoSourceTab === 'vault' && (
                <div className="space-y-3">
                  <select
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono text-xs text-stone-800 bg-white"
                  >
                    {LOCAL_VIDEOS.map((v, i) => (
                      <option key={v} value={v}>
                        Vault Video #{i + 1} ({v})
                      </option>
                    ))}
                  </select>

                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-stone-800">
                    <video src={src} controls muted playsInline className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* URL Tab */}
              {videoSourceTab === 'url' && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={src}
                    onChange={(e) => setSrc(e.target.value)}
                    placeholder="https://... or /videos/ifvideo_001.MP4"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono"
                  />
                  {src && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-stone-800">
                      <video src={src} controls muted playsInline className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Duration & Resolution */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Duration (mm:ss)
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="01:25"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Resolution Tag
                </label>
                <input
                  type="text"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="4K Ultra HD"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>
            </div>

            {/* Story Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                Film Chapter Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Behind the scenes details on the carving and finishing process..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#869e32] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Film Chapter</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
