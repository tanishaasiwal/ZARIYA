import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {ASSETS, COLLECTIONS, getProductsForCollection} from '../data/catalog';
import {FadeInSection, PageShell, usePageMeta} from '../components/MotionPrimitives';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SafeImage} from '../components/SafeImage';

export function CollectionsPage() {
  usePageMeta(
    'Collections',
    'Explore ZARIYA’s twelve distinct saree collections: Banarasi Silk, Kanjivaram, Chanderi, Organza, Patola, Jamdani, Mysore Silk, Bandhani, Handloom, Bridal, Festive, and Contemporary.'
  );

  return (
    <PageShell className="bg-[#F5F3EC]">
      {/* Collections Index Hero */}
      <section className="relative min-h-[320px] sm:h-[360px] lg:h-[420px] w-full overflow-hidden bg-[#0E312D] flex items-center py-10 sm:py-0">
        <SafeImage
          src={ASSETS.heroPeacockMoody4k}
          alt="ZARIYA handwoven saree collections heritage colonnade"
          fallbackTitle="The ZARIYA Collections"
          priority
          className="absolute inset-0 h-full w-full object-cover object-[50%_24%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/82 via-black/48 to-black/20 sm:inset-y-0 sm:left-0 sm:right-auto sm:w-[65%] lg:w-[60%] sm:bg-gradient-to-r sm:from-black/72 sm:via-black/42 sm:to-transparent"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-xl">
            <Breadcrumbs
              tone="on-dark"
              items={[{label: 'Home', to: '/'}, {label: 'Collections'}]}
            />
            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#FFE3A3] [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
              Twelve Heritage &amp; Couture Houses
            </p>
            <h1 className="mt-1.5 sm:mt-2 font-display text-[26px] font-normal leading-[1.1] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.65)] sm:text-5xl lg:text-[54px]">
              The ZARIYA Collections
            </h1>
            <p className="mt-2 sm:mt-3 text-[13px] leading-snug text-[#F5F3EC] [text-shadow:0_1px_12px_rgba(0,0,0,0.8)] sm:text-base sm:leading-relaxed">
              From kadwa Banarasi and double-ikat Patola to Dhakai Jamdani, Mysore crepe, and
              Gajji Bandhani, each house celebrates an enduring Indian craft lineage.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          {COLLECTIONS.map((col, idx) => {
            const count = getProductsForCollection(col.slug).length;

            return (
              <FadeInSection key={col.slug} delay={idx * 0.04}>
                <Link
                  to={`/collections/${col.slug}`}
                  className="group grid h-full grid-cols-12 overflow-hidden border border-[#303431]/12 bg-[#E8E5D9]/35 hover:border-[#123F3A]/45 transition-colors"
                >
                  <div className="col-span-5 aspect-[3/4] overflow-hidden bg-[#E8E5D9]">
                    <SafeImage
                      src={col.image}
                      alt={col.name}
                      fallbackTitle={col.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col justify-between p-4 sm:p-7">
                    <div>
                      <p className="text-[11px] sm:text-xs text-[#9E8249] truncate">{col.origin}</p>
                      <h2 className="mt-1 font-display text-2xl sm:text-3xl font-medium leading-tight text-[#123F3A]">
                        {col.name}
                      </h2>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-[#303431]/80 line-clamp-3 sm:line-clamp-none">
                        {col.description}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-6 border-t border-[#303431]/10 pt-3 sm:pt-4 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#303431]/65 tabular-nums whitespace-nowrap">
                        {count} Sarees
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-[#123F3A] group-hover:text-[#9E8249] whitespace-nowrap">
                        Explore
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
