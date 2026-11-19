import React, {useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {SlidersHorizontal, X} from 'lucide-react';
import {COLLECTIONS, PRODUCTS} from '../data/catalog';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {ProductCard} from '../components/ProductCard';
import {Breadcrumbs} from '../components/Breadcrumbs';

type SortOption = 'popularity' | 'newest' | 'price-asc' | 'price-desc';
type PriceRange = 'all' | 'under-6k' | '6k-8k' | '8k-10k';

export function ShopPage() {
  usePageMeta(
    'Shop All Sarees',
    'Browse the complete ZARIYA collection of handwoven Banarasi, Kanjivaram, Chanderi, Organza, and Bridal sarees.'
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCollection = searchParams.get('collection') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);

  useEffect(() => {
    const qParam = searchParams.get('q');
    const cParam = searchParams.get('collection');
    if (qParam !== null) setSearchQuery(qParam);
    if (cParam !== null) setSelectedCollection(cParam);
  }, [searchParams]);
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fabrics = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.fabric))), []);
  const colors = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.color))), []);
  const occasions = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.occasion))), []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (q) {
        const haystack = `${p.name} ${p.collectionName} ${p.fabric} ${p.weave} ${p.color} ${p.occasion} ${p.artisanOrigin}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selectedCollection !== 'all' && p.collectionSlug !== selectedCollection) return false;
      if (selectedFabric !== 'all' && p.fabric !== selectedFabric) return false;
      if (selectedColor !== 'all' && p.color !== selectedColor) return false;
      if (selectedOccasion !== 'all' && p.occasion !== selectedOccasion) return false;
      if (priceRange === 'under-6k' && p.priceINR >= 6000) return false;
      if (priceRange === '6k-8k' && (p.priceINR < 6000 || p.priceINR > 8000)) return false;
      if (priceRange === '8k-10k' && p.priceINR <= 8000) return false;
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'newest') return b.createdAt.localeCompare(a.createdAt);
      return b.popularity - a.popularity;
    });
  }, [
    searchQuery,
    selectedCollection,
    selectedFabric,
    selectedColor,
    selectedOccasion,
    priceRange,
    sortBy,
  ]);

  const activeFilterCount = [
    searchQuery.trim() !== '',
    selectedCollection !== 'all',
    selectedFabric !== 'all',
    selectedColor !== 'all',
    selectedOccasion !== 'all',
    priceRange !== 'all',
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCollection('all');
    setSelectedFabric('all');
    setSelectedColor('all');
    setSelectedOccasion('all');
    setPriceRange('all');
    setSearchParams({});
  };

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="catalog-search" className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Keyword Search
        </label>
        <input
          id="catalog-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Weave, shade, or saree name..."
          className="mt-2 w-full border border-[#303431]/20 bg-white/70 px-3 py-2 text-sm text-[#303431] focus:border-[#123F3A] focus:outline-none"
        />
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Collection
        </span>
        <div className="mt-2.5 flex flex-col gap-1.5 text-sm">
          <button
            type="button"
            onClick={() => setSelectedCollection('all')}
            className={`text-left py-1 transition-colors ${
              selectedCollection === 'all' ? 'font-semibold text-[#123F3A]' : 'text-[#303431]/75 hover:text-[#123F3A]'
            }`}
          >
            All Collections
          </button>
          {COLLECTIONS.map((col) => (
            <button
              key={col.slug}
              type="button"
              onClick={() => setSelectedCollection(col.slug)}
              className={`text-left py-1 transition-colors ${
                selectedCollection === col.slug
                  ? 'font-semibold text-[#123F3A]'
                  : 'text-[#303431]/75 hover:text-[#123F3A]'
              }`}
            >
              {col.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Price Range
        </span>
        <div className="mt-2.5 flex flex-col gap-1.5 text-sm">
          {(
            [
              {id: 'all', label: 'All Prices'},
              {id: 'under-6k', label: 'Under ₹6,000'},
              {id: '6k-8k', label: '₹6,000 – ₹8,000'},
              {id: '8k-10k', label: '₹8,000 – ₹10,000'},
            ] as {id: PriceRange; label: string}[]
          ).map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setPriceRange(tier.id)}
              className={`text-left py-1 transition-colors ${
                priceRange === tier.id ? 'font-semibold text-[#123F3A]' : 'text-[#303431]/75 hover:text-[#123F3A]'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-fabric" className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Fabric
        </label>
        <select
          id="filter-fabric"
          value={selectedFabric}
          onChange={(e) => setSelectedFabric(e.target.value)}
          className="mt-2 w-full border border-[#303431]/20 bg-white/70 px-3 py-2 text-sm text-[#303431] focus:border-[#123F3A] focus:outline-none"
        >
          <option value="all">All Fabrics</option>
          {fabrics.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-color" className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Colour Palette
        </label>
        <select
          id="filter-color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="mt-2 w-full border border-[#303431]/20 bg-white/70 px-3 py-2 text-sm text-[#303431] focus:border-[#123F3A] focus:outline-none"
        >
          <option value="all">All Shades</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-occasion" className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
          Occasion
        </label>
        <select
          id="filter-occasion"
          value={selectedOccasion}
          onChange={(e) => setSelectedOccasion(e.target.value)}
          className="mt-2 w-full border border-[#303431]/20 bg-white/70 px-3 py-2 text-sm text-[#303431] focus:border-[#123F3A] focus:outline-none"
        >
          <option value="all">All Occasions</option>
          {occasions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={resetAllFilters}
          className="w-full border border-[#123F3A] py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <PageShell className="bg-[#F5F3EC] py-8 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Shop All Sarees'}]} />

        <div className="mt-5 sm:mt-6 flex flex-col justify-between gap-4 border-b border-[#303431]/12 pb-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-3xl font-normal text-[#123F3A] sm:text-5xl">
              The Complete Saree Archive
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#303431]/75">
              Explore single-loom handwoven sarees across Banarasi, Kanjivaram, Chanderi, Paithani,
              organza, and contemporary tissue silhouettes.
            </p>
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((o) => !o)}
              className="flex items-center gap-2 border border-[#303431]/20 bg-[#E8E5D9]/60 px-3.5 sm:px-4 py-2.5 text-xs font-medium text-[#303431] lg:hidden whitespace-nowrap"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </button>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#303431]/65 whitespace-nowrap">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="border border-[#303431]/20 bg-white/75 px-3 py-2 text-xs font-medium text-[#303431] focus:border-[#123F3A] focus:outline-none"
              >
                <option value="popularity">Popularity</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="mt-6 border border-[#303431]/15 bg-[#E8E5D9]/50 p-6 lg:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-[#303431]/10 pb-3">
              <span className="font-display text-xl text-[#123F3A]">Refine Selection</span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FilterControls />
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 border border-[#303431]/12 bg-[#E8E5D9]/35 p-6">
              <FilterControls />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            <div className="mb-6 flex items-center justify-between text-xs text-[#303431]/70">
              <span className="tabular-nums">
                Showing {filteredProducts.length} of {PRODUCTS.length} sarees
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="font-medium text-[#123F3A] underline underline-offset-4 hover:text-[#9E8249]"
                >
                  Clear filters ({activeFilterCount})
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-[#303431]/12 bg-[#E8E5D9]/40 p-12 text-center">
                <h2 className="font-display text-2xl text-[#123F3A]">
                  No sarees match your selected filters
                </h2>
                <p className="mt-2 text-sm text-[#303431]/75">
                  Try widening your price tier or resetting your weave and shade filters.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="mt-6 bg-[#123F3A] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#E8E5D9] hover:bg-[#0C2B27]"
                >
                  Show All Sarees
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
