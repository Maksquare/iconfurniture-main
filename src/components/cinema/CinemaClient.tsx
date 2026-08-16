'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Sparkles,
  Play,
  Volume2,
  Clock,
  Compass,
  ArrowRight,
  Phone,
  Layers,
  Award,
  CheckCircle2,
} from 'lucide-react';
import CinemaPlayer, { CinemaFilm } from '@/components/cinema/CinemaPlayer';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

export const CINEMA_FILMS: CinemaFilm[] = [
  {
    id: 'film-1',
    title: 'The Sculptural Silhouette',
    subtitle: 'Chapter I • Architecture in Motion',
    category: 'Atelier Craft',
    src: '/videos/ifvideo_001.MP4',
    duration: '01:14',
    resolution: '4K Ultra HD',
    description:
      'A deep visual exploration into the balance of geometric discipline and organic curves. Witness the sculptural contours of our signature armchairs as light moves across the solid wood frames.',
    featuredProducts: [{ name: 'Aura Velvet Accent Armchair', slug: 'aura-velvet-accent-armchair' }],
  },
  {
    id: 'film-2',
    title: 'Symphony of Solid Timber',
    subtitle: 'Chapter II • Raw Materiality',
    category: 'Raw Material',
    src: '/videos/ifvideo_002.MP4',
    duration: '01:28',
    resolution: '4K Ultra HD',
    description:
      'From certified forestry estates to our kiln-drying chambers. Inspecting continuous wood grain movement, structural density, and the selection of raw walnut slabs.',
    featuredProducts: [{ name: 'Kanso Organic Walnut Dining Table', slug: 'kanso-organic-walnut-dining-table' }],
  },
  {
    id: 'film-3',
    title: 'Living Tactility & Bouclé Weave',
    subtitle: 'Chapter III • Sensory Upholstery',
    category: 'Upholstery',
    src: '/videos/ifvideo_003.MP4',
    duration: '01:42',
    resolution: '1080p Editorial',
    description:
      'Crafted with textured loops of French bouclé and vegetable-dyed wools. Follow our master tailors as every seam is hand-stretched and blind-stitched for permanent comfort.',
    featuredProducts: [{ name: 'Mirei Bouclé Modular Sofa', slug: 'mirei-boucle-modular-sofa' }],
  },
  {
    id: 'film-4',
    title: 'The Pavilion Dining Table',
    subtitle: 'Chapter IV • Centerpiece Gathering',
    category: 'Living Vignettes',
    src: '/videos/ifvideo_004.MP4',
    duration: '01:18',
    resolution: '4K Ultra HD',
    description:
      'The dining table as a spatial anchor. Highlighting precision bevel edge detailing, conical support columns, and radial timber layouts designed for intimate gatherings.',
    featuredProducts: [{ name: 'Pavilion Round Gathering Dining Table', slug: 'pavilion-round-gathering-dining-table' }],
  },
  {
    id: 'film-5',
    title: 'Honed Travertine Monoliths',
    subtitle: 'Chapter V • Natural Stone & Brass',
    category: 'Raw Material',
    src: '/videos/ifvideo_005.MP4',
    duration: '01:30',
    resolution: '4K Ultra HD',
    description:
      'Carving unpolished Roman travertine with tactile fluting. Balancing cool porous stone surfaces with warm brushed antique brass fixtures.',
    featuredProducts: [{ name: 'Lumina Travertine Floor Monolith', slug: 'lumina-travertine-floor-monolith' }],
  },
  {
    id: 'film-6',
    title: 'Mid-Century Tambour Slats',
    subtitle: 'Chapter VI • Precision Storage',
    category: 'Atelier Craft',
    src: '/videos/ifvideo_006.MP4',
    duration: '01:05',
    resolution: '1080p Editorial',
    description:
      'The quiet glide of fluted oak tambour doors. An intimate look at blind mortise joinery, custom soft-close brass hardware, and integrated cable routing.',
    featuredProducts: [{ name: 'Solstice Credenza Sideboard', slug: 'solstice-credenza-sideboard' }],
  },
  {
    id: 'film-7',
    title: 'Atmospheric Salon & Light',
    subtitle: 'Chapter VII • Residential Sanctum',
    category: 'Living Vignettes',
    src: '/videos/ifvideo_007.mp4',
    duration: '02:04',
    resolution: '4K Ultra HD',
    description:
      'How architectural furniture shapes emotional space. Ambient evening lighting illuminating layered textures of wool, travertine, smoked glass, and solid oak.',
    featuredProducts: [{ name: 'Brutalist Smoked Glass Coffee Table', slug: 'brutalist-smoked-glass-coffee-table' }],
  },
  {
    id: 'film-8',
    title: 'The Master Woodworker’s Hand',
    subtitle: 'Chapter VIII • The Joinery Guild',
    category: 'Atelier Craft',
    src: '/videos/ifvideo_008.mp4',
    duration: '02:15',
    resolution: '4K Ultra HD',
    description:
      'Centuries-old Ethiopian artisan techniques elevated to international luxury tolerances. Hand-planing, compound radius shaping, and organic oil nourishing.',
    featuredProducts: [{ name: 'Sora Sculptural Occasional Lounge', slug: 'sora-sculptural-occasional-lounge' }],
  },
  {
    id: 'film-9',
    title: 'Curated Living Space Tour',
    subtitle: 'Chapter IX • Complete Residence Study',
    category: 'Showroom Tour',
    src: '/videos/ifvideo_009.mp4',
    duration: '01:22',
    resolution: '1080p Editorial',
    description:
      'A cinematic walkthrough of a fully furnished modern residence in Addis Ababa featuring cohesive timber stains, modular seating, and bespoke dining pavilions.',
    featuredProducts: [{ name: 'Atelier Solid Timber Bookcase', slug: 'atelier-solid-timber-bookcase' }],
  },
  {
    id: 'film-10',
    title: 'The Generational Heirloom',
    subtitle: 'Chapter X • Hallmark & Delivery',
    category: 'Showroom Tour',
    src: '/videos/ifvideo_010.mp4',
    duration: '01:50',
    resolution: '4K Ultra HD',
    description:
      'Final inspection, hand-waxing certification, and white-glove packaging. Built to breathe, patina gracefully, and outlive the ephemeral trends of modern mass production.',
    featuredProducts: [{ name: 'Elysian High-Back Executive Armchair', slug: 'elysian-high-back-executive-armchair' }],
  },
];

