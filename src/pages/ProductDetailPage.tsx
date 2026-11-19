import React, {useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Check, ChevronDown, Heart, Minus, Plus, SearchCheck, Truck, ZoomIn} from 'lucide-react';
import {formatINR, getProductById, getProductBySlug, PRODUCTS} from '../data/catalog';
import {CartItem} from '../types';
import {useStore} from '../context/StoreContext';
import {PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {ProductCard} from '../components/ProductCard';
import {SafeImage} from '../components/SafeImage';

export function ProductDetailPage() {
  const {slug} = useParams<{slug: string}>();
  const product = getProductBySlug(slug || '');
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    recentlyViewed,
    recordRecentlyViewed,
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({x: 50, y: 50});
  const [quantity, setQuantity] = useState(1);
  const [blouseOption, setBlouseOption] = useState<CartItem['blouseOption']>(
    'Unstitched Blouse Included'
  );
  const [openAccordion, setOpenAccordion] = useState<'weave' | 'blouse' | 'care'>('weave');
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{valid: boolean; message: string} | null>(null);

  usePageMeta(
    product ? product.name : 'Saree Details',
    product ? product.description : 'Handwoven luxury saree details at ZARIYA.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
    setPincodeResult(null);
    if (product) {
      recordRecentlyViewed(product.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        (p.collectionSlug === product.collectionSlug || p.occasion === product.occasion)
    ).slice(0, 3);
  }, [product]);

  const recentProducts = useMemo(() => {
    if (!product) return [];
    return recentlyViewed
      .filter((id) => id !== product.id)
      .map((id) => getProductById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, 3);
  }, [recentlyViewed, product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({x, y});
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(clean)) {
      setPincodeResult({
        valid: false,
        message: 'Please enter a valid 6-digit Indian delivery pincode (e.g., 400001).',
      });
      return;
    }
    const firstDigit = clean[0];
    const isMetro = ['1', '4', '5', '6', '7'].includes(firstDigit);
    const windowText =
      blouseOption === 'Complimentary Custom Tailoring'
        ? '10–12 business days (includes custom blouse tailoring)'
        : isMetro
        ? '2–4 business days via insured Blue Dart Air Express'
        : '4–6 business days via insured courier';
    setPincodeResult({
      valid: true,
      message: `Deliverable to ${clean}: Complimentary insured delivery in ${windowText}. Cash on Delivery & Easy Exchange available.`,
    });
  };

  if (!product) {
    return (
      <PageShell className="bg-[#F5F3EC] py-20 text-center px-6">
        <h1 className="font-display text-4xl text-[#123F3A]">Saree Not Found</h1>
        <p className="mt-3 text-sm text-[#303431]/75">
          This piece may have moved to our archival gallery.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-[#123F3A] px-7 py-3 text-xs font-medium uppercase tracking-[0.14em] text-[#E8E5D9]"
        >
          Browse Shop All
        </Link>
      </PageShell>
    );
  }

  const saved = isWishlisted(product.id);

  return (
    <PageShell className="bg-[#F5F3EC] py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs
          items={[
            {label: 'Home', to: '/'},
            {label: 'Collections', to: '/collections'},
            {label: product.collectionName, to: `/collections/${product.collectionSlug}`},
            {label: product.name},
          ]}
        />

        {/* Contiguous Gallery + Purchase Module */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Left: Interactive Gallery with Zoom */}
          <div className="lg:col-span-7 flex flex-col-reverse gap-3 sm:gap-4 sm:flex-row">
            <div className="grid grid-cols-3 gap-2.5 sm:flex sm:flex-col sm:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`View angle ${idx + 1}`}
                  className={`aspect-[3/4] w-full overflow-hidden border transition-all ${
                    selectedImage === idx
                      ? 'border-[#123F3A] ring-1 ring-[#123F3A]'
                      : 'border-[#303431]/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 overflow-hidden bg-[#E8E5D9]">
              <div
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomed((z) => !z)}
                className="relative aspect-[3/4] w-full cursor-zoom-in overflow-hidden"
              >
                <SafeImage
                  src={product.images[selectedImage] || product.images[0]}
                  alt={`${product.name} — ${product.subtitle}`}
                  fallbackTitle={product.name}
                  priority
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                          transform: 'scale(1.65)',
                        }
                      : undefined
                  }
                  className="h-full w-full object-cover object-top transition-transform duration-200 ease-out"
                />
              </div>
              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#F5F3EC]/90 px-3 py-1.5 text-[11px] font-medium text-[#303431]">
                <ZoomIn className="h-3.5 w-3.5 text-[#123F3A]" />
                <span>{isZoomed ? 'Click or move away to reset' : 'Hover or tap to inspect weave'}</span>
              </div>
            </div>
          </div>

          {/* Right: Sticky Contiguous Purchase Module */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9E8249]">
                {product.collectionName} · {product.artisanOrigin}
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium leading-tight text-[#123F3A] sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1.5 text-sm text-[#303431]/75">{product.subtitle}</p>

              <div className="mt-4 flex items-baseline gap-3 border-b border-[#303431]/12 pb-5">
                <span className="font-display text-3xl font-medium tabular-nums text-[#303431]">
                  {formatINR(product.priceINR)}
                </span>
                <span className="text-xs text-[#303431]/60">Inclusive of all taxes & muslin wrap</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#303431]/85">{product.description}</p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 border-y border-[#303431]/12 py-4 text-xs">
              <div>
                <span className="text-[#303431]/55">Fabric</span>
                <p className="mt-0.5 font-medium text-[#303431]">{product.fabric}</p>
              </div>
              <div>
                <span className="text-[#303431]/55">Colour Shade</span>
                <div className="mt-0.5 flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-3 w-3 border border-[#303431]/20"
                    style={{backgroundColor: product.colorHex}}
                  />
                  <span className="font-medium text-[#303431]">{product.color}</span>
                </div>
              </div>
              <div>
                <span className="text-[#303431]/55">Craft Investment</span>
                <p className="mt-0.5 font-medium tabular-nums text-[#303431]">
                  {product.craftHours} Artisan Hours
                </p>
              </div>
              <div>
                <span className="text-[#303431]/55">Occasion</span>
                <p className="mt-0.5 font-medium text-[#303431]">{product.occasion}</p>
              </div>
            </div>

            {/* Blouse Option */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#303431]/75">
                Blouse Tailoring Option
              </span>
              <div className="mt-2.5 grid grid-cols-1 gap-2.5">
                {(
                  [
                    'Unstitched Blouse Included',
                    'Complimentary Custom Tailoring',
                  ] as CartItem['blouseOption'][]
                ).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBlouseOption(option)}
                    className={`flex items-center justify-between border px-4 py-3 text-left text-xs font-medium transition-colors ${
                      blouseOption === option
                        ? 'border-[#123F3A] bg-[#123F3A]/8 text-[#123F3A]'
                        : 'border-[#303431]/20 text-[#303431]/80 hover:border-[#303431]/40'
                    }`}
                  >
                    <span>{option}</span>
                    {blouseOption === option && <Check className="h-3.5 w-3.5 text-[#123F3A]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + CTAs */}
            <div className="space-y-3">
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
                <div className="flex items-center border border-[#303431]/25 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-11 sm:h-12 w-10 sm:w-11 items-center justify-center text-[#303431] hover:bg-[#E8E5D9]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-9 sm:w-10 text-center text-sm font-medium tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-11 sm:h-12 w-10 sm:w-11 items-center justify-center text-[#303431] hover:bg-[#E8E5D9]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product.id, quantity, blouseOption, true)}
                  className="order-last sm:order-none basis-full sm:basis-auto flex-1 bg-[#123F3A] h-12 px-5 sm:px-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
                >
                  Add to Bag — {formatINR(product.priceINR * quantity)}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`ml-auto sm:ml-0 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center border transition-colors ${
                    saved
                      ? 'border-[#123F3A] bg-[#123F3A] text-[#E8E5D9]'
                      : 'border-[#303431]/25 text-[#303431] hover:border-[#123F3A]'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Delivery Availability / Pincode UI */}
            <div className="border border-[#303431]/15 bg-[#E8E5D9]/45 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A]">
                <Truck className="h-4 w-4 text-[#9E8249]" />
                <span>Check Delivery Availability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="mt-3 flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit pincode (e.g. 400001)"
                  aria-label="Delivery pincode"
                  className="flex-1 border border-[#303431]/20 bg-white/80 px-3 py-2 text-xs text-[#303431] focus:border-[#123F3A] focus:outline-none tabular-nums"
                />
                <button
                  type="submit"
                  className="border border-[#123F3A] px-4 py-2 text-xs font-medium text-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors whitespace-nowrap"
                >
                  Check
                </button>
              </form>
              {pincodeResult && (
                <p
                  className={`mt-2.5 flex items-start gap-2 text-xs leading-relaxed ${
                    pincodeResult.valid ? 'text-[#123F3A]' : 'text-[#7A1F24]'
                  }`}
                >
                  {pincodeResult.valid && <SearchCheck className="h-4 w-4 shrink-0 mt-0.5" />}
                  <span>{pincodeResult.message}</span>
                </p>
              )}
            </div>

            {/* Accordion Specifications */}
            <div className="divide-y divide-[#303431]/12 border-y border-[#303431]/12">
              {[
                {
                  id: 'weave' as const,
                  title: 'Weave, Dimensions & Provenance',
                  body: `${product.weave}. ${product.dimensions}. Handcrafted in ${product.artisanOrigin} across ${product.craftHours} loom hours.`,
                },
                {
                  id: 'blouse' as const,
                  title: 'Blouse Information & Fall-Pico',
                  body: `${product.blouseInfo} All sarees receive complimentary hand-stitched fall and pico finishing prior to dispatch.`,
                },
                {
                  id: 'care' as const,
                  title: 'Garment Care & Muslin Storage',
                  body: product.careInstructions,
                },
              ].map((section) => {
                const isOpen = openAccordion === section.id;
                return (
                  <div key={section.id}>
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(section.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#303431]"
                    >
                      <span>{section.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm leading-relaxed text-[#303431]/80">
                        {section.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 sm:mt-20 border-t border-[#303431]/12 pt-10 sm:pt-14">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#123F3A]">
              Complementary Weaves
            </h2>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed Products */}
        {recentProducts.length > 0 && (
          <section className="mt-12 sm:mt-16 border-t border-[#303431]/12 pt-10 sm:pt-14">
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#123F3A]">
              Recently Viewed
            </h2>
            <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3">
              {recentProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
