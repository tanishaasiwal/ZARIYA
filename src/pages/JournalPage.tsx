import React, {useMemo, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {JOURNAL_ENTRIES} from '../data/editorial';
import {ASSETS, formatINR, getProductById} from '../data/catalog';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

type EditorialCategory = 'All' | 'Craft Chronicle' | 'Lookbook' | 'Material Study';

interface LookbookPlateItem {
  id: string;
  plateCode: string;
  title: string;
  setting: string;
  image: string;
  caption: string;
  stylingNote: string;
  productId: string;
}

const LOOKBOOK_GALLERY: LookbookPlateItem[] = [
  {
    id: 'plate-01',
    plateCode: 'Plate I',
    title: 'Jaipur Sandstone Verandah',
    setting: 'Late Afternoon · Sandstone Archway',
    image: ASSETS.lookbookPalaceVerandah,
    caption: 'Mayur Peacock Katan Banarasi · Jaipur Courtyard',
    stylingNote:
      'Draped across an open-shoulder fall with heirloom polki studs and woven jasmine hairpins.',
    productId: 'zar-001',
  },
  {
    id: 'plate-02',
    plateCode: 'Plate II',
    title: 'Dawn Courtyard Ivory',
    setting: 'Morning Light · Heritage Colonnade',
    image: ASSETS.lookbookCourtyard,
    caption: 'Kashi Ivory & Gold Katan Bridal · Morning Stillness',
    stylingNote:
      'Broad 5-inch waist pleats allow uninterrupted rangkat floral motifs to catch dawn radiance.',
    productId: 'zar-008',
  },
  {
    id: 'plate-03',
    plateCode: 'Plate III',
    title: 'Twilight Teak Salon',
    setting: 'Amber Dusk · Shuttered Library',
    image: ASSETS.lookbookTwilightOrganza,
    caption: 'Gulbagh Muted Sage Organza · Evening Salon',
    stylingNote:
      'Translucent hand-embroidered botanical zardozi anchored cleanly over a structured raw-silk blouse.',
    productId: 'zar-004',
  },
  {
    id: 'plate-04',
    plateCode: 'Plate IV',
    title: 'Gilded Gallery Dusk',
    setting: 'Candlelight · Stone Foyer',
    image: ASSETS.champagneTissue,
    caption: 'Noor Champagne Crushed Tissue · Gallery Twilight',
    stylingNote:
      'Pin left pleats lightly below the collarbone so liquid metallic silk catches ambient amber glow.',
    productId: 'zar-006',
  },
  {
    id: 'plate-05',
    plateCode: 'Plate V',
    title: 'Verandah Silk-Cotton',
    setting: 'Midday Shade · Sandstone Verandah',
    image: ASSETS.pearlChanderi,
    caption: 'Aabh Pearl & Sage Chanderi · Sunlit Verandah',
    stylingNote:
      'Feather-light Chanderi paired with quiet brushed-brass cuff bracelets for daytime art openings.',
    productId: 'zar-003',
  },
  {
    id: 'plate-06',
    plateCode: 'Plate VI',
    title: 'Peacock Bridal Silhouette',
    setting: 'Haveli Courtyard · Reception Hour',
    image: ASSETS.heroPeacock,
    caption: 'Mayur Peacock Kadwa Brocade · Evening Portrait',
    stylingNote:
      'Let the full antique zari pallu trail loosely across the forearm to frame kadwa weave detail.',
    productId: 'zar-001',
  },
];

const CATEGORIES: EditorialCategory[] = ['All', 'Craft Chronicle', 'Lookbook', 'Material Study'];

export function JournalPage() {
  usePageMeta(
    'Lookbook & Journal',
    'Seasonal fashion lookbook, saree draping inspiration, and craft essays from the ZARIYA textile journal.'
  );

  const [selectedCategory, setSelectedCategory] = useState<EditorialCategory>('All');
  const [selectedSlug, setSelectedSlug] = useState<string>(JOURNAL_ENTRIES[1].slug);
  const [activePlateId, setActivePlateId] = useState<string>(LOOKBOOK_GALLERY[0].id);
  const readingAnchorRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const filteredEntries = useMemo(() => {
    if (selectedCategory === 'All') return JOURNAL_ENTRIES;
    return JOURNAL_ENTRIES.filter((entry) => entry.category === selectedCategory);
  }, [selectedCategory]);

  const activeEntry =
    filteredEntries.find((entry) => entry.slug === selectedSlug) ??
    filteredEntries[0] ??
    JOURNAL_ENTRIES[0];

  const activeIndexInFiltered = Math.max(
    0,
    filteredEntries.findIndex((entry) => entry.slug === activeEntry.slug)
  );

  const handleSelectEntry = (slug: string) => {
    setSelectedSlug(slug);
    readingAnchorRef.current?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'nearest',
    });
  };

  const handleCategoryChange = (cat: EditorialCategory) => {
    setSelectedCategory(cat);
    const matching =
      cat === 'All' ? JOURNAL_ENTRIES : JOURNAL_ENTRIES.filter((e) => e.category === cat);
    if (matching.length > 0 && !matching.some((e) => e.slug === selectedSlug)) {
      setSelectedSlug(matching[0].slug);
    }
  };

  const handleStepDispatch = (delta: number) => {
    if (filteredEntries.length === 0) return;
    const nextIdx =
      (activeIndexInFiltered + delta + filteredEntries.length) % filteredEntries.length;
    handleSelectEntry(filteredEntries[nextIdx].slug);
  };

  const activePlate =
    LOOKBOOK_GALLERY.find((plate) => plate.id === activePlateId) ?? LOOKBOOK_GALLERY[0];
  const activePlateProduct = getProductById(activePlate.productId);

  return (
    <PageShell className="bg-[#F5F3EC]">
      {/* 1. Broadsheet Masthead */}
      <section className="pt-6 pb-5 sm:pt-12 sm:pb-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Lookbook & Journal'}]} />

          <div className="mt-5 sm:mt-6 border-y border-[#303431]/25 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#303431]/70">
            <span>Issue IV · Autumn 2026 Monograph</span>
            <span className="hidden sm:inline">Varanasi · Kanchipuram · Patan · Jaipur</span>
            <span className="tabular-nums text-[#9E8249] font-semibold">
              {JOURNAL_ENTRIES.length} Dispatches &amp; 6 Plates
            </span>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col justify-between gap-5 sm:gap-6 border-b border-[#303431]/12 pb-6 sm:pb-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl font-normal leading-[1.06] text-[#123F3A] sm:text-5xl lg:text-6xl [text-wrap:balance]">
                The ZARIYA Textile Journal
              </h1>
              <p className="mt-3 sm:mt-4 max-w-2xl text-sm leading-relaxed text-[#303431]/80 sm:text-base">
                Field studies on handloom architecture, bridal minimalism, tested silk-core zari,
                and seasonal styling dispatches across India’s living weaving towns.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:inline-flex w-full lg:w-auto items-center gap-1 border border-[#303431]/15 bg-[#E8E5D9]/65 p-1">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 sm:px-3.5 py-2 text-[11px] sm:text-xs font-medium text-center transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#123F3A] text-[#E8E5D9]'
                        : 'text-[#303431]/75 hover:text-[#123F3A]'
                    }`}
                  >
                    {category === 'All' ? 'All Dispatches' : category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Split Broadsheet Reading Desk + Issue Index */}
      <section ref={readingAnchorRef} className="pb-12 pt-3 sm:pb-20 lg:pb-24 sm:pt-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left/Center Inline Reading Canvas (8 columns) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeEntry.slug}
                  initial={prefersReduced ? false : {opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0}}
                  transition={{duration: 0.2}}
                >
                  {/* Story Meta + Title */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-[#9E8249]">
                    <span className="font-semibold uppercase tracking-[0.14em]">
                      Dispatch {String(activeIndexInFiltered + 1).padStart(2, '0')} /{' '}
                      {String(filteredEntries.length).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeEntry.kicker}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeEntry.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeEntry.readTime}</span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl font-normal leading-[1.14] text-[#123F3A] sm:text-4xl lg:text-5xl [text-wrap:balance]">
                    {activeEntry.title}
                  </h2>

                  {activeEntry.byline && (
                    <p className="mt-2.5 sm:mt-3 text-xs font-medium text-[#303431]/65">
                      {activeEntry.byline}
                    </p>
                  )}

                  {/* Paired Uncropped 3:4 Plate + Prose Reading Body */}
                  <div className="mt-6 sm:mt-7 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-12">
                    <div className="md:col-span-5 mx-auto w-full max-w-sm md:max-w-none">
                      <div className="border border-[#303431]/15 bg-[#E8E5D9]/65 p-2">
                        <div className="aspect-[3/4] w-full overflow-hidden bg-[#123F3A]">
                          <SafeImage
                            src={activeEntry.coverImage}
                            alt={activeEntry.title}
                            priority
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                        <p className="px-1 pt-2.5 pb-0.5 text-[11px] font-display italic text-[#303431]/75">
                          Archive Study — {activeEntry.kicker}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-5 text-sm leading-[1.78] text-[#303431]/85 sm:text-base">
                      {activeEntry.paragraphs.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className={
                            idx === 0
                              ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.82] first-letter:text-[#123F3A]'
                              : ''
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {activeEntry.pullQuote && (
                    <blockquote className="mt-7 sm:mt-8 border-y border-[#303431]/15 py-4 sm:py-5 font-display text-xl sm:text-2xl italic leading-relaxed text-[#123F3A]">
                      “{activeEntry.pullQuote}”
                    </blockquote>
                  )}

                  {/* Atelier Styling Notes & Featured Sarees Inline */}
                  <div className="mt-8 grid grid-cols-1 gap-6 border-b border-[#303431]/15 pb-8 md:grid-cols-12">
                    <div className="md:col-span-5 border border-[#303431]/12 bg-[#E8E5D9]/45 p-5">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#123F3A]">
                        Atelier Styling Notes
                      </h3>
                      <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#303431]/82 list-disc pl-4 sm:text-sm">
                        {activeEntry.stylingNotes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-7">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                        Woven in This Dispatch
                      </h3>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {activeEntry.featuredProductIds.map((pid) => {
                          const product = getProductById(pid);
                          if (!product) return null;
                          return (
                            <Link
                              key={product.id}
                              to={`/product/${product.slug}`}
                              className="group flex items-center gap-3 border border-[#303431]/12 bg-white/75 p-2.5 hover:border-[#123F3A] transition-colors"
                            >
                              <div className="h-18 w-14 shrink-0 overflow-hidden bg-[#F5F3EC] border border-[#303431]/10">
                                <SafeImage
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="font-display text-base leading-snug text-[#123F3A] truncate group-hover:text-[#9E8249] transition-colors">
                                  {product.name}
                                </p>
                                <p className="mt-0.5 text-xs tabular-nums text-[#303431]/75">
                                  {formatINR(product.priceINR)}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Page-Turning Controls */}
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleStepDispatch(-1)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:text-[#9E8249] transition-colors whitespace-nowrap"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Previous Dispatch
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStepDispatch(1)}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:text-[#9E8249] transition-colors whitespace-nowrap"
                    >
                      Next Dispatch
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Right Broadsheet Contents Rail (4 columns) */}
            <aside className="lg:col-span-4 lg:border-l lg:border-[#303431]/15 lg:pl-8">
              <div className="flex items-center justify-between border-b border-[#303431]/15 pb-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#123F3A]">
                  Dispatches Index
                </h2>
                <span className="text-xs tabular-nums text-[#9E8249]">
                  {filteredEntries.length} Stories
                </span>
              </div>

              <div className="divide-y divide-[#303431]/12">
                {filteredEntries.map((entry, idx) => {
                  const isActive = entry.slug === activeEntry.slug;
                  return (
                    <button
                      key={entry.slug}
                      type="button"
                      onClick={() => handleSelectEntry(entry.slug)}
                      className={`group flex w-full items-start gap-4 py-4 text-left transition-colors ${
                        isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="h-20 w-15 shrink-0 overflow-hidden border border-[#303431]/15 bg-[#E8E5D9]">
                        <SafeImage
                          src={entry.coverImage}
                          alt={entry.title}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[11px] text-[#9E8249]">
                          <span className="tabular-nums font-semibold">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{entry.kicker}</span>
                        </div>
                        <h3
                          className={`mt-1 font-display text-lg leading-snug transition-colors ${
                            isActive
                              ? 'text-[#123F3A] underline decoration-[#C3A66B] underline-offset-4'
                              : 'text-[#303431] group-hover:text-[#123F3A]'
                          }`}
                        >
                          {entry.title}
                        </h3>
                        <p className="mt-1 text-[11px] text-[#303431]/60">
                          {entry.date} · {entry.readTime}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Dark Monsoon & Courtyard Lookbook Salon */}
      <section className="bg-[#0C2B27] py-12 text-[#E8E5D9] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8E5D9]/15 pb-5 sm:pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C3A66B]">
                Autumn 2026 Lookbook Salon
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#E8E5D9] sm:text-4xl">
                Curated Campaign Plates
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#C3A66B] hover:text-[#FFE3A3] transition-colors whitespace-nowrap"
            >
              Shop Complete Catalogue
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Active Full-Height 3:4 Portrait Plate */}
            <div className="lg:col-span-5 mx-auto w-full max-w-md lg:max-w-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlate.id}
                  initial={prefersReduced ? false : {opacity: 0}}
                  animate={{opacity: 1}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0}}
                  transition={{duration: 0.2}}
                  className="border border-[#C3A66B]/30 bg-[#123F3A] p-2 sm:p-2.5"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#0C2B27]">
                    <SafeImage
                      src={activePlate.image}
                      alt={activePlate.caption}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Plate Companion, Provenance Spec & 6-Plate Film Strip */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#C3A66B]">
                  <span className="font-semibold tabular-nums">{activePlate.plateCode}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activePlate.setting}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#E8E5D9]">
                  {activePlate.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 max-w-xl text-sm leading-relaxed text-[#E8E5D9]/82 sm:text-base">
                  {activePlate.stylingNote}
                </p>
              </div>

              {activePlateProduct && (
                <>
                  <Link
                    to={`/product/${activePlateProduct.slug}`}
                    className="flex items-center justify-between gap-3 sm:gap-4 border border-[#C3A66B]/30 bg-[#123F3A] p-3 sm:p-3.5 hover:border-[#FFE3A3] transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="h-18 w-14 sm:h-20 sm:w-15 shrink-0 overflow-hidden bg-[#F5F3EC] border border-[#E8E5D9]/15">
                        <SafeImage
                          src={activePlateProduct.images[0]}
                          alt={activePlateProduct.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#C3A66B] truncate">
                          Featured in Plate · {activePlateProduct.collectionName}
                        </p>
                        <p className="mt-0.5 font-display text-base sm:text-lg font-medium text-[#E8E5D9] truncate">
                          {activePlateProduct.name}
                        </p>
                        <p className="mt-0.5 text-xs sm:text-sm font-medium tabular-nums text-[#FFE3A3]">
                          {formatINR(activePlateProduct.priceINR)}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#FFE3A3] whitespace-nowrap shrink-0">
                      Shop<span className="hidden sm:inline"> Saree</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>

                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-y border-[#E8E5D9]/15 py-3.5 sm:py-4">
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Fabric
                      </dt>
                      <dd className="mt-1 text-xs font-medium text-[#E8E5D9]">
                        {activePlateProduct.fabric}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Cluster Origin
                      </dt>
                      <dd className="mt-1 text-xs font-medium text-[#E8E5D9]">
                        {activePlateProduct.artisanOrigin}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-[10px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Loom Hours
                      </dt>
                      <dd className="mt-1 text-xs font-medium tabular-nums text-[#FFE3A3]">
                        {activePlateProduct.craftHours} hrs
                      </dd>
                    </div>
                  </dl>
                </>
              )}

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E8E5D9]/65">
                  Select Lookbook Plate
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {LOOKBOOK_GALLERY.map((plate) => {
                    const isSelected = plate.id === activePlate.id;
                    return (
                      <button
                        key={plate.id}
                        type="button"
                        onClick={() => setActivePlateId(plate.id)}
                        className={`group text-left border p-1 transition-colors ${
                          isSelected
                            ? 'border-[#C3A66B] bg-[#123F3A]'
                            : 'border-[#E8E5D9]/15 bg-[#0C2B27] hover:border-[#C3A66B]/60'
                        }`}
                      >
                        <div className="aspect-[3/4] w-full overflow-hidden bg-[#123F3A]">
                          <SafeImage
                            src={plate.image}
                            alt={plate.caption}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                          />
                        </div>
                        <p className="mt-1.5 px-0.5 text-[11px] font-medium text-[#FFE3A3] truncate">
                          {plate.plateCode}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
