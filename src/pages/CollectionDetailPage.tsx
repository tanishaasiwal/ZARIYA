import React, {useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ArrowLeft, ArrowDown} from 'lucide-react';
import {
  ASSETS,
  COLLECTIONS,
  formatINR,
  getCollectionBySlug,
  getProductsForCollection,
} from '../data/catalog';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {ProductCard} from '../components/ProductCard';
import {RajasthaniGateCard, RajasthaniHeroOrnament} from '../components/RajasthaniGateCard';

export function CollectionDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const collection = getCollectionBySlug(slug || '');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'price-asc' | 'price-desc'>(
    'popularity'
  );

  usePageMeta(
    collection ? collection.name : 'Collection',
    collection ? collection.description : 'Explore curated handwoven sarees at ZARIYA.'
  );

  const collectionProducts = useMemo(() => {
    if (!collection) return [];
    const matched = getProductsForCollection(collection.slug);

    return [...matched].sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
      return b.popularity - a.popularity;
    });
  }, [collection, sortBy]);

  if (!collection) {
    return (
      <PageShell className="bg-[#F5F3EC] py-20 text-center px-6">
        <h1 className="font-display text-4xl text-[#123F3A]">Collection Not Found</h1>
        <p className="mt-3 text-sm text-[#303431]/75">
          The requested collection could not be located. Explore all twelve ZARIYA houses below.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-flex items-center gap-2 bg-[#123F3A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#E8E5D9]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Collections
        </Link>
      </PageShell>
    );
  }

  const HERO_PAIR_BY_IMAGE: Record<string, {primary: string; secondary: string}> = {
    [ASSETS.heroPeacock]: {
      primary: ASSETS.detailPeacockDrape,
      secondary: ASSETS.altPeacockPose2,
    },
    [ASSETS.bridalCrimson]: {
      primary: ASSETS.bridalCrimson,
      secondary: ASSETS.altCrimsonPose2,
    },
    [ASSETS.pearlChanderi]: {
      primary: ASSETS.pearlChanderi,
      secondary: ASSETS.altChanderiPose2,
    },
    [ASSETS.sageOrganza]: {
      primary: ASSETS.sageOrganza,
      secondary: ASSETS.altSagePose2,
    },
    [ASSETS.emeraldPaithani]: {
      primary: ASSETS.emeraldPaithani,
      secondary: ASSETS.altPaithaniPose2,
    },
    [ASSETS.charcoalFestive]: {
      primary: ASSETS.charcoalFestive,
      secondary: ASSETS.altCharcoalPose2,
    },
    [ASSETS.champagneTissue]: {
      primary: ASSETS.champagneTissue,
      secondary: ASSETS.altChampagnePose2,
    },
    [ASSETS.patolaNavratna]: {
      primary: ASSETS.patolaNavratna,
      secondary: ASSETS.altPatolaPose2,
    },
    [ASSETS.jamdaniIndigo]: {
      primary: ASSETS.jamdaniIndigo,
      secondary: ASSETS.altJamdaniPose2,
    },
    [ASSETS.mysorePlum]: {
      primary: ASSETS.mysorePlum,
      secondary: ASSETS.altMysorePose2,
    },
    [ASSETS.bandhaniGajri]: {
      primary: ASSETS.bandhaniGajri,
      secondary: ASSETS.altBandhaniPose2,
    },
    [ASSETS.bridalRaniBanarasi]: {
      primary: ASSETS.bridalRaniBanarasi,
      secondary: ASSETS.altRaniPose2,
    },
  };

  const startingPrice = collectionProducts.length
    ? Math.min(...collectionProducts.map((p) => p.priceINR))
    : 0;
  const heroPair = HERO_PAIR_BY_IMAGE[collection.image];
  const primaryHeroVisual = heroPair?.primary || collection.image;
  const secondaryHeroVisual = heroPair?.secondary;

  return (
    <PageShell className="bg-[#F5F3EC]">
      {/* Saree Collection Couture Hero — Rajasthani Palace Gate Design */}
      <section className="relative overflow-hidden border-b border-[#C3A66B]/35 bg-[#0E312D] text-[#F5F3EC]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#C3A66B]/10 blur-3xl"
        />
        <RajasthaniHeroOrnament />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 sm:gap-8 px-5 py-8 sm:px-8 sm:py-11 lg:grid-cols-12 lg:gap-10 lg:py-13">
          {/* Left Narrative & Provenance */}
          <div className="lg:col-span-7">
            <Breadcrumbs
              tone="on-dark"
              items={[
                {label: 'Home', to: '/'},
                {label: 'Collections', to: '/collections'},
                {label: collection.name},
              ]}
            />

            <div className="mt-4 sm:mt-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C3A66B]" aria-hidden="true" />
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#FFE3A3]">
                {collection.origin} · {collectionProducts.length} Handloom Sarees
              </p>
            </div>

            <h1 className="mt-2 sm:mt-2.5 font-display text-[28px] font-normal leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
              {collection.name}
            </h1>

            <p className="mt-1.5 sm:mt-2 font-display text-lg italic text-[#D6B97C] sm:text-2xl">
              {collection.tagline}
            </p>

            <p className="mt-3 sm:mt-4 max-w-xl text-[13px] leading-relaxed text-[#E8E5D9]/85 sm:text-base">
              {collection.description}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#C3A66B]/25 pt-5 sm:grid-cols-3">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                  Craft Lineage
                </span>
                <span className="mt-1 block text-xs font-medium leading-snug text-[#F5F3EC]">
                  {collection.craftNote}
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                  Starting From
                </span>
                <span className="mt-1 block font-display text-xl tabular-nums text-[#FFE3A3]">
                  {formatINR(startingPrice)}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-end">
                <a
                  href="#collection-grid"
                  className="inline-flex items-center gap-2 border border-[#D6B97C]/60 bg-[#D6B97C]/10 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#FFE3A3] hover:bg-[#D6B97C] hover:text-[#0C2B27] transition-colors whitespace-nowrap"
                >
                  Browse Sarees
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Layered Dual Saree Rajasthani Gate Portraits */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative flex items-end justify-center">
              <div className="w-48 sm:w-60 lg:w-64 drop-shadow-[0_16px_28px_rgba(0,0,0,0.45)]">
                <RajasthaniGateCard
                  src={primaryHeroVisual}
                  alt={collection.name}
                  fallbackTitle={collection.name}
                  priority
                />
              </div>

              {secondaryHeroVisual && (
                <div className="-ml-7 mb-4 w-24 sm:-ml-10 sm:mb-5 sm:w-30 lg:w-34 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                  <RajasthaniGateCard
                    src={secondaryHeroVisual}
                    alt={`${collection.name} drape alternate angle`}
                    priority
                    showPillarsDetail={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Collection Switcher & Grid */}
      <section id="collection-grid" className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-4 border-b border-[#303431]/12 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {COLLECTIONS.map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className={`whitespace-nowrap px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium transition-colors ${
                  c.slug === collection.slug
                    ? 'border border-[#123F3A] bg-[#123F3A] text-[#E8E5D9]'
                    : 'border border-[#303431]/12 bg-[#E8E5D9]/35 text-[#303431]/80 hover:border-[#123F3A]/40 hover:text-[#123F3A]'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0 self-stretch sm:self-start lg:self-auto">
            <label htmlFor="collection-sort" className="text-xs text-[#303431]/65">
              Sort
            </label>
            <select
              id="collection-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="border border-[#303431]/20 bg-white/75 px-3 py-2 text-xs font-medium text-[#303431] focus:border-[#123F3A] focus:outline-none"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
