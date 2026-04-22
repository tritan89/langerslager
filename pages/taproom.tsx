import Head from 'next/head'
import { NavBar, Footer } from '../components/Layout'
import DuotonePhoto from '../components/DuotonePhoto'

const onTap = [
  { n: 1, name: "Langer's Lager", style: 'Rice Lager', abv: '5.2', ibu: '18', oz8: 4, oz16: 7, pitcher: 22, color: 'bg-moss', note: 'Crisp, drinkable.' },
  { n: 2, name: 'Sour Kicks', style: 'Kettle Sour', abv: '5.5', ibu: '12', oz8: 5, oz16: 8, pitcher: 26, color: 'bg-rust', note: 'Puckery. Pink-gold.' },
  { n: 3, name: 'Blonde Muse', style: 'Belgian Blonde', abv: '6.5', ibu: '22', oz8: 5, oz16: 9, pitcher: 28, color: 'bg-ocean', note: 'Lemon, clove, ginger.' },
  { n: 4, name: 'Coastline Pale', style: 'West Coast Pale', abv: '5.8', ibu: '45', oz8: 5, oz16: 8, pitcher: 26, color: 'bg-kelp', note: 'Pine, grapefruit.' },
  { n: 5, name: 'Cedar Smoke', style: 'Rauchbier', abv: '5.4', ibu: '26', oz8: 5, oz16: 9, pitcher: 28, color: 'bg-moss2', note: 'Campfire in a glass.' },
]

const events = [
  { d: 'APR', day: '27', day2: 'Sat', title: 'Spring Release — Coastline Pale', time: '2pm — 10pm', tag: 'Release', desc: 'First pours of our year-round West Coast pale. Oysters from Fanny Bay. Live music from The Grey Hen.' },
  { d: 'MAY', day: '03', day2: 'Fri', title: 'Bottle Share + Homebrew Swap', time: '7pm — late', tag: 'Community', desc: 'Bring something weird, leave with something weirder. BYO glass.' },
  { d: 'MAY', day: '11', day2: 'Sat', title: "Mother's Day Growler Fill", time: 'Noon — 6pm', tag: 'Holiday', desc: '$5 off any growler when you bring a mom. Or a mom-adjacent figure.' },
  { d: 'MAY', day: '18', day2: 'Sat', title: 'Kettle Sour Workshop', time: '10am — 2pm', tag: 'Workshop', desc: 'Make a 1-gallon sour with us. Take it home, drink it in a month. $45 including grain.' },
  { d: 'MAY', day: '25', day2: 'Sat', title: 'Hop Garden Open House', time: '11am — 3pm', tag: 'Open house', desc: 'Walk the garden, see the rhizomes waking up. Free pints for the first 30 guests.' },
  { d: 'JUN', day: '08', day2: 'Sun', title: 'Summer Solstice Pig Roast', time: '3pm — 11pm', tag: 'Event', desc: 'Full pig on a spit, three new summer beers. Tickets $65 — includes food + flight.' },
]