const CATEGORIES = [
  'All Chapters',
  'Atelier Craft',
  'Raw Material',
  'Living Vignettes',
  'Upholstery',
  'Showroom Tour',
];

export default function CinemaClient() {
  const [selectedFilm, setSelectedFilm] = useState<CinemaFilm>(CINEMA_FILMS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All Chapters');
  const [hoveredFilmId, setHoveredFilmId] = useState<string | null>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  const filteredFilms = CINEMA_FILMS.filter((film) => {
    if (activeCategory === 'All Chapters') return true;
    return film.category === activeCategory;
  });

  const handleSelectFilm = (film: CinemaFilm) => {
    setSelectedFilm(film);
    theaterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNextFilm = () => {
    const currentIndex = CINEMA_FILMS.findIndex((f) => f.id === selectedFilm.id);
    const nextIndex = (currentIndex + 1) % CINEMA_FILMS.length;
    setSelectedFilm(CINEMA_FILMS[nextIndex]);
  };

  const handlePrevFilm = () => {
    const currentIndex = CINEMA_FILMS.findIndex((f) => f.id === selectedFilm.id);
    const prevIndex = (currentIndex - 1 + CINEMA_FILMS.length) % CINEMA_FILMS.length;
    setSelectedFilm(CINEMA_FILMS[prevIndex]);
  };

  return (
    <div className="py-12 bg-[#FDFCF7] min-h-screen text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ─── 1. Cinema Monograph Header ──────────────────────────── */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#121212] text-white border border-white/10 shadow-2xl overflow-hidden">
          {/* Ambient Blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#859F3C]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                <Image
                  src="/assets/iconfurniture-logo.png"
                  alt="Icon Furniture"
                  width={110}
                  height={28}
                  className="h-5 w-auto object-contain brightness-125"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-[#859F3C]">
                <Film className="w-3.5 h-3.5" />
                <span>Atelier Cinema & Visual Journal</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]">
              Living Form in Motion. <br />
              <span className="italic font-normal text-[#859F3C]">The Craftsmanship Cinema.</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
              Experience the tactile presence, sub-millimeter timber joinery, and room-filling tranquility of our furniture pieces through high-definition cinematic vignettes.
            </p>
          </div>
        </div>

        {/* ─── 2. Main Cinema Theater Stage ─────────────────────────── */}
        <div ref={theaterRef} className="scroll-mt-24 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#859F3C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Now Screening in Theater</span>
            </div>
            <div className="text-xs font-mono text-stone-500">
              Film {CINEMA_FILMS.findIndex((f) => f.id === selectedFilm.id) + 1} of {CINEMA_FILMS.length}
            </div>
          </div>

          <CinemaPlayer
            film={selectedFilm}
            onNextFilm={handleNextFilm}
            onPrevFilm={handlePrevFilm}
          />
        </div>

        {/* ─── 3. Chapter Filter Tabs ──────────────────────────────── */}
        <div className="space-y-6 pt-6 border-t border-stone-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#859F3C]">
                Curated Film Index
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal">
                Explore The 10 Atelier Chapters
              </h2>
            </div>

            {/* Category Segmented Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#1A1A1A] text-white shadow-md'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── 4. Film Cards Grid with Hover Preview ──────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFilms.map((film, idx) => {
              const isCurrent = film.id === selectedFilm.id;
              const isHovered = hoveredFilmId === film.id;

              return (
                <motion.div
                  key={film.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredFilmId(film.id)}
                  onMouseLeave={() => setHoveredFilmId(null)}
                  onClick={() => handleSelectFilm(film)}
                  className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl cursor-pointer ${
                    isCurrent
                      ? 'border-[#859F3C] ring-4 ring-[#859F3C]/20 shadow-lg'
                      : 'border-stone-200/80 hover:border-stone-400'
                  }`}
                >
                  {/* Video Thumbnail / Live Preview Stage */}
                  <div className="relative aspect-16/9 bg-stone-950 overflow-hidden">
                    <video
                      src={film.src}
                      muted
                      loop
                      playsInline
                      autoPlay={isHovered}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs font-bold border border-white/10">
                        {film.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[#859F3C] font-bold border border-white/10">
                        {film.resolution}
                      </span>
                    </div>

                    {/* Center Play Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#859F3C] scale-110 shadow-[0_0_15px_#859F3C]'
                            : 'bg-white/20 backdrop-blur-md group-hover:bg-[#859F3C] group-hover:scale-110'
                        }`}
                      >
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Duration & Equalizer */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#859F3C]" />
                        <span>{film.duration}</span>
                      </div>

                      {isCurrent && (
                        <div className="flex items-center gap-1 bg-[#859F3C] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>Now Playing</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Film Details */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest font-mono font-semibold text-[#859F3C]">
                        {film.subtitle}
                      </div>
                      <h3 className="font-serif text-lg font-medium text-[#1A1A1A] group-hover:text-[#859F3C] transition-colors leading-snug">
                        {film.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans leading-relaxed line-clamp-2 pt-1">
                        {film.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-[#859F3C] transition-colors">
                      <span>Watch in Cinema</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 5. Direct Concierge Callout ─────────────────────────── */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-[#1A1A1A] text-white border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-[#859F3C]">
              Bespoke Commissioning
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
              Desire a Specific Silhouette Featured in Our Films?
            </h3>
            <p className="text-stone-300 text-sm font-sans leading-relaxed">
              Every timber grain, dimension, and bouclé fabric swatch shown in our cinema can be tailored for private residences and commercial architecture projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center">
            <Link
              href="/shop"
              className="px-6 py-3.5 rounded-full bg-[#859F3C] hover:bg-[#738b32] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl"
            >
              Browse Living Collection
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs uppercase tracking-widest transition-all"
            >
              Private Consultation
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
