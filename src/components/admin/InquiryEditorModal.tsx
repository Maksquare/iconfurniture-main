'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Phone, DollarSign, MessageSquare } from 'lucide-react';
import { CustomerInquiry, InquiryStatus } from '@/types/admin';

interface InquiryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (inquiryData: Partial<CustomerInquiry>) => void;
  inquiry?: CustomerInquiry | null;
}

export default function InquiryEditorModal({
  isOpen,
  onClose,
  onSave,
  inquiry,
}: InquiryEditorModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [tableInterest, setTableInterest] = useState('Elysian Extendable Grand Banquet Table');
  const [seatingPreference, setSeatingPreference] = useState('8–10 Seater');
  const [customDimensions, setCustomDimensions] = useState('280cm L × 110cm W × 76cm H');
  const [budget, setBudget] = useState<number>(250000);
  const [status, setStatus] = useState<InquiryStatus>('new');
  const [channel, setChannel] = useState<'website' | 'telegram' | 'phone' | 'instagram'>('phone');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (inquiry) {
      setCustomerName(inquiry.customer_name || '');
      setPhone(inquiry.phone || '');
      setTelegram(inquiry.telegram || '');
      setEmail(inquiry.email || '');
      setTableInterest(inquiry.table_interest || '');
      setSeatingPreference(inquiry.seating_preference || '8-Seater');
      setCustomDimensions(inquiry.custom_dimensions || '');
      setBudget(inquiry.estimated_budget_etb || 200000);
      setStatus(inquiry.status || 'new');
      setChannel(inquiry.channel || 'phone');
      setNotes(inquiry.notes || '');
    } else {
      setCustomerName('');
      setPhone('');
      setTelegram('');
      setEmail('');
      setTableInterest('Kanso Organic Solid Walnut Dining Table');
      setSeatingPreference('8-Seater');
      setCustomDimensions('260cm L × 105cm W × 76cm H');
      setBudget(220000);
      setStatus('new');
      setChannel('phone');
      setNotes('');
    }
  }, [inquiry, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    onSave({
      customer_name: customerName.trim(),
      phone: phone.trim(),
      telegram: telegram.trim() || undefined,
      email: email.trim() || undefined,
      table_interest: tableInterest.trim(),
      seating_preference: seatingPreference.trim(),
      custom_dimensions: customDimensions.trim() || undefined,
      estimated_budget_etb: Number(budget) || 0,
      status,
      channel,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-8"
        >
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#859F3C]/15 border border-[#859F3C]/30 flex items-center justify-center text-[#859F3C]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  {inquiry ? 'Update Customer Commission Record' : 'Log New Bespoke Table Commission'}
                </h2>
                <p className="text-xs text-stone-500 font-sans">
                  Manage client specifications, phone contact, status pipeline, and ETB quote values.
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-200 text-stone-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Almaz Bekele"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#859F3C] text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Phone Number (Ethiopian) *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0911-00-00-00"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#859F3C] text-sm font-mono text-stone-900"
                />
              </div>
            </div>

            {/* Telegram & Inbound Channel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Telegram Username (Optional)
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@client_telegram"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Inbound Channel
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white"
                >
                  <option value="phone">Direct Phone Call</option>
                  <option value="telegram">Telegram Chat</option>
                  <option value="website">Website Inquiry Form</option>
                  <option value="instagram">Instagram Direct</option>
                </select>
              </div>
            </div>

            {/* Table Interest & Seating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Requested Dining Table Style
                </label>
                <input
                  type="text"
                  value={tableInterest}
                  onChange={(e) => setTableInterest(e.target.value)}
                  placeholder="e.g. Sculptural Oval Table"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Seating Capacity
                </label>
                <input
                  type="text"
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value)}
                  placeholder="10-Seater Grand"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>
            </div>

            {/* Custom Dimensions & Estimated ETB Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Custom Dimensions
                </label>
                <input
                  type="text"
                  value={customDimensions}
                  onChange={(e) => setCustomDimensions(e.target.value)}
                  placeholder="300cm L × 115cm W"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                  Commission Budget / Quote (ETB)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={5000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full pl-3 pr-14 py-2 rounded-xl border border-stone-300 font-mono text-xs font-bold text-stone-900"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#859F3C]">
                    ETB
                  </span>
                </div>
              </div>
            </div>

            {/* Status Stage */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                Current Pipeline Status
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {(
                  [
                    { id: 'new', label: 'New Lead' },
                    { id: 'consultation', label: 'Consultation' },
                    { id: 'design', label: 'CAD Design' },
                    { id: 'production', label: 'In Joinery' },
                    { id: 'completed', label: 'Installed' },
                    { id: 'archived', label: 'Archived' },
                  ] as const
                ).map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setStatus(st.id)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                      status === st.id
                        ? 'bg-[#859F3C] text-white border-[#859F3C] shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Workshop Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                Internal Workshop / Craft Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific timber preferences, delivery gate access, finish coats..."
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
                className="px-6 py-2 rounded-full bg-[#859F3C] hover:bg-[#738b32] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Client Record</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
