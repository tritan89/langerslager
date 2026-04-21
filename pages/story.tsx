import Head from 'next/head'
import { NavBar, Footer } from '../components/Layout'
import DuotonePhoto from '../components/DuotonePhoto'

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>Our Story — Langer&apos;s Lager</title>
        <meta name="description" content="A very small brewery on a rainy coast. Founded 2024, five gallons per batch." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-2 bg-paper">
        <NavBar active="Our Story" onPaper />
      </div>

      {/* Big headline */}
      <section className="relative z-2 px-14 pt-[100px] pb-[60px]">
        <div className="eyebrow mb-5">№ 03 — Our story</div>
        <h1 className="text-[156px] font-bold m-0 tracking-[-0.035em] leading-[0.88] max-w-[1200px]">
          A very small<br />
          brewery on a<br />
          <span className="italic font-medium text-moss">rainy</span> coast.
        </h1>
      </section>

      {/* Intro — two col */}
      <section className="relative z-2 px-14 pt-10 pb-[100px] grid grid-cols-[1fr_1.2fr] gap-20 items-start">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink opacity-55 leading-relaxed">
          Founded 2024<br />
          Brewed in Vancouver, BC<br />
          Distributed by walking over
        </div>
        <div>
          <p className="text-[22px] leading-relaxed m-0 tracking-[-0.005em]">
            Langer&apos;s Lager began with a pot, a burner, and a thirsty young man. Going from one to two vessel systems experimenting with teas, spices and whatever else I could could get my hands on a young brewer emerged.  Two years later,
            there&apos;s more beer being brewed, drunk and shared.
          </p>
          <p className="text-[17px] leading-relaxed mt-6 text-ink opacity-75 max-w-[580px]">

          </p>
        </div>
      </section>

      {/* Big photo band */}
      <section className="relative z-2 h-[520px]">
        <DuotonePhoto
          src="/images/fermentor_wort.jpg"
          alt="Primary fermentor"
          tone="ocean"
          height="100%"
          overlayOpacity={0.4}
        >
          <div className="absolute bottom-8 left-14 right-14 flex justify-between items-end text-paper">
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase">
              Fig. 01 — primary fermentor<br />
              <span className="opacity-70">Ambient 18°C · day six</span>
            </div>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-right">
              Victoria, BC<br />
              <span className="opacity-70">48.426°N · 123.366°W</span>
            </div>
          </div>
        </DuotonePhoto>
      </section>

      {/* Timeline */}
      <section className="relative z-2 px-14 py-[120px] bg-paper">
        <div className="grid grid-cols-[340px_1fr] gap-20 items-start">
          <div>
            <div className="eyebrow mb-[18px]">How we got here</div>
            <h2 className="text-[56px] font-bold m-0 tracking-[-0.025em] leading-none">
              A timeline,<br />
              <span className="italic font-medium text-rust">roughly</span>.
            </h2>
          </div>
          <div className="border-t-2 border-ink">
            {[
              ['2024', 'The First Kettle', 'A little 7.5 gallon kettle and some DME, it was drinkable.'],
              ['2025', 'The Kegerator', 'Beer is now on tap, the beer must flow.'],
              ['2026', 'Now', "A three vessel fully electric pilot system is now opertaional, the beer only gets better."],
            ].map(([y, t, d], i) => (
              <div
                key={i}
                className="grid grid-cols-[140px_1fr] gap-10 py-8 border-b border-ink/15"
              >
                <div className="font-mono text-xl font-semibold text-ocean tracking-[-0.01em]">
                  {y}
                </div>
                <div>
                  <h3 className="text-[26px] font-bold mb-2.5 tracking-[-0.015em]">
                    {t}
                  </h3>
                  <p className="text-base leading-relaxed text-ink opacity-70 m-0 max-w-[640px]">
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The process — 4-step */}
      <section className="relative z-2 bg-kelp text-paper px-14 py-[120px] overflow-hidden">
        <div className="absolute inset-0 grain-overlay-heavy pointer-events-none" />
        <div className="relative">
          <div className="eyebrow text-paper/60 mb-[18px]">The process</div>
          <h2 className="text-[72px] font-bold m-0 tracking-[-0.025em] leading-none max-w-[900px]">
            Four weeks,<br />
            <span className="italic font-medium text-rust2">four steps</span>,
            one stove.
          </h2>
          <div className="mt-[72px] grid grid-cols-4 gap-8">
            {[
              ['01', 'Mash', 'Grain, hot water, patience. We hit 67°C and hold for an hour. Sugars do their thing.'],
              ['02', 'Boil', 'Ninety minutes of vigorous argument between water and hops. The garage smells incredible.'],
              ['03', 'Ferment', 'Two weeks in the fermentor, one week cold crashing. Yeast turns sugar into beer. Magic, mostly.'],
              ['04', 'Bottle', 'Hand-filled, hand-capped, hand-labeled. Another fortnight carbonating in the dark.'],
            ].map(([n, t, d]) => (
              <div key={n} className="pt-7 border-t border-paper/30">
                <div className="font-mono text-xs tracking-[0.2em] text-paper/60">
                  {n}
                </div>
                <h3 className="text-[34px] font-bold mt-5 mb-3 tracking-[-0.02em]">
                  {t}
                </h3>
                <p className="text-[15px] leading-relaxed text-paper/80 m-0">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="relative z-2 bg-paper px-14 py-[100px]">
        <div className="grid grid-cols-3 gap-4 h-[480px]">
          <DuotonePhoto src="/images/shelves.jpg" alt="Bottle library" tone="moss" />
          <DuotonePhoto src="/images/mash_king.jpg" alt="Mash tun" tone="ocean" />
          <DuotonePhoto src="/images/co2_tank.jpg" alt="CO2 tank" tone="deep" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-ink opacity-55">
          <span>Fig. 02 — the bottle library</span>
          <span>Fig. 03 — mash · boil · hot liquor</span>
          <span>Fig. 04 — CO₂ on deposit</span>
        </div>
      </section>

      <Footer />
    </div>
  )
}
