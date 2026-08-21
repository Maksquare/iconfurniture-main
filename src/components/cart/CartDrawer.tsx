'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FDFBF7] z-50 shadow-2xl flex flex-col border-l border-stone-200"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-[#F7F4EE]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#9A6B43]" />
                <h2 className="font-serif text-xl font-medium tracking-wide text-stone-900">
                  Your Cart
                </h2>
                <span className="text-xs bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-sans">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-stone-900 transition-colors rounded-full hover:bg-stone-200/50"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                    <ShoppingBag className="w-8 h-8 stroke-1" />
                  </div>
                  <p className="font-serif text-xl text-stone-800 mb-2">Your cart is empty</p>
                  <p className="text-sm text-stone-500 max-w-xs mb-6">
                    Explore our curated collection of luxury furniture pieces.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C1917] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#9A6B43] transition-colors duration-300"
                  >
                    Start Shopping
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-stone-200/80 shadow-xs"
                  >
                    <div className="relative w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-sm font-medium text-stone-900 truncate">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.selectedFinish && (
                          <p className="text-xs text-stone-500 mt-0.5">
                            Finish: {item.selectedFinish}
                          </p>
                        )}
                        <p className="text-xs font-semibold text-stone-800 mt-1">
                          {item.product.price.toLocaleString()} ETB
                        </p>
                      </div>

                      {/* Quantity control */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                        <div className="flex items-center border border-stone-200 rounded-sm bg-stone-50">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-medium text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-stone-200 text-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#124903]">
                          {(item.product.price * item.quantity).toLocaleString()} ETB
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-200 bg-[#F7F4EE] space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-600 font-sans">Subtotal</span>
                  <span className="font-serif text-lg font-semibold text-stone-900">
                    {subtotal.toLocaleString()} ETB
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  Taxes and complimentary white-glove shipping calculated at checkout.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      alert('Thank you for choosing Iconfurniture! Checkout simulation initialized.');
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-[#1C1917] text-white text-xs tracking-widest uppercase font-medium hover:bg-[#9A6B43] transition-colors duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center text-xs text-stone-600 hover:text-stone-900 underline py-1"
                  >
                    Continue Browsing Catalog
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
