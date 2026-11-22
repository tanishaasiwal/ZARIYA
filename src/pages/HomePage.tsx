import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowRight, Check, ChevronLeft, ChevronRight} from 'lucide-react';
import {ASSETS, COLLECTIONS, PRODUCTS, formatINR} from '../data/catalog';
import {TESTIMONIALS} from '../data/editorial';
import {useStore} from '../context/StoreContext';
import {FadeInSection, PageShell, usePageMeta} from '../components/MotionPrimitives';
import {ProductCard} from '../components/ProductCard';
import {SafeImage} from '../components/SafeImage';

type ShowcaseTab = 'new' | 'bestsellers' | 'featured';

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  kicker: string;
  headline: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel: string;
  secondaryTo: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'banarasi-heritage',
    image: ASSETS.heroPeacockMoody4k,
    alt: 'Model wearing the ZARIYA Mayur Peacock Katan Banarasi Silk Saree in a lantern-lit dark sandstone heritage colonnade',
    kicker: 'Autumn Heritage Couture · Varanasi',
    headline: 'The Art of Tradition, Reimagined.',
    description:
      'Heirloom Banarasi, Kanjivaram, Chanderi, and sheer organza sarees woven on living handlooms—tailored with quiet architectural grace.',
    primaryLabel: 'Explore Sarees',
    primaryTo: '/shop',
    secondaryLabel: 'The Bridal Edit',
    secondaryTo: '/bridal',
  },
  {
    id: 'bridal-kanjivaram',
    image: ASSETS.heroBridal4k,
    alt: 'Indian bride wearing deep sindoori crimson and antique gold Kanjivaram bridal saree in a carved haveli courtyard',
    kicker: 'Bridal Heritage Couture · Kanchipuram',
    headline: 'Woven Crimson for Sacred Vows.',
    description:
      'Heirloom three-shuttle korvai Kanjivaram silk in deep sindoori crimson and temple zari—handwoven to endure across generations.',
    primaryLabel: 'Shop Bridal',
    primaryTo: '/bridal',
    secondaryLabel: 'Sindoori Saree',
    secondaryTo: '/product/sindoori-korvai-kanjivaram',
  },
  {
    id: 'sage-organza',
    image: ASSETS.heroSage4k,
    alt: 'Woman draped in muted sage handwoven silk organza saree with botanical antique gold zardozi border',
    kicker: 'Atelier Evening Couture · Silk Organza',
    headline: 'Botanical Zardozi on Sheer Silk.',
    description:
      'Heirloom handloom kora silk organza stitched with antique gold botanical zardozi—crafted for luminous evening grace.',
    primaryLabel: 'Shop Organza',
    primaryTo: '/collections/organza-sarees',
    secondaryLabel: 'Gulbagh Saree',
    secondaryTo: '/product/gulbagh-sage-zardozi-organza',
  },
  {
    id: 'courtyard-ivory',
    image: ASSETS.heroCourtyard4k,
    alt: 'Woman walking through a sunlit stone colonnade in a flowing pearl-ivory and antique gold handloom silk saree',
    kicker: 'Autumn Lookbook Couture · Courtyard',
    headline: 'Luminous Ivory in Morning Light.',
    description:
      'Heirloom ivory Katan and feather-light Chanderi silk woven with antique gold ashrafi motifs—tailored for sunlit celebrations.',
    primaryLabel: 'Shop Chanderi',
    primaryTo: '/collections/chanderi-sarees',
    secondaryLabel: 'Open Lookbook',
    secondaryTo: '/journal',
  },
];

interface CraftspersonGuild {
  id: string;
  tabLabel: string;
  cluster: string;
  karigarRole: string;
  headline: string;
  story: string;
  loomHours: string;
  technique: string;
  material: string;
  image: string;
  imageAlt: string;
  collectionTo: string;
  collectionLabel: string;
}

