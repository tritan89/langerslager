import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { NavBar, Footer } from '../components/Layout'
import { supabase } from '../utils/supabase'
import { Beer } from '../types/beers'

const fallbackBeers = [
  { n: 1, name: "Langer's Lager", style: 'Japanese Rice Lager', abv: '5.2', season: 'Summer', status: 'On tap', hops: 'German Hallertau', malts: '2-row, light crystal', desc: 'A refreshing rice lager that goes down just a little too smooth. Crisp, clean, stubbornly drinkable.', color: 'bg-moss', colorText: 'text-moss', image: '/images/biru_bottle.jpg' },
  { n: 2, name: 'Sour Kicks', style: 'Kettle Sour', abv: '5.5', season: 'Spring', status: 'On tap', hops: 'Chinook, Rocket', malts: 'Pale ale, flaked oats', desc: 'A sour with some sour gummies in it, because why not. Puckery, electric, pink-gold.', color: 'bg-rust', colorText: 'text-rust', image: '' },
  { n: 3, name: 'Blonde Muse', style: 'Belgian Blonde', abv: '6.5', season: 'Spring', status: 'On tap', hops: 'Hersbrucker, Chinook', malts: 'Pilsner, Maris Otter, Munich, Victory', desc: 'Notes of lemon rind, clove and fresh ginger. Subtle yet robust — inspiring stuff.', color: 'bg-ocean', colorText: 'text-ocean', image: '' },
  { n: 4, name: 'Coastline Pale', style: 'West Coast Pale Ale', abv: '5.8', season: 'Year round', status: 'Fermenting', hops: 'Cascade, Centennial', malts: '2-row, Munich', desc: 'Pine, grapefruit pith, a whisper of salt. Our backbone beer.', color: 'bg-kelp', colorText: 'text-kelp', image: '' },
  { n: 5, name: 'Fog Horn Stout', style: 'Oatmeal Stout', abv: '6.2', season: 'Winter', status: 'Cellared', hops: 'East Kent Goldings', malts: 'Maris Otter, flaked oats, chocolate', desc: 'Thick as the November harbour. Cocoa, espresso, wet wool.', color: 'bg-ink2', colorText: 'text-ink2', image: '' },
  { n: 6, name: 'Cedar Smoke', style: 'Rauchbier', abv: '5.4', season: 'Autumn', status: 'Cellared', hops: 'Tettnanger', malts: 'Beechwood-smoked Munich', desc: 'A campfire in a glass. Best with something grilled.', color: 'bg-moss2', colorText: 'text-moss2', image: '' },
]

const colorMap = ['bg-moss', 'bg-rust', 'bg-ocean', 'bg-kelp', 'bg-ink2', 'bg-moss2']
const colorTextMap = ['text-moss', 'text-rust', 'text-ocean', 'text-kelp', 'text-ink2', 'text-moss2']

interface BeersPageProps {
  dbBeers: Beer[]
}

