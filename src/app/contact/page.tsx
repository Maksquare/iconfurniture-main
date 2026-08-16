'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

export default function ContactPage() {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Private Residence',
    woodFinish: 'Smoked American Walnut',
    textilePreference: 'French Bouclé',
    timeline: 'Within 1-3 Months',
    message: '',
  });

  const handleCopy = (text: string, channelName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(channelName);
    setTimeout(() => setCopiedChannel(null), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const socialChannels = [
    {
      name: 'Instagram',
      handle: OFFICIAL_CONTACTS.instagram.handle,
      url: OFFICIAL_CONTACTS.instagram.url,
      icon: InstagramIcon,
      iconColor: 'text-pink-600',
      bgHover: 'hover:border-pink-500/40 hover:bg-pink-50/50',
      actionText: 'Follow on Instagram',
    },
    {
      name: 'Facebook',
      handle: OFFICIAL_CONTACTS.facebook.handle,
      url: OFFICIAL_CONTACTS.facebook.url,
      icon: FacebookIcon,
      iconColor: 'text-blue-600',
      bgHover: 'hover:border-blue-500/40 hover:bg-blue-50/50',
      actionText: 'Connect on Facebook',
    },
    {
      name: 'Telegram',
      handle: OFFICIAL_CONTACTS.telegram.handle,
      url: OFFICIAL_CONTACTS.telegram.url,
      icon: TelegramIcon,
      iconColor: 'text-sky-500',
      bgHover: 'hover:border-sky-500/40 hover:bg-sky-50/50',
      actionText: 'Join Telegram Channel',
    },
    {
      name: 'TikTok',
      handle: OFFICIAL_CONTACTS.tiktok.handle,
      url: OFFICIAL_CONTACTS.tiktok.url,
      icon: TikTokIcon,
      iconColor: 'text-[#1A1A1A]',
      bgHover: 'hover:border-[#1A1A1A]/40 hover:bg-stone-100/60',
      actionText: 'Watch on TikTok',
    },
    {
      name: 'Primary Phone',
      handle: OFFICIAL_CONTACTS.phonePrimary.display,
      url: OFFICIAL_CONTACTS.phonePrimary.tel,
      icon: Phone,
      iconColor: 'text-[#859F3C]',
      bgHover: 'hover:border-[#859F3C]/40 hover:bg-[#859F3C]/10',
      actionText: 'Call 0911-96-70-49',
    },
    {
      name: 'Secondary Phone',
      handle: OFFICIAL_CONTACTS.phoneSecondary.display,
      url: OFFICIAL_CONTACTS.phoneSecondary.tel,
      icon: Phone,
      iconColor: 'text-[#859F3C]',
      bgHover: 'hover:border-[#859F3C]/40 hover:bg-[#859F3C]/10',
      actionText: 'Call 0910-05-11-51',
    },
  ];

  const faqs = [
    {
      q: 'Can I commission custom dimensions for my residence?',
      a: 'Yes. Most of our pieces can be custom-scaled in width, length, seat height, and finish to harmonize perfectly with your architectural layout. Contact us directly on Telegram, WhatsApp, or phone.',
    },
    {
      q: 'What are your showroom visiting hours?',
      a: 'Our showroom in Addis Ababa is open Monday through Saturday from 9:00 AM to 7:30 PM. Private walkthroughs and custom consultations can also be scheduled via phone or Telegram.',
    },
    {
      q: 'How does delivery and installation work?',
      a: 'We provide comprehensive white-glove delivery and assembly across Addis Ababa and nationwide. Our team ensures careful placement and packaging removal.',
    },
    {
      q: 'Do you offer custom fabric and wood stain choices?',
      a: 'Yes. We offer an extensive selection of premium upholstery fabrics (including French bouclé, velvets, and leathers) alongside solid natural walnut, oak, and custom wood stains.',
    },
  ];

  return (
    <div className="bg-[#FDFCF7] text-[#1A1A1A] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* ─── 1. Header Banner ───────────────────────────────────── */}
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#f7f6f0] to-[#f0efe6] border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#859F3C]/12 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-2xs">
                <Image
                  src="/assets/iconfurniture-logo.png"
                  alt="Icon Furniture"
                  width={120}
                  height={32}
                  className="h-6 w-auto object-contain"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200/80 text-xs font-bold uppercase tracking-widest text-[#859F3C] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Showroom & Concierge</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A1A1A] leading-tight">
              Let&apos;s Craft Your Living Space.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed">
              Connect directly with our master furniture consultants on Instagram, Telegram, Facebook, TikTok, or via phone. We are ready to assist with orders, inquiries, and bespoke sizing.
            </p>

            {/* Quick Phone Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={OFFICIAL_CONTACTS.phonePrimary.tel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] text-white hover:bg-[#859F3C] transition-all text-xs font-bold shadow-md cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#859F3C]" />
                <span>Call: {OFFICIAL_CONTACTS.phonePrimary.display}</span>
              </a>
              <a
                href={OFFICIAL_CONTACTS.phoneSecondary.tel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-300 text-stone-900 hover:border-[#859F3C] hover:text-[#859F3C] transition-all text-xs font-bold shadow-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#859F3C]" />
                <span>Call: {OFFICIAL_CONTACTS.phoneSecondary.display}</span>
              </a>
              <a
                href={OFFICIAL_CONTACTS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#859F3C]/15 border border-[#859F3C]/30 text-[#47571e] hover:bg-[#859F3C]/25 transition-all text-xs font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-[#859F3C]" />
                <span>Open Google Map Location</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* ─── 2. Official Social & Phone Channels Grid ───────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-serif text-2xl font-normal text-[#1A1A1A]">
              Official Contact & Social Channels
            </h2>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#859F3C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#859F3C] animate-pulse" />
              <span>Concierge Active</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialChannels.map((channel) => {
              const Icon = channel.icon;
              const isCopied = copiedChannel === channel.name;
              const isPhone = channel.name.includes('Phone');

              return (
                <motion.div
                  key={channel.name}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className={`bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs ${channel.bgHover} transition-all duration-300 flex flex-col justify-between space-y-4`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200/60 flex items-center justify-center shadow-2xs">
                      <Icon className={`w-5 h-5 ${channel.iconColor}`} />
                    </div>
                    <button
                      onClick={() => handleCopy(channel.handle, channel.name)}
                      className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                      title="Copy handle/number"
                    >
                      {isCopied ? (
                        <span className="text-[#859F3C] font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Copied
                        </span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-0.5">
                      {channel.name}
                    </span>
                    <div className="font-serif text-base font-semibold text-[#1A1A1A] break-all">
                      {channel.handle}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <a
                      href={channel.url}
                      target={isPhone ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#859F3C] hover:text-[#738b32] inline-flex items-center gap-1 group"
                    >
                      <span>{channel.actionText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── 3. Main Split: Bespoke Form & Showroom Details ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Consultation Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm space-y-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#859F3C] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inquiry & Order Request</span>
              </div>
              <h2 className="font-serif text-3xl font-normal text-[#1A1A1A] leading-tight">
                Send a Message to Icon Furniture
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm font-sans mt-1">
                Fill in your details below. Our showroom representative will contact you with product availability, prices, and material swatches.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 px-6 rounded-2xl bg-[#859F3C]/10 border border-[#859F3C]/30 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#859F3C] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1A1A1A]">{formData.name || 'Valued Client'}</strong>. We have received your inquiry and will reach out promptly. You may also call us directly at <strong className="text-[#1A1A1A]">0911-96-70-49</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#859F3C] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Samuel Bekele"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#859F3C] focus:bg-white transition-all placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0911 00 00 00"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#859F3C] focus:bg-white transition-all placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Email & Commission Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="samuel@example.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#859F3C] focus:bg-white transition-all placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                      Interest / Inquiry Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#859F3C] focus:bg-white transition-all text-stone-800"
                    >
                      <option>Living Room & Seating</option>
                      <option>Dining Tables & Chairs</option>
                      <option>Bedroom & Bed Sets</option>
                      <option>Full Home Furnishing</option>
                      <option>Custom Architectural Commission</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-1.5">
                    Your Message / Desired Furniture Piece *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the furniture item, dimensions, colors, or specific model from our catalog..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200/90 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-[#859F3C] focus:bg-white transition-all placeholder:text-stone-400 leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#859F3C] text-white text-xs uppercase tracking-widest font-semibold rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Showroom Details & Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom & Location Card */}
            <div className="bg-white p-7 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#859F3C]/10 text-[#859F3C] flex items-center justify-center">
                <Building2 className="w-6 h-6 stroke-1.5" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#859F3C] block mb-0.5">
                  Main Showroom & Studio
                </span>
                <h3 className="font-serif text-xl font-medium text-[#1A1A1A]">
                  Icon Furniture Showroom
                </h3>
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#859F3C] shrink-0 mt-0.5" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <a
                  href={OFFICIAL_CONTACTS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#859F3C] hover:underline pt-1"
                >
                  <span>Open exact location in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3 border-t border-stone-100 space-y-2.5 text-xs text-stone-600 font-sans">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#859F3C]" />
                  <span>Primary: <strong>{OFFICIAL_CONTACTS.phonePrimary.display}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#859F3C]" />
                  <span>Secondary: <strong>{OFFICIAL_CONTACTS.phoneSecondary.display}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#859F3C]" />
                  <span>Mon – Sat: 9:00 AM – 7:30 PM</span>
                </div>
              </div>
            </div>

            {/* Quality & Craftsmanship Pledge */}
            <div className="p-7 rounded-3xl bg-[#1A1A1A] text-white border border-white/10 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#859F3C]/20 text-[#859F3C] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 stroke-1.5" />
              </div>
              <h4 className="font-serif text-lg font-medium text-[#859F3C]">
                Handcrafted Quality Guarantee
              </h4>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                Every piece is constructed using hand-selected timbers, reinforced joinery, and durable luxury fabrics.
              </p>
            </div>

            {/* Interactive Google Map Embed */}
            <div className="h-64 rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs relative group">
              <iframe
                src="https://maps.google.com/maps?q=Bole,%20Addis%20Ababa,%20Ethiopia&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-125 hover:grayscale-0 transition-all duration-500"
              />
              <a
                href={OFFICIAL_CONTACTS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#1A1A1A]/90 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1.5 hover:bg-[#859F3C] transition-colors shadow-md"
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

        {/* ─── 4. Client FAQ Accordion ─────────────────────────────── */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/80 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#859F3C]">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1A1A1A]">
              Showroom & Order FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-stone-100">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A] group-hover:text-[#859F3C] transition-colors pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#859F3C]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed pt-2 pb-3">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