export default function TapRoomPage() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>Tap Room — Langer&apos;s Lager</title>
        <meta name="description" content="What's pouring, what's coming up. Visit the tap room at 123 Brew Lane, Vancouver." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-2">
        <NavBar active="Tap Room" onPaper />
      </div>

      {/* Header */}
      <section className="relative z-2 px-14 pt-20 pb-[60px] grid grid-cols-[1.4fr_1fr] gap-20 items-end">
        <div>
          <div className="eyebrow mb-[18px]">№ 04 — Tap room</div>
          <h1 className="text-[128px] font-bold m-0 tracking-[-0.035em] leading-[0.9]">
            What&apos;s{' '}
            <span className="italic font-medium text-rust">pouring</span>,<br />
            what&apos;s coming up.
          </h1>
        </div>
        <div className="border-[1.5px] border-ink p-7 bg-paper">
          <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink opacity-60 mb-3">
            Open right now — until 9pm
          </div>
          <div className="flex items-center gap-3.5">
            <div className="w-3.5 h-3.5 rounded-full bg-moss shadow-[0_0_0_5px_rgba(61,91,63,0.25)]" />
            <div className="text-2xl font-semibold tracking-[-0.01em]">
              123 Brew Lane · Vancouver
            </div>
          </div>
          <div className="h-px bg-ink opacity-20 my-5" />
          <div className="grid grid-cols-2 gap-3.5 font-mono text-xs text-ink">
            <div><span className="opacity-55">Wed / Thu</span><br />5p — 9p</div>
            <div><span className="opacity-55">Fri / Sat</span><br />12p — 10p</div>
            <div><span className="opacity-55">Sunday</span><br />1p — 6p</div>
            <div><span className="opacity-55">Mon / Tue</span><br />Closed · brew</div>
          </div>
        </div>
      </section>

      {/* Kegerator photos */}
      <section className="relative z-2 px-14 pb-10 grid grid-cols-2 gap-4 h-[420px]">
        <DuotonePhoto src="/images/kegerator.jpg" alt="House kegerator" tone="ocean" overlayOpacity={0.3}>
          <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.18em] uppercase text-paper">
            Fig. 01 — house kegerator · single tap
          </div>
        </DuotonePhoto>
        <DuotonePhoto src="/images/kegerator2.jpg" alt="Taproom cold side" tone="moss" overlayOpacity={0.3}>
          <div className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.18em] uppercase text-paper">
            Fig. 02 — cold-side · the taproom
          </div>
        </DuotonePhoto>
      </section>

      {/* TAP LIST */}
      <section className="relative z-2 px-14 pt-10 pb-[100px]">
        <div className="grid grid-cols-[2fr_0.7fr_0.7fr_0.7fr_0.5fr] py-3.5 border-b-2 border-ink font-mono text-[11px] tracking-[0.14em] uppercase text-ink opacity-70">
          <span>Beer</span>
          <span>ABV · IBU</span>
          <span>8 oz</span>
          <span>16 oz</span>
          <span>Pitcher</span>
        </div>
        {onTap.map((b) => (
          <div
            key={b.n}
            className="grid grid-cols-[2fr_0.7fr_0.7fr_0.7fr_0.5fr] py-7 border-b border-ink/15 items-center"
          >
            <div className="flex gap-[22px] items-center">
              <div className={`w-11 h-11 ${b.color} shrink-0 flex items-center justify-center font-mono text-[11px] text-paper tracking-[0.1em]`}>
                {String(b.n).padStart(2, '0')}
              </div>
              <div>
                <div className="text-[28px] font-bold tracking-[-0.02em] leading-[1.1]">
                  {b.name}
                </div>
                <div className="mono-label text-ink opacity-60 mt-1.5">
                  {b.style} · {b.note}
                </div>
              </div>
            </div>
            <div className="font-mono text-[15px]">
              <span className="font-semibold">{b.abv}%</span>
              <span className="opacity-50 ml-2">{b.ibu} IBU</span>
            </div>
            <div className="font-mono text-lg font-semibold">${b.oz8}</div>
            <div className="font-mono text-lg font-semibold">${b.oz16}</div>
            <div className="font-mono text-lg font-semibold">${b.pitcher}</div>
          </div>
        ))}
        <div className="mt-7 mono-label text-ink opacity-55">
          Flights — four 4oz pours for $12 · Growlers filled on request · Cash &
          cards both fine
        </div>
      </section>

      {/* EVENTS */}
      <section className="relative z-2 bg-ink text-paper px-14 py-[120px] overflow-hidden">
        <div className="absolute inset-0 grain-overlay-heavy pointer-events-none" />
        <div className="relative">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="eyebrow text-paper/65 mb-[18px]">On the calendar</div>
              <h2 className="text-[80px] font-bold m-0 tracking-[-0.03em] leading-[0.95] text-paper">
                Come by,<br />
                <span className="italic font-medium text-rust2">stay a while</span>.
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="bg-paper text-ink border-none px-[18px] py-3 font-mono text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer hover:bg-paper2 transition-colors">
                ← prev
              </button>
              <button className="bg-transparent text-paper border border-paper/40 px-[18px] py-3 font-mono text-[11px] tracking-[0.14em] uppercase font-semibold cursor-pointer hover:border-paper/70 transition-colors">
                next →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-paper/25">
            {events.map((e, i) => (
              <div
                key={i}
                className={`grid grid-cols-[100px_1fr_auto] gap-7 py-8 border-b border-paper/18 items-start ${i % 2 === 0
                  ? 'pr-8 border-r border-r-paper/18'
                  : 'pl-8'
                  }`}
              >
                <div className="text-center pt-1">
                  <div className="font-mono text-[11px] tracking-[0.18em] text-rust2 font-semibold">
                    {e.d}
                  </div>
                  <div className="text-[56px] font-bold tracking-[-0.03em] text-paper leading-[0.95] mt-1">
                    {e.day}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55 mt-1.5">
                    {e.day2}
                  </div>
                </div>
                <div>
                  <div className="inline-block font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-[3px] border border-paper/40 text-paper/80 mb-3.5">
                    {e.tag}
                  </div>
                  <h3 className="text-2xl font-bold mb-2.5 tracking-[-0.015em] text-paper leading-[1.2]">
                    {e.title}
                  </h3>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-rust2 mb-3">
                    {e.time}
                  </div>
                  <p className="text-sm leading-relaxed text-paper/70 m-0 max-w-[440px]">
                    {e.desc}
                  </p>
                </div>
                <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-paper border-b border-paper/40 pb-0.5 cursor-pointer hover:border-paper transition-colors">
                  RSVP →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
