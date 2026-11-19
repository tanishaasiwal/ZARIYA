import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {ASSETS} from '../data/catalog';
import {FadeInSection, PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

interface WeavingCapital {
  id: string;
  tabLabel: string;
  figureNumber: string;
  region: string;
  title: string;
  detail: string;
  loomHours: string;
  technique: string;
  yarnGrade: string;
  hallmark: string;
  image: string;
  imageAlt: string;
  isPortrait: boolean;
  link: string;
  linkLabel: string;
}

const WEAVING_CAPITALS: WeavingCapital[] = [
  {
    id: 'varanasi',
    tabLabel: '01 · Varanasi',
    figureNumber: 'Fig. 01',
    region: 'Madanpura, Varanasi · Uttar Pradesh',
    title: '01. The Kadwa Pit Looms of Madanpura',
    detail:
      'Seated over earthen pits that preserve natural humidity for fine mulberry silk, two-weaver teams pass miniature zari tilli shuttles by hand—ensuring every lotus, peacock, and architectural floral motif locks cleanly without loose threads behind the cloth.',
    loomHours: '240–320 Hours per Drape',
    technique: 'Two-Shuttle Kadwa Tilli Brocade',
    yarnGrade: 'Twisted Katan Mulberry & Tested Antique Zari',
    hallmark: 'Clean snag-free reverse weave; hand-finished jangla pallus',
    image: ASSETS.craftspersonBanarasi,
    imageAlt:
      'Master Banarasi karigar weaving deep peacock teal Katan silk and antique gold zari on a Madanpura wooden pit loom',
    isPortrait: true,
    link: '/collections/banarasi-silk',
    linkLabel: 'Explore Banarasi Silk',
  },
  {
    id: 'kanchipuram',
    tabLabel: '02 · Kanchipuram',
    figureNumber: 'Fig. 02',
    region: 'Kanchipuram · Tamil Nadu',
    title: '02. Three-Shuttle Korvai Architecture',
    detail:
      'Each authentic Kanjivaram border is woven simultaneously on the same loom under contrasting tension and interlocked stitch by stitch into the main silk body—forging a structural korvai seam strong enough to outlast generations of celebration.',
    loomHours: '280–360 Hours per Drape',
    technique: 'Three-Shuttle Korvai Interlock',
    yarnGrade: 'Three-Ply High-Twist Mulberry Silk',
    hallmark: 'Signature raised korvai border seam with temple & rudraksha motifs',
    image: ASSETS.craftspersonKanchipuram,
    imageAlt:
      'Kanchipuram master weaver interlocking sindoori crimson body with temple-gold border on a teakwood handloom',
    isPortrait: true,
    link: '/collections/kanjivaram-silk',
    linkLabel: 'Explore Kanjivaram Silk',
  },
  {
    id: 'patan',
    tabLabel: '03 · Patan',
    figureNumber: 'Fig. 03',
    region: 'Patan · Gujarat',
    title: '03. Double-Ikat Geometric Symmetry',
    detail:
      'Long before the first pick enters the loom, bundles of pure silk warp and weft are tied and resist-dyed separately through madder, indigo, and turmeric baths—producing navratna geometry that aligns millimetre-for-millimetre on both faces of the saree.',
    loomHours: '320–420 Hours per Drape',
    technique: 'Patan Salvi Double-Ikat Resist',
    yarnGrade: 'Single-Origin Mulberry Silk · Natural Dye Baths',
    hallmark: '100% reversible double-faced design with razor-sharp edge precision',
    image: ASSETS.detailPatolaPallu,
    imageAlt:
      'Macro view of authentic Patan Patola double-ikat navratna geometric silk weave in heirloom jewel tones',
    isPortrait: false,
    link: '/collections/patola-silk',
    linkLabel: 'Explore Patola Silk',
  },
  {
    id: 'chanderi',
    tabLabel: '04 · Chanderi',
    figureNumber: 'Fig. 04',
    region: 'Chanderi · Madhya Pradesh',
    title: '04. Translucent Silk-Cotton Poetry',
    detail:
      'Known historically as woven air, Chanderi unites unbleached degummed silk warp with gossamer handspun cotton weft, punctuated across the ground with delicate needle-inserted ashrafi coins and tiny nalferma floral butis.',
    loomHours: '120–160 Hours per Drape',
    technique: 'Extra-Weft Needle-Inserted Butis',
    yarnGrade: 'Unbleached Silk Warp × Fine Combed Cotton',
    hallmark: 'Crisp luminous sheen with weightless daytime breathability',
    image: ASSETS.detailChanderiPallu,
    imageAlt:
      'Close-up textile detail of pearl-ivory Chanderi silk-cotton saree with antique brass coin butis and sage selvedge',
    isPortrait: false,
    link: '/collections/chanderi-sarees',
    linkLabel: 'Explore Chanderi Sarees',
  },
  {
    id: 'yeola',
    tabLabel: '05 · Yeola & Bhagalpur',
    figureNumber: 'Fig. 05',
    region: 'Yeola, Maharashtra & Bhagalpur, Bihar',
    title: '05. Tapestry Paithani & Wild Tussar',
    detail:
      'Without mechanical jacquards, Yeola weavers interlock peacock muniya motifs across solid zari pallus by tapestry counting, while Bhagalpur artisans spin organic slate-toned wild tussar enriched with low-impact mineral dye baths.',
    loomHours: '180–360 Hours per Drape',
    technique: 'Tana-Bana Tapestry & Dobby Tussar',
    yarnGrade: 'Pure Yeola Mulberry & Wild Ghicha-Tussar',
    hallmark: 'Double-faced tapestry peacock medallions and organic raw-silk texture',
    image: ASSETS.detailPaithaniPallu,
    imageAlt:
      'Detailed weave of Yeola Paithani peacock-teal silk and antique gold tapestry pallu',
    isPortrait: false,
    link: '/collections/handloom-collection',
    linkLabel: 'Explore Handloom Silks',
  },
  {
    id: 'jaipur',
    tabLabel: '06 · Phulia & Jaipur',
    figureNumber: 'Fig. 06',
    region: 'Phulia, Bengal & Jaipur Karkhana',
    title: '06. Handspun Jamdani & Botanical Zardozi',
    detail:
      'From Phulia’s discontinuous supplementary-weft Jamdani muslins inserted bamboo spool by bamboo spool, to Jaipur’s teakwood adda frames where artisans stitch antique kasab leaves across sheer silk organza.',
    loomHours: '140–210 Hours per Drape',
    technique: 'Supplementary-Weft Jamdani & Aari Adda',
    yarnGrade: 'Khadi Cotton-Silk & Kora Silk Organza',
    hallmark: 'Floating woven florals and sculptural scalloped botanical borders',
    image: ASSETS.craftspersonZardozi,
    imageAlt:
      'Artisan hands working delicate antique brass zardozi embroidery over translucent sage silk organza on a wooden adda frame',
    isPortrait: true,
    link: '/collections/organza-sarees',
    linkLabel: 'Explore Organza & Jamdani',
  },
];

const LOOM_CHRONOLOGY = [
  {
    step: 'Stage 01',
    title: 'Silk Degumming & Vat Dyeing',
    detail:
      'Raw mulberry cocoons are degummed in mild soap baths and hand-dyed in calibrated deep peacock, sindoori crimson, sage, and mineral charcoal lots.',
  },
  {
    step: 'Stage 02',
    title: 'Naksha & Graph Drafting',
    detail:
      'Archival paisley, shikargah, and temple border geometries are plotted square by square on graph paper before warp beams are tensioned.',
  },
  {
    step: 'Stage 03',
    title: 'Synchronized Loom Interlacing',
    detail:
      'Master weavers pass silk weft and soft-burnished tested zari shuttles—requiring anywhere from 120 to 360 uninterrupted loom hours per piece.',
  },
  {
    step: 'Stage 04',
    title: 'Finishing & Provenance Card',
    detail:
      'Each finished six-yard cloth is inspected by hand, dressed with silk tassels, wrapped in breathable unbleached muslin, and numbered for its wearer.',
  },
];

export function HeritagePage() {
  usePageMeta(
    'Our Heritage',
    'Discover the master artisans, wooden pit looms, pure zari standards, and regional Indian weaving traditions behind ZARIYA.'
  );

  const [activeCapitalIdx, setActiveCapitalIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const activeCapital = WEAVING_CAPITALS[activeCapitalIdx];

  return (
    <PageShell className="bg-[#F5F3EC]">
      {/* 1. Institutional Exhibition Hero */}
      <section className="bg-[#0C2B27] py-8 text-[#E8E5D9] sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs tone="on-dark" items={[{label: 'Home', to: '/'}, {label: 'Our Heritage'}]} />

          <div className="mt-6 sm:mt-8 grid grid-cols-1 items-stretch gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#C3A66B]">
                  ZARIYA Craft Monograph · Living Handloom Archive
                </p>
                <h1 className="mt-2.5 sm:mt-4 font-display text-[28px] font-normal leading-[1.1] text-[#E8E5D9] sm:text-4xl lg:text-5xl [text-wrap:balance]">
                  The Art of Tradition, Kept Alive by Human Hands.
                </h1>
                <p className="mt-3 sm:mt-5 max-w-xl text-[13px] sm:text-base leading-relaxed text-[#E8E5D9]/82">
                  ZARIYA was founded on an unhurried conviction: heirloom silk cannot be imitated
                  by high-speed power looms. Behind every drape stands a living guild of naksha
                  pattern drawers, natural vat dyers, and master karigars across India’s historic
                  textile capitals.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 border-t border-[#E8E5D9]/15 pt-5 sm:pt-6">
                <div>
                  <p className="font-display text-2xl sm:text-3xl tabular-nums text-[#FFE3A3]">
                    12
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-[#E8E5D9]/70">Weaving Houses</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl tabular-nums text-[#FFE3A3]">
                    42+
                  </p>
                  <p className="mt-1 text-xs text-[#E8E5D9]/70">Partner Master Guilds</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl tabular-nums text-[#FFE3A3]">
                    100%
                  </p>
                  <p className="mt-1 text-xs text-[#E8E5D9]/70">Certified Silk Mark</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#C3A66B]/30 bg-[#123F3A] p-2.5 h-full flex flex-col justify-between">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#0C2B27]">
                  <SafeImage
                    src={ASSETS.craftLoom4k}
                    alt="Master weaver working a wooden pit loom with deep peacock teal silk warp threads"
                    fallbackTitle="ZARIYA Artisan Loom"
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-3 pb-1 text-xs text-[#E8E5D9]/75">
                  <span className="font-display italic text-sm text-[#FFE3A3]">
                    Archive Plate — Traditional Pit-Loom Interlacing
                  </span>
                  <span className="uppercase tracking-[0.14em] text-[11px] text-[#E8E5D9]/60">
                    Hand-Thrown Shuttle · Zero Power Loom
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Six-Capital Craft Atlas */}
      <section className="py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:gap-6 border-b border-[#303431]/12 pb-6 sm:pb-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                Regional Provenance Atlas
              </p>
              <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl [text-wrap:balance]">
                Six Weaving Capitals, One Quiet Aesthetic
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Regional Weaving Capitals"
              className="grid grid-cols-2 sm:grid-cols-3 lg:inline-flex w-full lg:w-auto items-center gap-1 border border-[#303431]/15 bg-[#E8E5D9]/60 p-1"
            >
              {WEAVING_CAPITALS.map((capital, idx) => {
                const isSelected = activeCapitalIdx === idx;
                return (
                  <button
                    key={capital.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCapitalIdx(idx)}
                    className={`px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-medium text-center transition-colors whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[#123F3A] text-[#E8E5D9]'
                        : 'text-[#303431]/75 hover:text-[#123F3A]'
                    }`}
                  >
                    {capital.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCapital.id}
              initial={prefersReduced ? false : {opacity: 0, y: 8}}
              animate={{opacity: 1, y: 0}}
              exit={prefersReduced ? {opacity: 1} : {opacity: 0}}
              transition={{duration: 0.2}}
              className="mt-8 sm:mt-10 grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5 mx-auto w-full max-w-md lg:max-w-none">
                <div className="border border-[#303431]/12 bg-[#E8E5D9]/65 p-2.5">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-[#F5F3EC]">
                    <SafeImage
                      src={activeCapital.image}
                      alt={activeCapital.imageAlt}
                      fallbackTitle={activeCapital.title}
                      className={`h-full w-full object-cover ${
                        activeCapital.isPortrait ? 'object-top' : 'object-center'
                      }`}
                    />
                  </div>
                  <p className="px-1.5 pt-3 pb-1 text-xs font-display italic text-[#303431]/75">
                    {activeCapital.figureNumber} — {activeCapital.region}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249]">
                    {activeCapital.region}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl [text-wrap:balance]">
                    {activeCapital.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#303431]/82 sm:text-base">
                    {activeCapital.detail}
                  </p>

                  {/* Accession Metadata Spec Ledger */}
                  <dl className="mt-8 divide-y divide-[#303431]/12 border-y border-[#303431]/12">
                    <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#303431]/60">
                        Artisan Loom Investment
                      </dt>
                      <dd className="font-display text-xl tabular-nums text-[#123F3A]">
                        {activeCapital.loomHours}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#303431]/60">
                        Structural Technique
                      </dt>
                      <dd className="text-sm font-medium text-[#303431]">
                        {activeCapital.technique}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#303431]/60">
                        Warp &amp; Zari Standard
                      </dt>
                      <dd className="text-sm font-medium text-[#303431]">
                        {activeCapital.yarnGrade}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center">
                      <dt className="text-xs uppercase tracking-[0.14em] text-[#303431]/60">
                        Atelier Hallmark
                      </dt>
                      <dd className="text-sm text-[#303431]/85">{activeCapital.hallmark}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    to={activeCapital.link}
                    className="inline-flex items-center gap-2 bg-[#123F3A] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
                  >
                    {activeCapital.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 border-b border-[#123F3A]/40 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:border-[#9E8249] hover:text-[#9E8249] transition-colors whitespace-nowrap"
                  >
                    Browse All Sarees
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Loom-to-Atelier Four-Stage Process */}
      <section className="border-y border-[#303431]/12 bg-[#E8E5D9]/55 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
              Atelier Chronology
            </p>
            <h2 className="mt-2 font-display text-3xl font-normal text-[#123F3A] sm:text-4xl [text-wrap:balance]">
              From Raw Mulberry Cocoon to Heirloom Six Yards
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {LOOM_CHRONOLOGY.map((item, idx) => (
              <FadeInSection
                key={item.step}
                delay={idx * 0.05}
                className="border-t border-[#123F3A]/35 pt-5 sm:pt-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E8249] tabular-nums">
                  {item.step}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-[#123F3A]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#303431]/80">{item.detail}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Material Integrity & Specimen Diptyque */}
      <section className="py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:col-span-6">
              <div className="col-span-7 border border-[#303431]/12 bg-[#E8E5D9]/60 p-1.5 sm:p-2">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <SafeImage
                    src={ASSETS.zariMacro}
                    alt="Macro close-up of antique burnished brass zari woven over deep peacock teal silk"
                    fallbackTitle="Pure Silk & Tested Zari"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="pt-2 sm:pt-2.5 text-[10px] sm:text-[11px] font-display italic text-[#303431]/70">
                  ACC. ZRY-01 · Silk-core antique brass zari twist
                </p>
              </div>
              <div className="col-span-5 flex flex-col justify-between gap-3 sm:gap-4">
                <div className="border border-[#303431]/12 bg-[#E8E5D9]/60 p-1.5 sm:p-2">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <SafeImage
                      src={ASSETS.detailCrimsonPallu}
                      alt="Detail of three-shuttle Kanjivaram crimson and gold temple korvai border"
                      fallbackTitle="Korvai Temple Border"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="pt-2 text-[10px] sm:text-[11px] font-display italic text-[#303431]/70">
                    ACC. ZRY-02 · Korvai border joinery
                  </p>
                </div>
                <div className="bg-[#123F3A] p-3 sm:p-4 text-[#E8E5D9]">
                  <p className="font-display text-xl sm:text-2xl text-[#FFE3A3] tabular-nums">100%</p>
                  <p className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#E8E5D9]/80">
                    Documented Loom Provenance
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9E8249]">
                Material Integrity &amp; Fair Patronage
              </p>
              <h2 className="font-display text-3xl font-normal text-[#123F3A] sm:text-4xl [text-wrap:balance]">
                Soft-Burnished Zari &amp; Direct Loom Partnerships
              </h2>
              <p className="text-sm leading-relaxed text-[#303431]/82 sm:text-base">
                True luxury whispers rather than glares. Every ZARIYA dye lot is calibrated to our
                quiet heritage palette—deep peacock teal, sindoori crimson, muted sage, and pearl
                ivory—paired with supple silk-core tested zari rather than brittle synthetic lurex.
              </p>

              <div className="grid grid-cols-1 gap-6 border-y border-[#303431]/12 py-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl font-medium text-[#123F3A]">
                    Direct Loom Patronage
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#303431]/75">
                    We commission weaves year-round with advance stipends and fair karigar wages so
                    artisan families thrive within their ancestral craft.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-[#123F3A]">
                    Signed Provenance Card
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#303431]/75">
                    Every drape arrives inside an unbleached cotton muslin bag accompanied by its
                    regional weave card, yarn grade, and handloom hours.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#123F3A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#E8E5D9] hover:bg-[#0C2B27] transition-colors whitespace-nowrap"
                >
                  Explore Handwoven Sarees
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2 border-b border-[#123F3A]/40 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#123F3A] hover:border-[#9E8249] hover:text-[#9E8249] transition-colors whitespace-nowrap"
                >
                  Read the Craft Journal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
