import React, {useEffect, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ChevronDown, Heart, Menu, Search, ShoppingBag, X} from 'lucide-react';
import {COLLECTIONS} from '../data/catalog';
import {useStore} from '../context/StoreContext';

export function Navbar() {
  const {cartCount, wishlist, setIsBagOpen, setIsSearchOpen, resetHomeView} = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
  }, [location.pathname, location.search]);

  const navLinkClass = ({isActive}: {isActive: boolean}) =>
    `whitespace-nowrap shrink-0 text-[13px] font-medium tracking-[0.06em] transition-colors pb-0.5 border-b ${
      isActive
        ? 'text-[#123F3A] border-[#C3A66B]'
        : 'text-[#303431]/80 border-transparent hover:text-[#123F3A] hover:border-[#C3A66B]/60'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#303431]/12 bg-[#F5F3EC]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 sm:gap-8 px-3.5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-9 sm:w-10 items-center justify-center text-[#303431] hover:text-[#123F3A] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            to="/"
            onClick={() => {
              setMobileOpen(false);
              if (location.pathname === '/') {
                resetHomeView();
              }
            }}
            className="font-accent text-xl sm:text-[26px] tracking-[0.22em] sm:tracking-[0.24em] text-[#123F3A] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123F3A]"
          >
            ZARIYA
          </Link>
        </div>

        {/* Zone 2: 5 Concise Single-Line Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
          <NavLink to="/shop" className={navLinkClass}>
            Shop All
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCollectionsOpen((prev) => !prev)}
              aria-expanded={collectionsOpen}
              className={`flex items-center gap-1 whitespace-nowrap shrink-0 text-[13px] font-medium tracking-[0.06em] pb-0.5 border-b transition-colors ${
                location.pathname.startsWith('/collections')
                  ? 'text-[#123F3A] border-[#C3A66B]'
                  : 'text-[#303431]/80 border-transparent hover:text-[#123F3A]'
              }`}
            >
              Collections
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-150 ${
                  collectionsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={prefersReduced ? false : {opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 4}}
                  transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                  className="absolute left-1/2 top-full z-50 mt-2 w-[680px] -translate-x-1/2 border border-[#C3A66B]/30 bg-[#F5F3EC] p-6 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-[#303431]/10 pb-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                      Twelve Curated Weaves &amp; Edits
                    </span>
                    <Link
                      to="/collections"
                      className="text-xs font-medium text-[#123F3A] hover:text-[#9E8249]"
                    >
                      View All Collections
                    </Link>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-x-5 gap-y-2.5">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.slug}
                        to={`/collections/${col.slug}`}
                        className="group block py-0.5"
                      >
                        <span className="block font-display text-[17px] font-medium text-[#303431] group-hover:text-[#123F3A] truncate">
                          {col.name}
                        </span>
                        <span className="block text-[11px] text-[#303431]/60 truncate">
                          {col.origin}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/bridal" className={navLinkClass}>
            Bridal Edit
          </NavLink>
          <NavLink to="/heritage" className={navLinkClass}>
            Heritage
          </NavLink>
          <NavLink to="/journal" className={navLinkClass}>
            Journal
          </NavLink>
        </nav>

        {/* Zone 3: Search, Wishlist & Primary Bag Action */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search sarees"
            className="flex h-10 w-9 sm:w-10 items-center justify-center text-[#303431] hover:text-[#123F3A] transition-colors"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlist.length} saved)`}
            className="relative flex h-10 items-center gap-1 px-1.5 sm:px-2 text-[#303431] hover:text-[#123F3A] transition-colors whitespace-nowrap shrink-0"
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="text-xs font-medium tabular-nums text-[#123F3A]">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            className="flex h-10 items-center gap-1.5 sm:gap-2 bg-[#123F3A] px-2.5 sm:px-4 text-[11px] sm:text-xs font-medium tracking-[0.1em] sm:tracking-[0.12em] uppercase text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer — Compact Zero-Scroll Layout */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={prefersReduced ? false : {opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
            aria-label="Mobile Navigation"
            className="overflow-hidden border-t border-[#303431]/12 bg-[#F5F3EC] lg:hidden"
          >
            <div className="px-5 py-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-[#303431]/10 pb-3.5">
                <Link
                  to="/"
                  onClick={() => {
                    setMobileOpen(false);
                    if (location.pathname === '/') {
                      resetHomeView();
                    }
                  }}
                  className="py-1.5 font-display text-lg font-medium text-[#123F3A]"
                >
                  Home
                </Link>
                <Link to="/shop" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Shop All
                </Link>
                <Link to="/bridal" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Bridal Edit
                </Link>
                <Link to="/heritage" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Our Heritage
                </Link>
                <Link to="/journal" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Journal
                </Link>
                <Link to="/about" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  About & Contact
                </Link>
                <Link to="/wishlist" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Wishlist ({wishlist.length})
                </Link>
                <Link to="/bag" className="py-1.5 font-display text-lg font-medium text-[#123F3A]">
                  Bag ({cartCount})
                </Link>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                    Collections
                  </p>
                  <Link
                    to="/collections"
                    className="text-[11px] font-medium text-[#123F3A] underline underline-offset-4"
                  >
                    View All
                  </Link>
                </div>
                <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-0 text-[11px]">
                  {COLLECTIONS.map((col) => (
                    <Link
                      key={col.slug}
                      to={`/collections/${col.slug}`}
                      className="py-1 text-[#303431]/85 hover:text-[#123F3A] truncate"
                    >
                      {col.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