const CRAFTSPERSON_GUILDS: CraftspersonGuild[] = [
  {
    id: 'banarasi-kadwa',
    tabLabel: '01. Madanpura Kadwa',
    cluster: 'Varanasi, Uttar Pradesh',
    karigarRole: 'Master Pit-Loom Weavers',
    headline: 'Two hundred eighty hours of individual tilli weaving.',
    story:
      'In Madanpura’s quiet pit-loom workshops, two master karigars sit side by side—passing miniature brass zari spools motif by motif through deep peacock Katan silk so the reverse stays crisp and snag-free.',
    loomHours: '240–320 Hours per Saree',
    technique: 'Two-Shuttle Kadwa Tilli Brocade',
    material: 'Pure Twisted Mulberry Katan & Tested Zari',
    image: ASSETS.craftspersonBanarasi,
    imageAlt:
      'Senior Indian master weaver seated at a wooden pit loom in Varanasi weaving deep peacock-teal Katan silk and antique gold zari',
    collectionTo: '/collections/banarasi-silk',
    collectionLabel: 'Explore Banarasi Silk',
  },
  {
    id: 'kanjivaram-korvai',
    tabLabel: '02. Kanchipuram Korvai',
    cluster: 'Kanchipuram, Tamil Nadu',
    karigarRole: 'Three-Shuttle Korvai Guild',
    headline: 'Contrasting borders locked stitch by stitch on teak.',
    story:
      'A true Kanjivaram border is never stitched on afterwards. At each throw of the shuttle, the primary weaver and assistant manually lock temple-gold threads into three-ply sindoori mulberry warp by hand.',
    loomHours: '280–360 Hours per Saree',
    technique: 'Three-Shuttle Interlocking Korvai',
    material: 'High-Twist Three-Ply Mulberry Silk',
    image: ASSETS.craftspersonKanchipuram,
    imageAlt:
      'Master Kanchipuram handloom weaver interlocking crimson silk and temple-gold zari with a wooden korvai shuttle',
    collectionTo: '/collections/kanjivaram-silk',
    collectionLabel: 'Explore Kanjivaram Silk',
  },
  {
    id: 'zardozi-adda',
    tabLabel: '03. Aari & Zardozi',
    cluster: 'Jaipur & Lucknow',
    karigarRole: 'Adda Botanical Artisans',
    headline: 'Soft-burnished brass kasab drawn over sheer organza.',
    story:
      'Stretched taut on seasoned teak adda frames, airy kora silk organza is hand-stitched leaf by leaf using fine aari hooks, antique dabka coils, and matte metallic silk twist.',
    loomHours: '140–190 Hours per Saree',
    technique: 'Hand-Pulled Aari & Kasab Zardozi',
    material: 'Unbleached Kora Silk & Burnished Brass Thread',
    image: ASSETS.craftspersonZardozi,
    imageAlt:
      'Master zardozi artisan stitching botanical antique gold needlework onto muted sage silk organza on a wooden adda frame',
    collectionTo: '/collections/organza-sarees',
    collectionLabel: 'Explore Organza Silk',
  },
];

interface LookbookPlate {
  id: string;
  plateNumber: string;
  shortTitle: string;
  location: string;
  headline: string;
  editorialNote: string;
  stylingNote: string;
  image: string;
  imageAlt: string;
  productId: string;
}

const LOOKBOOK_PLATES: LookbookPlate[] = [
  {
    id: 'plate-verandah',
    plateNumber: 'Plate 01 of 03',
    shortTitle: 'Verandah',
    location: 'Jaipur Sandstone Colonnade',
    headline: 'Deep Peacock & Sandstone Light',
    editorialNote:
      'Photographed as late afternoon sun turns carved Jaipur stone to warm ochre, allowing soft-burnished antique brass rosettes to catch across deep peacock Katan silk.',
    stylingNote:
      'Style with an elbow-length silk brocade blouse, uncut polki ear studs, and fresh jasmine woven into a low chignon.',
    image: ASSETS.lookbookPalaceVerandah,
    imageAlt:
      'Editorial lookbook portrait in a sunlit Jaipur sandstone verandah wearing the Mayur Peacock Katan Banarasi saree',
    productId: 'zar-001',
  },
  {
    id: 'plate-courtyard',
    plateNumber: 'Plate 02 of 03',
    shortTitle: 'Courtyard',
    location: 'Dawn Courtyard Study',
    headline: 'Ivory Stillness for Morning Vows',
    editorialNote:
      'Captured in tranquil early light where translucent pearl-ivory silk breathes naturally—offering ceremonial presence free from heavy synthetic glare.',
    stylingNote:
      'Keep waist pleats slightly wider to frame the continuous floral kadwa jaal and hand-finished antique border.',
    image: ASSETS.lookbookCourtyard,
    imageAlt:
      'Woman draped in pearl-ivory and antique gold silk saree walking through a sunlit stone colonnade',
    productId: 'zar-008',
  },
  {
    id: 'plate-salon',
    plateNumber: 'Plate 03 of 03',
    shortTitle: 'Twilight Salon',
    location: 'Teakwood Heritage Salon',
    headline: 'Botanical Zardozi at Dusk',
    editorialNote:
      'Gossamer sage organza grounded inside dark teak shuttered rooms—balancing sculptural shoulder pleats with delicate hand-worked botanical vines along the pallu.',
    stylingNote:
      'Pair with a tailored tonal raw-silk square-neck blouse and slim antique gold bangles for intimate evening soirées.',
    image: ASSETS.lookbookTwilightOrganza,
    imageAlt:
      'Editorial portrait inside a twilight teakwood heritage salon draped in a muted sage silk organza saree with botanical zardozi',
    productId: 'zar-004',
  },
];

