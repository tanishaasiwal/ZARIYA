import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Check, Heart, Minus, Plus, X} from 'lucide-react';
import {useStore} from '../context/StoreContext';
import {formatINR} from '../data/catalog';
import {CartItem} from '../types';
import {SafeImage} from './SafeImage';

const VIEW_LABELS = ['Main Drape', 'Alternate Pose', 'Pallu Craft'];
const SHORT_LABELS = ['Drape', 'Pose II', 'Pallu'];

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState<CartItem['blouseOption']>(
    'Unstitched Blouse Included'
  );
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setBlouseOption('Unstitched Blouse Included');
  }, [quickViewProduct?.id]);

  useEffect(() => {
    if (!quickViewProduct) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickViewProduct(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [quickViewProduct, setQuickViewProduct]);

  return (
    <AnimatePresence>
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-2.5 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
        >
          <motion.div
            initial={prefersReduced ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setQuickViewProduct(null)}
            className="fixed inset-0 bg-[#0C2B27]/72 backdrop-blur-xs"
          />

          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: 14, scale: 0.985}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 10, scale: 0.985}}
            transition={{duration: 0.24, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10 flex w-full max-w-[880px] flex-col md:flex-row border border-[#C3A66B]/40 bg-[#F5F3EC] shadow-2xl"
          >
            {/* Floating Close Control */}
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close quick view"
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 flex h-8 w-8 items-center justify-center border border-[#303431]/15 bg-[#F5F3EC]/95 text-[#303431] hover:border-[#123F3A] hover:text-[#123F3A] transition-colors shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Mobile Top Split Header (Uncropped 3:4 Portrait + Title/Price/Views) */}
            <div className="grid grid-cols-12 gap-3 border-b border-[#303431]/12 bg-[#E8E5D9]/45 p-3 md:hidden">
              <div className="col-span-4 aspect-[3/4] w-full overflow-hidden border border-[#C3A66B]/30 bg-[#0E312D]">
                <SafeImage
                  src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fallbackTitle={quickViewProduct.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="col-span-8 flex min-w-0 flex-col justify-between pr-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E8249] truncate">
                    {quickViewProduct.collectionName}
                  </p>
                  <h2 className="mt-0.5 font-display text-lg font-medium leading-tight text-[#123F3A] line-clamp-2">
                    {quickViewProduct.name}
                  </h2>
                  <p className="mt-1 font-display text-xl font-medium tabular-nums text-[#123F3A]">
                    {formatINR(quickViewProduct.priceINR)}
                  </p>
                  <p className="text-[11px] text-[#303431]/65 truncate">
                    {quickViewProduct.artisanOrigin} · {quickViewProduct.craftHours} hrs
                  </p>
                </div>

                {quickViewProduct.images.length > 1 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    {quickViewProduct.images.map((img, idx) => (
                      <button
                        key={`mob-${img}-${idx}`}
                        type="button"
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-1 border px-1.5 py-1 text-[10px] font-medium uppercase tracking-[0.06em] transition-colors whitespace-nowrap ${
                          selectedImage === idx
                            ? 'border-[#123F3A] bg-[#123F3A] text-[#E8E5D9]'
                            : 'border-[#303431]/20 bg-white/70 text-[#303431]/80'
                        }`}
                      >
                        {SHORT_LABELS[idx] || `Look ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Left Stage: Exact 3:4 Saree Portrait (Zero Image Crop) + Bottom Selector */}
            <div className="hidden md:flex md:w-[292px] lg:w-[330px] shrink-0 flex-col justify-between bg-[#0E312D] border-r border-[#C3A66B]/25">
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#0E312D]">
                <SafeImage
                  src={quickViewProduct.images[selectedImage] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  fallbackTitle={quickViewProduct.name}
                  className="h-full w-full object-contain transition-opacity duration-200"
                />
              </div>

              {quickViewProduct.images.length > 1 && (
                <div className="grid grid-cols-3 gap-1.5 border-t border-[#C3A66B]/20 bg-[#0C2B27] p-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={`desk-${img}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`flex items-center gap-1.5 border p-1 text-left transition-colors ${
                        selectedImage === idx
                          ? 'border-[#D6B97C] bg-[#123F3A]'
                          : 'border-white/10 bg-white/[0.03] opacity-75 hover:opacity-100 hover:border-[#C3A66B]/50'
                      }`}
                    >
                      <div className="h-9 w-7 shrink-0 overflow-hidden bg-[#0C2B27]">
                        <SafeImage
                          src={img}
                          alt={`${quickViewProduct.name} ${VIEW_LABELS[idx] || idx + 1}`}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <span
                        className={`min-w-0 truncate text-[10px] font-medium uppercase tracking-[0.08em] ${
                          selectedImage === idx ? 'text-[#FFE3A3]' : 'text-[#E8E5D9]/80'
                        }`}
                      >
                        {SHORT_LABELS[idx] || `Look ${idx + 1}`}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Couture Specification & Purchase Panel — Compact Full-Fit Layout */}
            <div className="flex flex-1 min-w-0 flex-col justify-between p-3.5 sm:p-5 lg:p-6">
              <div className="min-w-0 space-y-2.5 sm:space-y-3">
                {/* Desktop Title & Price Block */}
                <div className="hidden md:block">
                  <p className="pr-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9E8249] truncate">
                    {quickViewProduct.collectionName} · {quickViewProduct.artisanOrigin}
                  </p>
                  <h2
                    id="quick-view-title"
                    className="mt-1 pr-6 font-display text-2xl lg:text-[28px] font-medium leading-[1.12] text-[#123F3A]"
                  >
                    {quickViewProduct.name}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#303431]/70 truncate">
                    {quickViewProduct.subtitle}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-y border-[#303431]/12 py-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-medium tabular-nums text-[#123F3A]">
                        {formatINR(quickViewProduct.priceINR)}
                      </span>
                      <span className="text-[11px] text-[#303431]/55">Incl. taxes</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                      <div>
                        <span className="text-[#303431]/50">Craft </span>
                        <span className="font-medium tabular-nums text-[#303431]">
                          {quickViewProduct.craftHours} hrs
                        </span>
                      </div>
                      <div>
                        <span className="text-[#303431]/50">Occasion </span>
                        <span className="font-medium text-[#303431]">
                          {quickViewProduct.occasion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Saree Description */}
                <p className="text-xs sm:text-[13px] leading-relaxed text-[#303431]/85 line-clamp-2 lg:line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Weave + Color Readout */}
                <div className="grid grid-cols-2 gap-2.5 border border-[#303431]/10 bg-[#E8E5D9]/55 px-3 py-2 text-xs">
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.12em] text-[#303431]/55">
                      Weave Technique
                    </span>
                    <span className="mt-0.5 block font-medium text-[#303431] truncate">
                      {quickViewProduct.weave}
                    </span>
                  </div>
                  <div className="min-w-0 flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 shrink-0 border border-[#303431]/25"
                      style={{backgroundColor: quickViewProduct.colorHex}}
                    />
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.12em] text-[#303431]/55">
                        Color Palette
                      </span>
                      <span className="mt-0.5 block font-medium text-[#303431] truncate">
                        {quickViewProduct.color}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blouse Tailoring Option */}
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#303431]/75">
                    Blouse Preference
                  </span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {(
                      [
                        {
                          value: 'Unstitched Blouse Included' as const,
                          shortTitle: 'Unstitched Piece',
                          note: '1.0m matching blouse',
                        },
                        {
                          value: 'Complimentary Custom Tailoring' as const,
                          shortTitle: 'Custom Tailoring',
                          note: 'Complimentary atelier fit',
                        },
                      ] as const
                    ).map((opt) => {
                      const active = blouseOption === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBlouseOption(opt.value)}
                          className={`flex items-start justify-between gap-1.5 border px-2.5 py-1.5 sm:px-3 sm:py-2 text-left transition-colors ${
                            active
                              ? 'border-[#123F3A] bg-[#123F3A]/8 text-[#123F3A]'
                              : 'border-[#303431]/18 bg-white/40 text-[#303431]/80 hover:border-[#303431]/40'
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="block text-[11px] sm:text-xs font-semibold truncate">
                              {opt.shortTitle}
                            </span>
                            <span className="block text-[10px] text-[#303431]/60 truncate">
                              {opt.note}
                            </span>
                          </div>
                          {active && <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#123F3A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Action Dock */}
              <div className="mt-3 sm:mt-4 space-y-2 border-t border-[#303431]/12 pt-3 shrink-0">
                <div className="flex items-stretch gap-2">
                  <div className="flex items-center border border-[#303431]/22 bg-white/50">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-10 w-8 items-center justify-center text-[#303431] hover:bg-[#E8E5D9] transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center text-xs sm:text-sm font-medium tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Increase quantity"
                      className="flex h-10 w-8 items-center justify-center text-[#303431] hover:bg-[#E8E5D9] transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    aria-label={
                      isWishlisted(quickViewProduct.id) ? 'Remove from wishlist' : 'Save to wishlist'
                    }
                    className={`flex h-10 items-center gap-1.5 border px-3 text-xs font-medium transition-colors whitespace-nowrap ${
                      isWishlisted(quickViewProduct.id)
                        ? 'border-[#123F3A] bg-[#123F3A]/10 text-[#123F3A]'
                        : 'border-[#303431]/22 bg-white/50 text-[#303431] hover:border-[#123F3A]'
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        isWishlisted(quickViewProduct.id) ? 'fill-[#123F3A] text-[#123F3A]' : ''
                      }`}
                    />
                    <span className="hidden sm:inline">
                      {isWishlisted(quickViewProduct.id) ? 'Saved' : 'Save'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct.id, quantity, blouseOption, true);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 h-10 bg-[#123F3A] px-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap truncate"
                  >
                    Add to Bag · {formatINR(quickViewProduct.priceINR * quantity)}
                  </button>
                </div>

                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="flex items-center justify-center gap-1.5 pt-0.5 text-center text-[11px] sm:text-xs font-medium text-[#123F3A] hover:text-[#9E8249] transition-colors"
                >
                  <span>Explore Full Specifications &amp; Delivery Check</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
