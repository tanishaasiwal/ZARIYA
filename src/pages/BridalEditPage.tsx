import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Check} from 'lucide-react';
import {ASSETS, formatINR, PRODUCTS} from '../data/catalog';
import {FadeInSection, PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {ProductCard} from '../components/ProductCard';
import {SafeImage} from '../components/SafeImage';

const BRIDAL_HERO_LOOKS = [
  {
    id: 'sindoori',
    label: 'Pheras Crimson',
    title: 'Sindoori Temple Korvai Kanjivaram',
    meta: 'Kanchipuram · ₹9,500',
    primary: ASSETS.bridalCrimson,
    secondary: ASSETS.altCrimsonPose2,
    to: '/product/sindoori-korvai-kanjivaram',
  },
  {
    id: 'rani-banarasi',
    label: 'Rani Kadwa',
    title: 'Rani Shikargah Kadwa Banarasi',
    meta: 'Varanasi · ₹9,800',
    primary: ASSETS.bridalRaniBanarasi,
    secondary: ASSETS.altRaniPose2,
    to: '/product/rani-shikargah-kadwa-banarasi-bridal',
  },
  {
    id: 'gajri-bandhani',
    label: 'Gota Bandhani',
    title: 'Gajri Bridal Gota Bandhani',
    meta: 'Bhuj & Jaipur · ₹9,600',
    primary: ASSETS.bandhaniGajri,
    secondary: ASSETS.altBandhaniPose2,
    to: '/product/gajri-bridal-gota-bandhani',
  },
  {
    id: 'bronze-korvai',
    label: 'Temple Bronze',
    title: 'Kaveri Temple Bronze Kanjivaram',
    meta: 'Kanchipuram · ₹9,900',
    primary: ASSETS.kanjivaramBronze,
    secondary: ASSETS.altKanjivaramBronzePose2,
    to: '/product/kaveri-bridal-crimson-kanjivaram',
  },
  {
    id: 'ivory-katan',
    label: 'Morning Ivory',
    title: 'Kashi Ivory & Gold Katan Bridal',
    meta: 'Daytime Vows · ₹9,400',
    primary: ASSETS.lookbookCourtyard,
    secondary: ASSETS.altIvoryPose2,
    to: '/product/kashi-ivory-gold-katan-bridal',
  },
] as const;

export function BridalEditPage() {
  usePageMeta(
    'The Bridal Edit',
    'Curated ceremonial Kanjivaram, Banarasi Katan, Patola, Bandhani, Paithani, and ivory bridal sarees for modern Indian weddings.'
  );

  const bridalProducts = PRODUCTS.filter((p) => p.isBridal || p.occasion === 'Bridal');
  const [ceremonyFilter, setCeremonyFilter] = useState<'all' | 'pheras' | 'day' | 'reception'>('all');
  const [activeLookIdx, setActiveLookIdx] = useState(0);

  const [consultForm, setConsultForm] = useState({name: '', email: '', phone: '', weddingMonth: ''});
  const [consultError, setConsultError] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const displayedBridal = bridalProducts.filter((p) => {
    if (ceremonyFilter === 'pheras')
      return (
        p.color === 'Sindoori Crimson' ||
        p.color === 'Gajri Crimson' ||
        p.color === 'Bronze Maroon' ||
        p.color === 'Peacock Teal'
      );
    if (ceremonyFilter === 'day')
      return p.color === 'Pearl Ivory' || p.color === 'Muted Sage' || p.color === 'Haldi Mustard';
    if (ceremonyFilter === 'reception')
      return (
        p.fabric === 'Katan Silk' ||
        p.fabric === 'Paithani Silk' ||
        p.fabric === 'Patola Silk'
      );
    return true;
  });

  const startingPrice = bridalProducts.length
    ? Math.min(...bridalProducts.map((p) => p.priceINR))
    : 8900;
  const activeLook = BRIDAL_HERO_LOOKS[activeLookIdx];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.name.trim() || !consultForm.email.includes('@') || consultForm.phone.trim().length < 10) {
      setConsultError('Please enter your name, a valid email address, and a 10-digit phone number.');
      return;
    }
    setConsultError('');
    setConsultSubmitted(true);
  };

  return (
    <PageShell>
      {/* Redesigned Couture Bridal Trousseau Hero */}
      <section className="relative overflow-hidden border-b border-[#C3A66B]/25 bg-[#0C2B27] text-[#F5F3EC]">
        <SafeImage
          src={ASSETS.heroBridal4k}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-18"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0C2B27] via-[#0C2B27]/92 to-[#0C2B27]/78"
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-10 px-5 py-7 sm:px-8 sm:py-10 lg:grid-cols-12 lg:py-14">
          {/* Left Bridal Narrative & Craft Specs */}
          <div className="lg:col-span-6">
            <Breadcrumbs
              tone="on-dark"
              items={[{label: 'Home', to: '/'}, {label: 'Bridal Edit'}]}
            />

            <p className="mt-4 sm:mt-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#FFE3A3]">
              ZARIYA Bridal Trousseau Atelier
            </p>
            <h1 className="mt-2 sm:mt-2.5 font-display text-[28px] font-normal leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Heirlooms Woven for Sacred Vows.
            </h1>
            <p className="mt-3 sm:mt-4 max-w-xl text-[13px] leading-relaxed text-[#E8E5D9]/85 sm:text-base">
              From sindoori three-shuttle Kanjivarams and rani kadwa Banarasis to gajri gota
              Bandhani and Patan Patolas—each trousseau drape pairs bespoke blouse tailoring with
              authentic weaver provenance.
            </p>

            {/* Ceremonial Highlights Row */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#E8E5D9]/15 pt-5 sm:grid-cols-3">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                  Trousseau Edit
                </span>
                <span className="mt-1 block font-display text-xl tabular-nums text-[#FFE3A3]">
                  {bridalProducts.length} Heirlooms
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
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#E8E5D9]/60">
                  Atelier Craft
                </span>
                <span className="mt-1 block text-xs font-medium leading-snug text-[#F5F3EC]">
                  Custom Blouse &amp; Muslin Folio
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#bridal-catalogue"
                className="inline-flex items-center gap-2 bg-[#D6B97C] px-6 sm:px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0C2B27] hover:bg-[#F5F3EC] transition-colors whitespace-nowrap"
              >
                Explore Bridal Sarees
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#trousseau-appointment"
                className="inline-flex items-center gap-2 border border-white/55 px-5 sm:px-6 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white hover:border-[#FFE3A3] hover:text-[#FFE3A3] transition-colors whitespace-nowrap"
              >
                Book Trousseau Styling
              </a>
            </div>
          </div>

          {/* Right Layered Bridal Look Switcher */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="relative flex items-end justify-center lg:justify-end">
                <Link
                  to={activeLook.to}
                  className="group relative aspect-[3/4] w-52 sm:w-64 lg:w-[270px] overflow-hidden border border-[#C3A66B]/45 bg-[#123F3A] shadow-2xl"
                >
                  <SafeImage
                    src={activeLook.primary}
                    alt={activeLook.title}
                    fallbackTitle={activeLook.title}
                    priority
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3.5 sm:p-4">
                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#FFE3A3]">
                      {activeLook.meta}
                    </p>
                    <p className="mt-0.5 font-display text-base sm:text-lg leading-tight text-white">
                      {activeLook.title}
                    </p>
                  </div>
                </Link>

                <div className="-ml-6 mb-4 aspect-[3/4] w-24 sm:-ml-8 sm:mb-6 sm:w-32 lg:w-36 overflow-hidden border border-[#C3A66B]/55 bg-[#123F3A] shadow-xl">
                  <SafeImage
                    src={activeLook.secondary}
                    alt={`${activeLook.title} alternate bridal angle`}
                    priority
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Clean Text Switcher Tabs */}
              <div className="mt-4 flex flex-wrap justify-center lg:justify-end gap-1.5">
                {BRIDAL_HERO_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    type="button"
                    onClick={() => setActiveLookIdx(idx)}
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.06em] transition-colors whitespace-nowrap ${
                      activeLookIdx === idx
                        ? 'border border-[#D6B97C] bg-[#D6B97C] text-[#0C2B27]'
                        : 'border border-white/20 bg-white/5 text-[#E8E5D9]/80 hover:border-[#D6B97C]/60 hover:text-white'
                    }`}
                  >
                    {look.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremonial Edit Pillars */}
      <section className="border-b border-[#303431]/12 bg-[#E8E5D9]/50 py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:px-8">
          <FadeInSection className="border-t border-[#123F3A]/30 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
              01. Muhurtham & Pheras
            </p>
            <h2 className="mt-2 font-display text-2xl text-[#123F3A]">
              Sindoori Korvai & Kadwa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#303431]/80">
              High-twist three-ply mulberry silks engineered to hold sculptural pleats through
              long sacred ceremonies.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.05} className="border-t border-[#123F3A]/30 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
              02. Daytime Anand Karaj & Vows
            </p>
            <h2 className="mt-2 font-display text-2xl text-[#123F3A]">
              Pearl Ivory & Muted Sage
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#303431]/80">
              Luminous sunlit ivory Katan and botanical zardozi organza tailored for open-air
              morning celebrations.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.1} className="border-t border-[#123F3A]/30 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
              03. Trousseau Atelier Service
            </p>
            <h2 className="mt-2 font-display text-2xl text-[#123F3A]">
              Complimentary Custom Fit
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#303431]/80">
              Every bridal drape includes custom blouse measurements, fall-pico hand finishing,
              and archival muslin storage.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Curated Bridal Grid */}
      <section id="bridal-catalogue" className="bg-[#F5F3EC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-[#303431]/12 pb-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                Curated Bridal Sarees
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
                The Wedding Edit
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:inline-flex gap-1 border border-[#303431]/15 bg-[#E8E5D9]/60 p-1 w-full md:w-auto">
              {(
                [
                  {id: 'all', label: 'All Bridal'},
                  {id: 'pheras', label: 'Pheras & Muhurtham'},
                  {id: 'day', label: 'Daytime Vows'},
                  {id: 'reception', label: 'Reception'},
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCeremonyFilter(tab.id)}
                  className={`px-3 py-2 text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap text-center ${
                    ceremonyFilter === tab.id
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
            {displayedBridal.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trousseau Consultation Booking */}
      <section
        id="trousseau-appointment"
        className="border-t border-[#303431]/12 bg-[#E8E5D9]/65 py-16 sm:py-24"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              Private Atelier & Video Appointments
            </p>
            <h2 className="font-display text-3xl font-normal text-[#123F3A] sm:text-4xl">
              Curate Your Bridal Trousseau with Our Stylists
            </h2>
            <p className="text-sm leading-relaxed text-[#303431]/80">
              Meet with our senior textile curators in Mumbai, New Delhi, or via private video
              salon to preview heirloom Banarasi and Kanjivaram weaves, coordinate family drapes,
              and customize blouse embroidery.
            </p>
            <Link
              to="/collections/bridal-collection"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:text-[#9E8249]"
            >
              View Bridal Collection Archive
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-6 border border-[#303431]/15 bg-[#F5F3EC] p-6 sm:p-8">
            {consultSubmitted ? (
              <div className="space-y-3 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#123F3A] text-[#E8E5D9]">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-[#123F3A]">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#303431]/80">
                  Thank you, {consultForm.name}. Our bridal atelier concierge will reach out within
                  24 hours to confirm your private viewing slot.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setConsultSubmitted(false);
                    setConsultForm({name: '', email: '', phone: '', weddingMonth: ''});
                  }}
                  className="mt-2 text-xs font-medium underline underline-offset-4 text-[#123F3A]"
                >
                  Request another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} noValidate className="space-y-4">
                <h3 className="font-display text-2xl text-[#123F3A]">
                  Request a Private Bridal Viewing
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bridal-name" className="block text-xs font-medium text-[#303431]">
                      Full Name *
                    </label>
                    <input
                      id="bridal-name"
                      type="text"
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="bridal-phone" className="block text-xs font-medium text-[#303431]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="bridal-phone"
                      type="tel"
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bridal-email" className="block text-xs font-medium text-[#303431]">
                      Email Address *
                    </label>
                    <input
                      id="bridal-email"
                      type="email"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="bridal-month" className="block text-xs font-medium text-[#303431]">
                      Wedding Month / City
                    </label>
                    <input
                      id="bridal-month"
                      type="text"
                      placeholder="e.g. December · Udaipur"
                      value={consultForm.weddingMonth}
                      onChange={(e) => setConsultForm({...consultForm, weddingMonth: e.target.value})}
                      className="mt-1.5 w-full border border-[#303431]/25 bg-white/80 px-3 py-2.5 text-sm focus:border-[#123F3A] focus:outline-none"
                    />
                  </div>
                </div>
                {consultError && <p className="text-xs text-[#7A1F24]">{consultError}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#123F3A] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors"
                >
                  Confirm Appointment Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