export function HomePage() {
  usePageMeta(
    'ZARIYA — The Art of Tradition, Reimagined',
    'Handwoven Banarasi, Kanjivaram, Chanderi, Organza, and Bridal luxury sarees crafted with master Indian weavers.'
  );

  const [activeTab, setActiveTab] = useState<ShowcaseTab>('new');
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeGuildIdx, setActiveGuildIdx] = useState(0);
  const [activePlateIdx, setActivePlateIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const {newsletterSubscribed, subscribeNewsletter} = useStore();
  const prefersReduced = useReducedMotion();
  const collectionScrollRef = useRef<HTMLDivElement>(null);

  const scrollCollections = (direction: 'left' | 'right') => {
    const el = collectionScrollRef.current;
    if (!el) return;
    const distance = Math.max(240, Math.round(el.clientWidth * 0.72));
    el.scrollBy({left: direction === 'right' ? distance : -distance, behavior: 'smooth'});
  };

  useEffect(() => {
    if (prefersReduced) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [prefersReduced]);

  const currentSlide = HERO_SLIDES[activeSlide];
  const currentGuild = CRAFTSPERSON_GUILDS[activeGuildIdx];
  const currentPlate = LOOKBOOK_PLATES[activePlateIdx];
  const lookbookProduct = PRODUCTS.find((p) => p.id === currentPlate.productId) ?? PRODUCTS[0];

  const showcaseProducts = [...PRODUCTS]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((p) => {
      if (activeTab === 'new') return p.isNew;
      if (activeTab === 'bestsellers') return p.isBestseller;
      return p.isFeatured;
    })
    .slice(0, 8);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    subscribeNewsletter(trimmed);
    setNewsletterEmail('');
  };

  return (
    <PageShell>
      {/* 1. Crisp HD Full-Background 4-Slide Saree Hero Carousel */}
      <section
        aria-roledescription="carousel"
        aria-label="Featured ZARIYA collections"
        className="relative min-h-[520px] sm:h-[540px] lg:h-[calc(100svh-64px)] lg:max-h-[680px] w-full overflow-hidden bg-[#123F3A] flex items-end sm:items-center"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            aria-hidden={idx !== activeSlide}
            style={{
              opacity: idx === activeSlide ? 1 : 0,
              transition: prefersReduced ? 'none' : 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute inset-0 h-full w-full pointer-events-none"
          >
            <SafeImage
              src={slide.image}
              alt={slide.alt}
              fallbackTitle={slide.headline}
              priority
              className="h-full w-full object-cover object-[50%_22%]"
            />
          </div>
        ))}

        {/* Responsive legibility scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/78 via-black/48 to-black/20 sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[64%] lg:w-[54%] sm:bg-gradient-to-r sm:from-black/62 sm:via-black/28 sm:to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-20 pb-12 sm:px-8 sm:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={prefersReduced ? false : {opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -4}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
              className="max-w-md sm:max-w-xl min-h-[190px] sm:min-h-0 flex flex-col justify-end"
            >
              <p className="text-[10px] sm:text-xs lg:text-[13px] font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#FFE3A3] [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
                {currentSlide.kicker}
              </p>

              <h1 className="mt-1.5 sm:mt-2 font-display text-[26px] font-normal leading-[1.1] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.65)] sm:text-5xl sm:leading-[1.08] lg:text-[60px] [text-wrap:balance]">
                {currentSlide.headline}
              </h1>

              <p className="mt-2 sm:mt-3 max-w-lg text-[13px] leading-snug text-[#F5F3EC]/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] sm:text-base sm:leading-relaxed lg:text-[17px]">
                {currentSlide.description}
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  to={currentSlide.primaryTo}
                  className="inline-flex items-center gap-2 bg-[#D6B97C] px-4 py-2.5 sm:px-7 sm:py-3.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#0C2B27] shadow-md hover:bg-[#F5F3EC] transition-colors whitespace-nowrap"
                >
                  {currentSlide.primaryLabel}
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
                <Link
                  to={currentSlide.secondaryTo}
                  className="inline-flex items-center gap-2 border border-white/75 bg-black/25 backdrop-blur-xs px-4 py-2.5 sm:px-6 sm:py-3.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white hover:border-[#FFE3A3] hover:text-[#FFE3A3] transition-colors whitespace-nowrap"
                >
                  {currentSlide.secondaryLabel}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 2. The House of ZARIYA — Editorial Atelier Spread */}
      <section className="border-b border-[#303431]/12 bg-[#F5F3EC] py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          {/* Left Narrative & House Pillars */}
          <FadeInSection className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C3A66B]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E8249]">
                The House of ZARIYA
              </p>
            </div>

            <h2 className="mt-3 sm:mt-4 font-display text-3xl font-normal leading-[1.12] text-[#123F3A] sm:text-4xl lg:text-5xl [text-wrap:balance]">
              Every thread remembers the hand that wove it.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#303431]/82">
              Born from a commitment to preserve India’s living handloom guilds, ZARIYA partners
              directly with master weavers across Varanasi, Kanchipuram, Patan, Bhuj, Phulia,
              Mysuru, Chanderi, and Yeola—uniting century-old loom geometry with a quiet modern
              palette of deep peacock, muted sage, pearl, and burnished antique brass.
            </p>

            {/* Three Architectural House Pillars */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#303431]/12 pt-6 sm:grid-cols-3">
              <div className="border-l-2 border-[#C3A66B] pl-3.5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9E8249]">
                  01 · Provenance
                </span>
                <p className="mt-1 font-display text-lg font-medium text-[#123F3A]">
                  Direct Loom Guilds
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[#303431]/70">
                  12 regional weaves, zero middlemen
                </p>
              </div>

              <div className="border-l-2 border-[#C3A66B] pl-3.5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9E8249]">
                  02 · Materiality
                </span>
                <p className="mt-1 font-display text-lg font-medium text-[#123F3A]">
                  Pure Silk &amp; Zari
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[#303431]/70">
                  Tested mulberry &amp; soft brass thread
                </p>
              </div>

              <div className="border-l-2 border-[#C3A66B] pl-3.5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9E8249]">
                  03 · Atelier Fit
                </span>
                <p className="mt-1 font-display text-lg font-medium text-[#123F3A]">
                  Bespoke Tailoring
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[#303431]/70">
                  Complimentary custom blouse service
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/heritage"
                className="inline-flex items-center gap-2 bg-[#123F3A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
              >
                Explore Our Heritage
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 border-b border-[#123F3A]/40 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:border-[#9E8249] hover:text-[#9E8249] transition-colors whitespace-nowrap"
              >
                Browse 12 Houses
              </Link>
            </div>
          </FadeInSection>

          {/* Right Layered Atelier Craft Composition */}
          <FadeInSection delay={0.08} className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="grid grid-cols-12 items-end gap-3 sm:gap-5">
                {/* Main Macro Zari & Silk Frame */}
                <div className="col-span-7 overflow-hidden border border-[#C3A66B]/35 bg-[#123F3A] p-1.5 sm:p-2 shadow-xl">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <SafeImage
                      src={ASSETS.zariMacro}
                      alt="Close-up macro texture of ZARIYA handwoven silk and antique burnished brass zari"
                      fallbackTitle="Tested Pure Silk & Burnished Zari"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Companion Saree Lookbook & Atelier Note Stack */}
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                  <div className="overflow-hidden border border-[#303431]/15 bg-[#E8E5D9] p-1 sm:p-1.5 shadow-lg">
                    <div className="aspect-[3/4] w-full overflow-hidden">
                      <SafeImage
                        src={ASSETS.lookbookCourtyard}
                        alt="Woman draped in ZARIYA ivory and gold Katan silk saree in a sunlit stone courtyard"
                        fallbackTitle="ZARIYA Heritage Drape"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="border border-[#C3A66B]/35 bg-[#0C2B27] p-3 sm:p-5 text-[#E8E5D9]">
                    <p className="font-display text-xl sm:text-3xl tabular-nums text-[#FFE3A3]">
                      100%
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#E8E5D9]/80">
                      Silk Mark Handloom Craft
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Shop by Collection — Sculpted Rajasthani Palace Gate (Jharokha) Cards */}
      <section className="bg-[#E8E5D9]/55 py-12 sm:py-16 lg:py-22">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                Curated Weaves
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
                Shop by Collection
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#123F3A] hover:text-[#9E8249] transition-colors whitespace-nowrap"
              >
                All Twelve Collections
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex items-center gap-1.5" aria-label="Scroll collections">
                <button
                  type="button"
                  onClick={() => scrollCollections('left')}
                  aria-label="Scroll collections left"
                  className="flex h-8 w-8 items-center justify-center border border-[#123F3A]/25 bg-[#F5F3EC] text-[#123F3A] hover:border-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCollections('right')}
                  aria-label="Scroll collections right"
                  className="flex h-8 w-8 items-center justify-center border border-[#123F3A]/25 bg-[#F5F3EC] text-[#123F3A] hover:border-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <FadeInSection>
            <div
              ref={collectionScrollRef}
              className="collection-horizontal-scroll mt-8 sm:mt-10 flex gap-3.5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-2"
            >
              {COLLECTIONS.map((collection, idx) => (
                <Link
                  key={collection.slug}
                  to={`/collections/${collection.slug}`}
                  className="group relative block w-[45%] min-w-[152px] max-w-[188px] sm:w-[210px] sm:max-w-none lg:w-[228px] shrink-0 snap-start drop-shadow-[0_10px_22px_rgba(18,63,58,0.16)] transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-[0_18px_32px_rgba(18,63,58,0.26)] focus-visible:outline-none"
                >
                  {/* Entire Card Clipped to the True Rajasthani Gate Silhouette */}
                  <div className="clip-rajasthani-gate relative aspect-[300/380] w-full overflow-hidden bg-[#123F3A]">
                    <SafeImage
                      src={collection.image}
                      alt={`${collection.name} — ${collection.tagline}`}
                      fallbackTitle={collection.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    {/* Deep Emerald Courtyard Gradient behind Bottom Nameplate */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#09211E] via-[#123F3A]/82 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Integrated Rajasthani Gate Details & Gold Filigree Border */}
                    <svg
                      viewBox="0 0 300 380"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                      <defs>
                        <linearGradient
                          id={`palace-gold-${idx}`}
                          x1="0"
                          y1="0"
                          x2="300"
                          y2="380"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#F3DFA7" />
                          <stop offset="45%" stopColor="#C3A66B" />
                          <stop offset="100%" stopColor="#947439" />
                        </linearGradient>
                      </defs>

                      {/* Subtle Dark Emerald Palace Frame Lining Inside the Gate Edge */}
                      <path
                        d="M150 4 Q166 6 178 24 Q198 18 212 38 Q234 34 246 58 Q268 58 276 84 Q290 88 290 108 V356 L298 364 V378 H2 V364 L10 356 V108 Q10 88 24 84 Q32 58 54 58 Q66 34 88 38 Q102 18 122 24 Q134 6 150 4 Z M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                        fill="#123F3A"
                        fillOpacity="0.94"
                      />

                      {/* Outer Burnished Gold Mehrab Gate Molding */}
                      <path
                        d="M150 5 Q165 7 177 24.5 Q197 19 211 38.5 Q233 35 245 58.5 Q267 59 275 84.5 Q289 89 289 108 V356 L297 364 V376.5 H3 V364 L11 356 V108 Q11 89 25 84.5 Q33 59 55 58.5 Q67 35 89 38.5 Q103 19 123 24.5 Q135 7 150 5 Z"
                        fill="none"
                        stroke={`url(#palace-gold-${idx})`}
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                      />

                      {/* Inner Scalloped Gold Zari Arch Trim */}
                      <path
                        d="M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                        fill="none"
                        stroke={`url(#palace-gold-${idx})`}
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />

                      {/* Delicate Inner Beaded Gold Arch Glow */}
                      <path
                        d="M150 23 Q139 24 130 38 Q114 34 102 50 Q85 47 74 66 Q56 66 48 88 Q30 91 30 110 V352 H270 V110 Q270 91 252 88 Q244 66 226 66 Q215 47 198 50 Q186 34 170 38 Q161 24 150 23"
                        fill="none"
                        stroke="#F3DFA7"
                        strokeOpacity="0.42"
                        strokeWidth="0.75"
                      />

                      {/* Kalash Apex Ornament */}
                      <path d="M150 6 L154 12 L150 16.5 L146 12 Z" fill="#F3DFA7" />

                      {/* Pillar Vertical Flutes & Carved Springer Brackets */}
                      <line x1="17" y1="112" x2="17" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
                      <line x1="283" y1="112" x2="283" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
                      <rect x="11" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />
                      <rect x="276" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />

                      {/* Carved Gate Threshold Plinth Step */}
                      <line x1="8" y1="364" x2="292" y2="364" stroke="#C3A66B" strokeOpacity="0.6" strokeWidth="1" />
                    </svg>

                    {/* Integrated Sanctuary Nameplate Inside Lower Gate */}
                    <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-6 text-center sm:px-6 sm:pb-6">
                      <div className="mx-auto mb-1.5 flex items-center justify-center gap-1.5" aria-hidden="true">
                        <span className="h-px w-4 bg-[#C3A66B]/65" />
                        <span className="h-1 w-1 rotate-45 bg-[#F3DFA7]" />
                        <span className="h-px w-4 bg-[#C3A66B]/65" />
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] text-[#EAD298] truncate">
                        {collection.origin}
                      </p>
                      <h3 className="mt-0.5 font-display text-[17px] sm:text-[21px] font-medium text-[#F5F3EC] leading-tight group-hover:text-[#F3DFA7] transition-colors">
                        {collection.name}
                      </h3>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#EAD298]/90">
                        <span>Explore</span>
                        <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 4. New Arrivals, Bestsellers & Featured Designer Sarees */}
      <section className="bg-[#F5F3EC] py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 border-b border-[#303431]/12 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                From the Loom
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
                Curated Atelier Releases
              </h2>
            </div>

            <div className="grid grid-cols-3 sm:inline-flex items-center gap-1 border border-[#303431]/15 bg-[#E8E5D9]/60 p-1 w-full sm:w-auto">
              {(
                [
                  {id: 'new', label: 'New Arrivals'},
                  {id: 'bestsellers', label: 'Bestsellers'},
                  {id: 'featured', label: 'Featured'},
                ] as {id: ShowcaseTab; label: string}[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 sm:px-4 py-2 text-[11px] sm:text-xs font-medium tracking-[0.04em] sm:tracking-[0.06em] transition-colors whitespace-nowrap text-center ${
                    activeTab === tab.id
                      ? 'bg-[#123F3A] text-[#E8E5D9]'
                      : 'text-[#303431]/75 hover:text-[#123F3A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {showcaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 border border-[#123F3A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#123F3A] hover:bg-[#123F3A] hover:text-[#E8E5D9] transition-colors"
            >
              View Complete Catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Master Craftspersons & Living Loom Guilds */}
      <section className="bg-[#123F3A] py-12 text-[#E8E5D9] sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[#E8E5D9]/15 pb-7 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C3A66B]">
                The Craftspersons
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal leading-[1.12] text-[#E8E5D9] sm:text-4xl [text-wrap:balance]">
                Master hands behind every living Indian weave.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Master Craftsperson Guilds"
              className="grid grid-cols-1 sm:grid-cols-3 lg:inline-flex items-center gap-1 border border-[#E8E5D9]/15 bg-[#0C2B27] p-1 w-full lg:w-auto"
            >
              {CRAFTSPERSON_GUILDS.map((guild, index) => {
                const isSelected = activeGuildIdx === index;
                return (
                  <button
                    key={guild.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveGuildIdx(index)}
                    className={`px-3 py-2 text-xs font-medium tracking-[0.04em] transition-colors whitespace-nowrap text-center ${
                      isSelected
                        ? 'bg-[#C3A66B] text-[#0C2B27]'
                        : 'text-[#E8E5D9]/75 hover:text-[#E8E5D9]'
                    }`}
                  >
                    {guild.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Craftsperson Documentary Portrait */}
            <div className="mx-auto w-full max-w-md lg:max-w-none lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGuild.id}
                  initial={prefersReduced ? false : {opacity: 0}}
                  animate={{opacity: 1}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0}}
                  transition={{duration: 0.2}}
                  className="border border-[#C3A66B]/30 bg-[#0C2B27] p-2 sm:p-2.5"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#0C2B27]">
                    <SafeImage
                      src={currentGuild.image}
                      alt={currentGuild.imageAlt}
                      fallbackTitle={currentGuild.karigarRole}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 px-2 pt-3 pb-1 text-xs text-[#E8E5D9]/75">
                    <span className="font-medium text-[#FFE3A3] truncate">
                      {currentGuild.karigarRole}
                    </span>
                    <span className="truncate text-[#E8E5D9]/65">{currentGuild.cluster}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Craftsperson Discipline Narrative & Ledger */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGuild.id}
                  initial={prefersReduced ? false : {opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0, y: -4}}
                  transition={{duration: 0.2}}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#C3A66B]">
                    <span>{currentGuild.cluster}</span>
                    <span aria-hidden="true">·</span>
                    <span>{currentGuild.karigarRole}</span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.18] text-[#E8E5D9] [text-wrap:balance]">
                    {currentGuild.headline}
                  </h3>

                  <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[#E8E5D9]/82 sm:text-base">
                    {currentGuild.story}
                  </p>

                  {/* Hairline Loom Ledger */}
                  <dl className="mt-6 divide-y divide-[#E8E5D9]/15 border-y border-[#E8E5D9]/15">
                    <div className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Crafting Duration
                      </dt>
                      <dd className="font-display text-xl tabular-nums text-[#FFE3A3]">
                        {currentGuild.loomHours}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Loom Architecture
                      </dt>
                      <dd className="text-sm font-medium text-[#E8E5D9]">
                        {currentGuild.technique}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                        Yarn Standard
                      </dt>
                      <dd className="text-sm font-medium text-[#E8E5D9]">
                        {currentGuild.material}
                      </dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <Link
                  to={currentGuild.collectionTo}
                  className="inline-flex items-center gap-2 bg-[#E8E5D9] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#123F3A] hover:bg-[#C3A66B] hover:text-[#0C2B27] transition-colors whitespace-nowrap"
                >
                  {currentGuild.collectionLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/heritage"
                  className="inline-flex items-center gap-2 border-b border-[#C3A66B]/55 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#C3A66B] hover:border-[#FFE3A3] hover:text-[#FFE3A3] transition-colors whitespace-nowrap"
                >
                  Read Craft Lineage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial Lookbook · Autumn 2026 — Traditional Haveli Darbar Edition */}
      <section className="border-t border-[#C3A66B]/30 bg-[#F5F3EC] py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#C3A66B]/30 pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rotate-45 bg-[#C3A66B]" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                  Editorial Lookbook · Autumn 2026
                </p>
              </div>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl [text-wrap:balance]">
                Courtyard Light &amp; Ceremonial Stillness
              </h2>
            </div>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#123F3A] hover:text-[#9E8249] transition-colors whitespace-nowrap shrink-0"
            >
              Open Full Lookbook &amp; Journal
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Large Primary Lookbook Plate — True Rajasthani Palace Gate Silhouette */}
            <div className="mx-auto w-full max-w-[295px] sm:max-w-[355px] lg:max-w-[400px] lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlate.id}
                  initial={prefersReduced ? false : {opacity: 0, scale: 0.985}}
                  animate={{opacity: 1, scale: 1}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0, scale: 0.985}}
                  transition={{duration: 0.24}}
                  className="drop-shadow-[0_14px_28px_rgba(18,63,58,0.2)]"
                >
                  <div className="clip-rajasthani-gate relative aspect-[300/380] w-full overflow-hidden bg-[#123F3A]">
                    <SafeImage
                      src={currentPlate.image}
                      alt={currentPlate.imageAlt}
                      fallbackTitle={currentPlate.headline}
                      className="h-full w-full object-cover object-top"
                    />

                    {/* Deep Emerald Courtyard Gradient for Lower Plaque */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#09211E] via-[#123F3A]/75 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Rajasthani Gate Carved Frame & Gold Filigree Border */}
                    <svg
                      viewBox="0 0 300 380"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                      <defs>
                        <linearGradient id="lookbook-gate-gold" x1="0" y1="0" x2="300" y2="380" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#F3DFA7" />
                          <stop offset="50%" stopColor="#C3A66B" />
                          <stop offset="100%" stopColor="#947439" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M150 4 Q166 6 178 24 Q198 18 212 38 Q234 34 246 58 Q268 58 276 84 Q290 88 290 108 V356 L298 364 V378 H2 V364 L10 356 V108 Q10 88 24 84 Q32 58 54 58 Q66 34 88 38 Q102 18 122 24 Q134 6 150 4 Z M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                        fill="#123F3A"
                        fillOpacity="0.94"
                      />
                      <path
                        d="M150 5 Q165 7 177 24.5 Q197 19 211 38.5 Q233 35 245 58.5 Q267 59 275 84.5 Q289 89 289 108 V356 L297 364 V376.5 H3 V364 L11 356 V108 Q11 89 25 84.5 Q33 59 55 58.5 Q67 35 89 38.5 Q103 19 123 24.5 Q135 7 150 5 Z"
                        fill="none"
                        stroke="url(#lookbook-gate-gold)"
                        strokeWidth="2.6"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                        fill="none"
                        stroke="url(#lookbook-gate-gold)"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path d="M150 6 L154 12 L150 16.5 L146 12 Z" fill="#F3DFA7" />
                      <line x1="17" y1="112" x2="17" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
                      <line x1="283" y1="112" x2="283" y2="352" stroke="#C3A66B" strokeOpacity="0.45" strokeWidth="0.8" />
                      <rect x="11" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />
                      <rect x="276" y="106" width="13" height="6" fill="#C3A66B" fillOpacity="0.35" stroke="#C3A66B" strokeWidth="0.7" />
                      <line x1="8" y1="364" x2="292" y2="364" stroke="#C3A66B" strokeOpacity="0.6" strokeWidth="1" />
                    </svg>

                    {/* Integrated Plate Number & Location Inside Lower Gate */}
                    <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-5 pt-6 text-center">
                      <div className="mx-auto mb-1 flex items-center justify-center gap-1.5" aria-hidden="true">
                        <span className="h-px w-5 bg-[#C3A66B]/65" />
                        <span className="h-1 w-1 rotate-45 bg-[#F3DFA7]" />
                        <span className="h-px w-5 bg-[#C3A66B]/65" />
                      </div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#EAD298] tabular-nums">
                        {currentPlate.plateNumber}
                      </p>
                      <p className="mt-0.5 font-display text-sm sm:text-base italic text-[#F5F3EC] truncate">
                        {currentPlate.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Plate Study, Compact Gate Selector Cards & Companion Saree Folio */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlate.id}
                  initial={prefersReduced ? false : {opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={prefersReduced ? {opacity: 1} : {opacity: 0, y: -4}}
                  transition={{duration: 0.2}}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E8249]">
                    <span className="font-semibold uppercase tracking-[0.14em] tabular-nums">
                      {currentPlate.plateNumber}
                    </span>
                    <span aria-hidden="true">◆</span>
                    <span>{currentPlate.location}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-[#123F3A] [text-wrap:balance]">
                    {currentPlate.headline}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#303431]/82 sm:text-base">
                    {currentPlate.editorialNote}
                  </p>

                  <div className="mt-4 border-l-2 border-[#C3A66B] bg-[#E8E5D9]/55 px-4 py-3 text-xs leading-relaxed text-[#303431]/80 sm:text-sm">
                    <span className="font-semibold text-[#123F3A]">Atelier Styling Note: </span>
                    {currentPlate.stylingNote}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive 3-Plate Compact Rajasthani Gate Selector Cards (Zero Square Box) */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[#C3A66B]" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                    Select Lookbook Plate
                  </p>
                </div>

                <div className="mt-3.5 grid grid-cols-3 gap-3 sm:gap-4 max-w-md">
                  {LOOKBOOK_PLATES.map((plate, index) => {
                    const isActive = activePlateIdx === index;
                    return (
                      <button
                        key={plate.id}
                        type="button"
                        onClick={() => setActivePlateIdx(index)}
                        className={`group relative mx-auto block w-full max-w-[116px] sm:max-w-[138px] transition-all duration-300 focus-visible:outline-none ${
                          isActive
                            ? '-translate-y-1 drop-shadow-[0_10px_20px_rgba(18,63,58,0.28)]'
                            : 'opacity-85 hover:opacity-100 hover:-translate-y-0.5 drop-shadow-[0_6px_14px_rgba(18,63,58,0.14)]'
                        }`}
                      >
                        <div className="clip-rajasthani-gate relative aspect-[300/380] w-full overflow-hidden bg-[#123F3A]">
                          <SafeImage
                            src={plate.image}
                            alt={plate.shortTitle}
                            fallbackTitle={plate.shortTitle}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                          />

                          <div
                            className={`pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t ${
                              isActive
                                ? 'from-[#09211E] via-[#123F3A]/85 to-transparent'
                                : 'from-[#0C2B27]/90 via-[#123F3A]/65 to-transparent'
                            }`}
                            aria-hidden="true"
                          />

                          <svg
                            viewBox="0 0 300 380"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 h-full w-full"
                          >
                            <path
                              d="M150 4 Q166 6 178 24 Q198 18 212 38 Q234 34 246 58 Q268 58 276 84 Q290 88 290 108 V356 L298 364 V378 H2 V364 L10 356 V108 Q10 88 24 84 Q32 58 54 58 Q66 34 88 38 Q102 18 122 24 Q134 6 150 4 Z M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                              fill={isActive ? '#123F3A' : '#1E4C46'}
                            />
                            <path
                              d="M150 5 Q165 7 177 24.5 Q197 19 211 38.5 Q233 35 245 58.5 Q267 59 275 84.5 Q289 89 289 108 V356 L297 364 V376.5 H3 V364 L11 356 V108 Q11 89 25 84.5 Q33 59 55 58.5 Q67 35 89 38.5 Q103 19 123 24.5 Q135 7 150 5 Z"
                              fill="none"
                              stroke={isActive ? '#F3DFA7' : '#C3A66B'}
                              strokeWidth={isActive ? '3.4' : '2.4'}
                            />
                            <path
                              d="M150 18 Q137 19 127 34 Q110 29 98 46 Q80 42 69 63 Q51 62 43 85 Q24 88 24 108 V358 H276 V108 Q276 88 257 85 Q249 62 231 63 Q220 42 202 46 Q190 29 173 34 Q163 19 150 18 Z"
                              fill="none"
                              stroke={isActive ? '#EAD298' : '#C3A66B'}
                              strokeWidth="1.6"
                            />
                            <path d="M150 6 L154 12 L150 16.5 L146 12 Z" fill={isActive ? '#F3DFA7' : '#C3A66B'} />
                          </svg>

                          <div className="absolute inset-x-0 bottom-0 z-10 px-2 pb-3 pt-4 text-center">
                            <p
                              className={`text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.1em] truncate ${
                                isActive ? 'text-[#F3DFA7]' : 'text-[#E8E5D9]'
                              }`}
                            >
                              {plate.shortTitle}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Traditional Companion Saree Showcase Card */}
              <Link
                to={`/product/${lookbookProduct.slug}`}
                className="group relative flex items-center justify-between gap-3 sm:gap-4 border border-[#C3A66B]/60 bg-[#EFECE1] p-3 sm:p-4 shadow-sm hover:border-[#123F3A] hover:bg-[#E8E5D9] transition-all duration-200"
              >
                {/* Filigree Corner Brackets */}
                <span className="pointer-events-none absolute top-1 left-1 h-2.5 w-2.5 border-t border-l border-[#9E8249]/65" aria-hidden="true" />
                <span className="pointer-events-none absolute top-1 right-1 h-2.5 w-2.5 border-t border-r border-[#9E8249]/65" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-[#9E8249]/65" aria-hidden="true" />
                <span className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-[#9E8249]/65" aria-hidden="true" />

                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="clip-rajasthani-gate h-20 w-16 sm:h-22 sm:w-18 shrink-0 overflow-hidden bg-[#123F3A] p-0.5">
                    <div className="clip-rajasthani-gate h-full w-full overflow-hidden bg-[#F5F3EC]">
                      <SafeImage
                        src={lookbookProduct.images[0]}
                        alt={lookbookProduct.name}
                        fallbackTitle={lookbookProduct.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#9E8249] truncate">
                      Featured in Plate · {lookbookProduct.collectionName}
                    </p>
                    <p className="mt-0.5 font-display text-base sm:text-xl font-medium text-[#123F3A] truncate">
                      {lookbookProduct.name}
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-medium tabular-nums text-[#303431]">
                      {formatINR(lookbookProduct.priceINR)}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 border border-[#123F3A] bg-[#123F3A] px-3 py-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E8E5D9] group-hover:bg-[#0C2B27] transition-colors whitespace-nowrap shrink-0">
                  <span>Shop</span>
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="bg-[#E8E5D9]/55 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              Worn & Cherished
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
              Notes from Our Patrons
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <FadeInSection
                key={item.id}
                className="flex flex-col justify-between border border-[#303431]/12 bg-[#F5F3EC] p-6 sm:p-8"
              >
                <p className="font-display text-lg sm:text-xl italic leading-relaxed text-[#303431]">
                  “{item.quote}”
                </p>
                <div className="mt-5 sm:mt-6 border-t border-[#303431]/10 pt-4">
                  <p className="text-sm font-semibold text-[#123F3A]">
                    {item.name} · {item.location}
                  </p>
                  <p className="mt-0.5 text-xs text-[#303431]/65">{item.sareeName}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Subscription */}
      <section className="border-t border-[#303431]/10 bg-[#F5F3EC] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
            Private Atelier Invitations
          </p>
          <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
            Receive Early Loom Access
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#303431]/75">
            Be the first to preview single-edition handloom weaves, seasonal lookbooks, and bridal
            trunk show appointments.
          </p>

          {newsletterSubscribed ? (
            <div className="mx-auto mt-7 inline-flex items-center gap-2.5 border border-[#123F3A]/30 bg-[#123F3A]/8 px-6 py-3.5 text-sm text-[#123F3A]">
              <Check className="h-4 w-4" />
              <span>Subscribed with {newsletterSubscribed}</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletter}
              noValidate
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 border border-[#303431]/25 bg-white/70 px-4 py-3 text-sm text-[#303431] placeholder:text-[#303431]/45 focus:border-[#123F3A] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#123F3A] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          {newsletterError && <p className="mt-2 text-xs text-[#7A1F24]">{newsletterError}</p>}
        </div>
      </section>
    </PageShell>
  );
}
