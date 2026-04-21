import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { NavBar, Footer } from '../components/Layout'
import DuotonePhoto from '../components/DuotonePhoto'
import { supabase } from '../utils/supabase'
import { Beer } from '../types/beers'

interface HomeProps {
  featuredBeers: Beer[]
}

export default function Home({ featuredBeers }: HomeProps) {
  const colors = ['bg-moss', 'bg-rust', 'bg-ocean']
  const colorTexts = ['text-moss', 'text-rust', 'text-ocean']

  const beers = featuredBeers.map((b, i) => ({
    n: i + 1,
    name: b.name,
    style: b.style,
    abv: String(b.abv),
    season: b.season,
    desc: b.description,
    hops: b.hops || 'House blend',
    color: colors[i % 3],
    colorText: colorTexts[i % 3],
  }))

  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>Langer&apos;s Lager — Small batch, simply brewed</title>
        <meta name="description" content="Brewing whatever inspires me from local berries to exiotic flavors." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* HERO — solid dark nav + ticker + photo */}
      <div className="relative z-3 bg-ink text-paper">
        <NavBar active="Home" solid />
        {/* Ticker strip */}
        <div className="flex gap-10 px-14 py-3.5 bg-kelp border-t border-b border-paper/12 font-mono text-[11px] tracking-[0.2em] uppercase text-paper">
          <span>◆ Now pouring — Grapefruit Pale Ale</span>
          <span>◆ Spring release drops April 27</span>
          <span>◆ Tap room open Wed–Sat</span>
          <span>◆ 48°25′N · 123°21′W</span>
        </div>
      </div>

      <section className="relative h-[860px] bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0">
          <DuotonePhoto src="/images/brew_rig.jpg" alt="Brewing rig" tone="deep" overlayOpacity={0.6} />
        </div>

        {/* Hero content */}
        <div className="relative z-2 px-14 pt-[100px] pb-[120px] max-w-[1100px]">
          <div className="eyebrow text-paper/75">Est. 2024 · Craftsville, BC</div>
          <h1 className="font-sans text-[128px] font-bold leading-[0.92] tracking-[-0.035em] mt-6 text-paper">
            Small batch,<br />
            <span className="text-rust2 italic font-medium">simply</span> brewed.
          </h1>
          <p className="font-sans text-[19px] leading-normal text-paper/80 max-w-[520px] mt-9 font-normal">
            Brewing whatever inspires me from local berries to exiotic flavors.
          </p>
          <div className="flex gap-3.5 mt-11">
            <Link
              href="/beers"
              className="bg-paper text-ink px-7 py-4 text-sm font-semibold tracking-[0.01em] no-underline hover:bg-paper2 transition-colors"
            >
              See what&apos;s on tap →
            </Link>
            <Link
              href="/contact"
              className="bg-transparent text-paper px-7 py-4 text-sm font-semibold tracking-[0.01em] no-underline border border-paper/35 hover:border-paper/60 transition-colors"
            >
              Order a custom brew
            </Link>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="absolute bottom-8 left-14 z-2 font-mono text-[10px] tracking-[0.18em] text-paper/55 uppercase">
          Vol. 03 / Spring 2026<br />Five gallons, brewed well
        </div>
        <div className="absolute bottom-8 right-14 z-2 text-right font-mono text-[10px] tracking-[0.18em] text-paper/55">
          N° 001 — Home<br />Scroll ↓
        </div>
      </section>

      {/* TAP LIST MINI */}
      {beers.length > 0 && (
        <section className="relative z-2 bg-paper px-14 pt-[120px] pb-20">
          <div className="flex justify-between items-end mb-14">
            <div>
              <div className="eyebrow mb-3.5">№ 02 — What&apos;s pouring</div>
              <h2 className="text-[64px] font-bold m-0 tracking-[-0.025em] leading-none max-w-[780px]">
                {beers.length} in the fridge,<br />one in the{' '}
                <span className="italic font-medium">fermentor</span>.
              </h2>
            </div>
            <Link
              href="/beers"
              className="font-mono text-xs tracking-[0.15em] uppercase text-ink border-b border-ink pb-0.5 no-underline hover:opacity-70 transition-opacity"
            >
              See the full menu →
            </Link>
          </div>

          <div className={`grid grid-cols-${Math.min(beers.length, 3)} border-t-2 border-ink`}>
            {beers.map((b) => (
              <article
                key={b.n}
                className="px-8 pt-9 pb-10 border-r border-ink relative"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="index-tag">№ {String(b.n).padStart(3, '0')}</div>
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${b.colorText} font-semibold`}>
                    {b.season}
                  </span>
                </div>

                {/* Color block with ABV */}
                <div className={`h-[200px] mb-6 ${b.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 dots-overlay opacity-25" />
                  <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/85">
                    [ bottle shot ]
                  </div>
                  <div className="absolute top-4 right-4 font-mono text-[44px] font-bold text-paper/90 leading-none">
                    {b.abv}<span className="text-sm">%</span>
                  </div>
                </div>

                <div className="mono-label text-ink opacity-60 mb-1.5">{b.style}</div>
                <h3 className="text-[32px] font-bold mb-3.5 tracking-[-0.02em] leading-[1.05]">
                  {b.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink opacity-75 mb-5">
                  {b.desc}
                </p>
                <div className="flex justify-between items-center font-mono text-[11px] tracking-[0.08em] text-ink opacity-55 pt-4 border-t border-ink/15">
                  <span>Hops: {b.hops}</span>
                  <span>Now pouring ●</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* RIBBON */}
      <section className="bg-rust text-paper py-[22px] overflow-hidden relative z-2">
        <div className="flex gap-12 whitespace-nowrap font-sans text-[22px] font-semibold tracking-[-0.01em] animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Handmade in small batches
              <span className="opacity-50">◆</span>
              Never filtered, never hurried
              <span className="opacity-50">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* OUR STORY TEASER */}
      <section className="relative z-2 bg-kelp text-paper px-14 py-[120px] overflow-hidden">
        <div className="absolute inset-0 grain-overlay-heavy pointer-events-none" />
        <div className="relative grid grid-cols-[1.1fr_1fr] gap-20 items-center">
          <div>
            <div className="eyebrow text-paper/65 mb-[18px]">№ 03 — Our story</div>
            <h2 className="text-[68px] font-bold m-0 tracking-[-0.025em] leading-none">
              Started in an apartment.<br />
              <span className="italic font-medium text-rust2">Now</span> in the basement. <br />
              Soon in your fridge.
            </h2>
            <p className="text-[17px] leading-relaxed text-paper/80 mt-8 max-w-[560px]">
              Langer&apos;s Lager began because beer is too fucking expensive and I needed another beer for cheap.
            </p>
            <Link
              href="/story"
              className="inline-block mt-9 font-mono text-xs tracking-[0.15em] uppercase text-paper border-b border-paper/50 pb-[3px] no-underline hover:border-paper transition-colors"
            >
              Read the whole thing →
            </Link>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-paper/20 pt-8">
              {[
                { n: '12', l: 'Recipes\nin rotation' },
                { n: '2024', l: 'First\nproper pour' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-[48px] font-bold tracking-[-0.02em] text-paper">
                    {s.n}
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/55 mt-2 whitespace-pre-line leading-normal">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo collage */}
          <div className="relative h-[540px]">
            <div className="absolute top-0 right-0 w-3/4 h-[65%]">
              <DuotonePhoto src="/images/mash_king.jpg" alt="Mash tun" tone="moss" overlayOpacity={0.5} />
            </div>
            <div className="absolute bottom-0 left-0 w-3/5 h-[55%] border-[8px] border-kelp">
              <DuotonePhoto src="/images/fermentor_wort.jpg" alt="Fermentor with wort" tone="ocean" overlayOpacity={0.45} />
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="relative z-2 bg-paper px-14 py-[120px]">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <div className="eyebrow mb-4">№ 04 — Come by</div>
            <h2 className="text-[64px] font-bold m-0 tracking-[-0.025em] leading-none">
              The tap room is<br />open{' '}
              <span className="italic font-medium text-moss">most nights</span>.
            </h2>
            <div className="mt-10 border-t-2 border-ink">
              {[
                ['Wed · Thu', '5am — 9pm'],
                ['Fri · Sat', '2am — 10pm'],
                ['Sunday', '1pm — 6pm'],
                ['Mon · Tue', 'Closed (brew days)'],
              ].map(([d, h]) => (
                <div
                  key={d}
                  className="flex justify-between py-[18px] border-b border-ink/15 font-sans text-[17px]"
                >
                  <span className="font-semibold">{d}</span>
                  <span className="font-mono text-sm tracking-[0.02em] text-ink opacity-80">
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coordinates card */}
          <div className="relative bg-ink2 text-paper p-12 overflow-hidden">
            <div className="absolute inset-0 grain-overlay pointer-events-none" />
            <div className="relative">
              <div className="eyebrow text-paper/65 mb-5">Coordinates</div>
              <div className="font-sans text-[28px] font-semibold tracking-[-0.01em] leading-[1.25]">
                123 Brew Lane<br />Craftsville, BC<br />V9A 7K2, Canada
              </div>
              <div className="mt-9 flex justify-between font-mono text-[11px] tracking-[0.12em] uppercase text-paper/60 pt-5 border-t border-paper/20">
                <span>48°25′38″N</span>
                <span>123°21′56″W</span>
                <span>Elev. 14m</span>
              </div>
              {/* Map placeholder */}
              <div className="mt-10 h-[180px] bg-kelp relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, transparent 0 22px, rgba(234,228,213,0.15) 22px 23px), repeating-linear-gradient(90deg, transparent 0 22px, rgba(234,228,213,0.15) 22px 23px)',
                  }}
                />
                <div className="absolute top-[48%] left-[42%] w-3.5 h-3.5 bg-rust rounded-full shadow-[0_0_0_6px_rgba(184,83,42,0.3)]" />
                <div className="absolute bottom-3.5 left-3.5 font-mono text-[10px] tracking-[0.12em] uppercase text-paper/70">
                  [ we are here ]
                </div>
              </div>
              <Link
                href="#"
                className="block mt-7 font-mono text-xs tracking-[0.15em] uppercase text-paper border-b border-paper/40 pb-[3px] w-fit no-underline hover:border-paper transition-colors"
              >
                Get directions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: beers, error } = await supabase
      .from('beers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching beers:', error)
      return { props: { featuredBeers: [] } }
    }

    return { props: { featuredBeers: beers || [] } }
  } catch (error) {
    console.error('Exception fetching beers:', error)
    return { props: { featuredBeers: [] } }
  }
}
