'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  X,
  Plus,
  Sparkles,
} from 'lucide-react';
import { uploadPhotosFromDevice } from '@/lib/uploadHelper';

interface PhotoUploadDropzoneProps {
  onUploadComplete: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  label?: string;
  sublabel?: string;
  currentPreviewUrl?: string;
  onClearPreview?: () => void;
}

export default function PhotoUploadDropzone({
  onUploadComplete,
  multiple = false,
  maxFiles = 10,
  label = 'Upload Photo from Device',
  sublabel = 'Drag & drop high-res dining table photos, browse your device, or capture directly with camera',
  currentPreviewUrl,
  onClearPreview,
}: PhotoUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const validFiles: File[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.type.startsWith('image/') || file.name.match(/\.(jpg|jpeg|png|webp|avif|heic|heif)$/i)) {
          validFiles.push(file);
        }
      }

      if (validFiles.length === 0) {
        alert('Please select valid image files (JPG, PNG, WEBP, AVIF, HEIC).');
        return;
      }

      setIsUploading(true);
      setUploadProgress(
        validFiles.length === 1
          ? `Uploading ${validFiles[0].name}...`
          : `Uploading ${validFiles.length} photos...`
      );

      try {
        const uploadedUrls = await uploadPhotosFromDevice(validFiles);
        if (uploadedUrls.length > 0) {
          onUploadComplete(uploadedUrls);
        }
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
        setUploadProgress(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
      }
    },
    [onUploadComplete]
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
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-3">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Main Dropzone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className={`relative rounded-3xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden group ${
          isDragging
            ? 'border-[#859F3C] bg-[#859F3C]/10 shadow-[0_0_30px_rgba(133,159,60,0.35)] scale-[1.01]'
            : 'border-stone-300 hover:border-[#859F3C] bg-stone-50/70 hover:bg-[#859F3C]/5'
        }`}
      >
        {isUploading ? (
          <div className="py-6 flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#859F3C]/20 border border-[#859F3C] flex items-center justify-center text-[#859F3C] animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-bold text-stone-800 font-serif block">
                Processing &amp; Optimizing Photo
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {uploadProgress || 'Uploading...'}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 group-hover:border-[#859F3C] group-hover:bg-[#859F3C] text-stone-600 group-hover:text-white flex items-center justify-center transition-all shadow-sm group-hover:scale-105 duration-300">
              <UploadCloud className="w-7 h-7 stroke-[1.8]" />
            </div>

            <div className="space-y-1 max-w-sm">
              <span className="font-serif text-sm sm:text-base font-bold text-stone-900 block">
                {label}
              </span>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">
                {sublabel}
              </p>
            </div>

            {/* Quick Action Pills */}
            <div
              className="flex items-center gap-2 pt-2 flex-wrap justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-full bg-[#859F3C] hover:bg-[#738b32] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Browse Files</span>
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-4 py-2 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-[#859F3C]" />
                <span>Take Photo (Camera)</span>
              </button>
            </div>

            <span className="text-[10px] text-stone-400 font-mono pt-1">
              Supports JPG, PNG, WEBP, AVIF, HEIC • Auto-compressed for 4K display
            </span>
          </div>
        )}
      </div>

      {/* Current Preview Banner (if supplied) */}
      {currentPreviewUrl && (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
              <Image
                src={currentPreviewUrl}
                alt="Uploaded preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-stone-800 block truncate">
                Active Dining Table Photo
              </span>
              <span className="text-[10px] font-mono text-stone-400 block truncate">
                {currentPreviewUrl}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-[#859F3C] text-stone-700 hover:text-white text-xs font-semibold transition-colors"
            >
              Replace
            </button>
            {onClearPreview && (
              <button
                type="button"
                onClick={onClearPreview}
                className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove photo"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
