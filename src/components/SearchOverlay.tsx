import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Search, X} from 'lucide-react';
import {useStore} from '../context/StoreContext';
import {COLLECTIONS, formatINR, PRODUCTS} from '../data/catalog';
import {SafeImage} from './SafeImage';

export function SearchOverlay() {
  const {isSearchOpen, setIsSearchOpen} = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSearchOpen, setIsSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.collectionName.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q) ||
        p.weave.toLowerCase().includes(q) ||
        p.artisanOrigin.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setIsSearchOpen(false);
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop');
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search ZARIYA catalogue"
        >
          <motion.div
            initial={prefersReduced ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#0C2B27]/60 backdrop-blur-xs"
          />

          <motion.div
            initial={prefersReduced ? false : {opacity: 0, y: -16}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -16}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10 max-h-[88vh] overflow-y-auto w-full border-b border-[#C3A66B]/30 bg-[#F5F3EC] shadow-xl"
          >
            <div className="mx-auto max-w-6xl px-5 py-5 sm:px-10 sm:py-8">
              <form onSubmit={handleSubmit} className="flex items-center gap-3 sm:gap-4 border-b border-[#303431]/20 pb-3">
                <Search className="h-5 w-5 text-[#123F3A] shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Banarasi, Kanjivaram, Bridal, Chanderi..."
                  className="min-w-0 w-full bg-transparent font-display text-lg sm:text-2xl text-[#303431] placeholder:text-[#303431]/45 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-xs font-medium text-[#303431]/60 hover:text-[#123F3A] whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-[#303431] hover:text-[#123F3A]"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                    Curated Suggestions
                  </h3>
                  <div className="mt-2.5 sm:mt-3 flex flex-wrap lg:flex-col gap-x-4 gap-y-2 text-xs sm:text-sm text-[#303431]/80">
                    {['Banarasi Silk', 'Kanjivaram', 'Bridal', 'Sage Organza', 'Champagne Tissue'].map(
                      (term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="text-left hover:text-[#123F3A] transition-colors"
                        >
                          {term}
                        </button>
                      )
                    )}
                  </div>
                  <h3 className="mt-5 sm:mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                    Collections
                  </h3>
                  <div className="mt-2.5 sm:mt-3 grid grid-cols-2 lg:flex lg:flex-col gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#303431]/80">
                    {COLLECTIONS.slice(0, 4).map((col) => (
                      <Link
                        key={col.slug}
                        to={`/collections/${col.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="hover:text-[#123F3A] transition-colors truncate"
                      >
                        {col.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-9">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                      {query.trim() ? `Matching Sarees (${results.length})` : 'Featured Selection'}
                    </h3>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#123F3A] hover:text-[#9E8249] whitespace-nowrap"
                    >
                      View all in Shop
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {results.length === 0 ? (
                    <div className="mt-6 border border-[#303431]/12 bg-[#E8E5D9]/50 p-8 text-center">
                      <p className="font-display text-xl text-[#123F3A]">
                        No sarees found matching “{query}”
                      </p>
                      <p className="mt-1 text-sm text-[#303431]/70">
                        Try searching by weave (Banarasi, Chanderi, Paithani) or occasion (Bridal, Festive).
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="group flex items-center gap-3 border border-[#303431]/10 bg-[#E8E5D9]/40 p-2.5 hover:border-[#123F3A]/40 transition-colors"
                        >
                          <div className="h-18 w-14 shrink-0 overflow-hidden bg-[#E8E5D9]">
                            <SafeImage
                              src={product.images[0]}
                              alt={product.name}
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] text-[#303431]/60 truncate">
                              {product.collectionName}
                            </p>
                            <p className="font-display text-base font-medium text-[#303431] group-hover:text-[#123F3A] truncate">
                              {product.name}
                            </p>
                            <p className="text-xs font-medium tabular-nums text-[#123F3A]">
                              {formatINR(product.priceINR)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