export default function BeersPage({ dbBeers }: BeersPageProps) {
  const [activeStyle, setActiveStyle] = useState(0)
  const [activeSeason, setActiveSeason] = useState(0)

  const beers = dbBeers.length > 0
    ? dbBeers.map((b, i) => ({
      n: i + 1,
      name: b.name,
      style: b.style,
      abv: String(b.abv),
      season: b.season,
      status: 'On tap',
      hops: b.hops || 'House blend',
      malts: b.malts || 'House blend',
      desc: b.description,
      color: colorMap[i % colorMap.length],
      colorText: colorTextMap[i % colorTextMap.length],
      image: b.imageUrl ? `/images/${b.imageUrl}` : '',
    }))
    : fallbackBeers

  const styles = ['All styles', 'Lager', 'Ale · IPA', 'Sour', 'Stout · Porter']
  const seasons = ['All', 'Spring', 'Summer', 'Autumn', 'Winter']

  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>The Beers — Langer&apos;s Lager</title>
        <meta name="description" content="Six in rotation, one always in the fermentor, and a stubborn refusal to scale up." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Dark header */}
      <div className="bg-ink text-paper relative z-2">
        <NavBar active="Beers" />
        <div className="px-14 pt-20 pb-[100px] relative">
          <div className="eyebrow text-paper/70 mb-5">№ 02 — The catalog</div>
          <h1 className="text-[144px] font-bold m-0 tracking-[-0.035em] leading-[0.9] text-paper">
            The <span className="italic font-medium text-rust2">beers</span>.
          </h1>
          <p className="text-lg leading-normal text-paper/75 mt-7 max-w-[520px]">
            A collection of all beers brewed by Langer himself, puruse the selection at your pleasure.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <section className="relative z-2 bg-paper2 px-14 py-[22px] border-b border-ink">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
            <span className="opacity-55">Filter:</span>
            {styles.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveStyle(i)}
                className={`bg-transparent border-none cursor-pointer font-mono text-[11px] tracking-[0.12em] uppercase text-ink p-0 ${i === activeStyle ? 'font-bold opacity-100 border-b border-ink' : 'font-medium opacity-70 hover:opacity-100'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
            <span className="opacity-55">Season:</span>
            {seasons.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveSeason(i)}
                className={`bg-transparent border-none cursor-pointer font-mono text-[11px] tracking-[0.12em] uppercase text-ink p-0 ${i === activeSeason ? 'font-bold opacity-100' : 'font-medium opacity-70 hover:opacity-100'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog grid */}
      <section className="relative z-2 p-14">
        <div className="grid grid-cols-3 border-t border-l border-ink">
          {beers.map((b) => (
            <article
              key={b.n}
              className="border-r border-b border-ink bg-paper relative"
            >
              <div className="px-7 pt-6 pb-4 flex justify-between items-start">
                <div className="index-tag">№ {String(b.n).padStart(3, '0')}</div>
                <div
                  className={`font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-[3px] ${b.status === 'On tap'
                      ? 'bg-ink text-paper'
                      : 'bg-transparent text-ink border border-ink'
                    }`}
                >
                  {b.status}
                </div>
              </div>

              {/* Image / color block */}
              <div className={`h-[260px] ${b.color} relative mx-7 overflow-hidden`}>
                {b.image ? (
                  <>
                    <Image
                      src={b.image}
                      alt={b.name}
                      fill
                      className="object-cover"
                      style={{ filter: 'grayscale(0.15) contrast(1.05)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink/15 to-ink/55" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 dots-overlay opacity-22" />
                    <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.18em] uppercase text-paper/80">
                      [ bottle shot ]
                    </div>
                  </>
                )}
                <div className="absolute bottom-5 right-5 font-mono text-[56px] font-bold text-paper/95 leading-none tracking-[-0.02em]">
                  {b.abv}<span className="text-base">%</span>
                </div>
              </div>

              <div className="px-7 pt-6 pb-8">
                <div className={`font-mono text-[11px] tracking-[0.12em] uppercase ${b.colorText} font-semibold mb-2`}>
                  {b.style} · {b.season}
                </div>
                <h3 className="text-[30px] font-bold mb-3 tracking-[-0.02em] leading-[1.05]">
                  {b.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink opacity-75 mb-5">
                  {b.desc}
                </p>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[11px] tracking-[0.02em] text-ink">
                  <dt className="opacity-50 uppercase tracking-[0.12em]">Hops</dt>
                  <dd className="m-0">{b.hops}</dd>
                  <dt className="opacity-50 uppercase tracking-[0.12em]">Malt</dt>
                  <dd className="m-0">{b.malts}</dd>
                </dl>
              </div>
            </article>
          ))}
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

    if (error) {
      console.error('Error fetching beers:', error)
      return { props: { dbBeers: [] } }
    }

    return { props: { dbBeers: beers || [] } }
  } catch (error) {
    console.error('Exception fetching beers:', error)
    return { props: { dbBeers: [] } }
  }
}
