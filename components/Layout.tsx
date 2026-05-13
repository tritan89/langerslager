import Head from 'next/head'
import Link from 'next/link'
import { ReactNode, useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type LayoutProps = {
  children: ReactNode
  title: string
  description: string
}

function Wordmark({ color = 'text-ink' }: { color?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 no-underline ${color}`}>
      <div className="w-3 h-3 bg-current rotate-45 shrink-0" />
      <span className="font-sans font-bold text-[22px] tracking-tight leading-none">
        Langer&apos;s Lager
      </span>
    </Link>
  )
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Beers', href: '/beers' },
  { label: 'Our Story', href: '/story' },
  { label: 'Tap Room', href: '/taproom' },
  { label: 'Contact', href: '/contact' },
]

export function NavBar({
  active,
  onPaper = false,
  solid = false,
}: {
  active?: string
  onPaper?: boolean
  solid?: boolean
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const textColor = onPaper ? 'text-ink' : 'text-paper'
  const borderColor = onPaper
    ? 'border-ink/15'
    : 'border-paper/20'
  const bg = solid ? (onPaper ? 'bg-paper' : 'bg-ink') : 'bg-transparent'

  return (
    <>
      <div
        className={`flex items-center justify-between px-5 md:px-14 py-[22px] border-b ${borderColor} ${bg} relative z-30`}
      >
        <Wordmark color={textColor} />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-9 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-sans font-medium text-sm tracking-[0.01em] no-underline ${textColor} ${item.label === active ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                } ${item.label === active
                  ? `border-b-[1.5px] ${onPaper ? 'border-ink' : 'border-paper'}`
                  : 'border-b-[1.5px] border-transparent'
                } pb-[3px] transition-opacity`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`font-sans font-semibold text-[13px] tracking-[0.02em] no-underline px-[18px] py-2.5 transition-colors ${onPaper
              ? 'bg-ink text-paper hover:bg-ink2'
              : 'bg-paper text-ink hover:bg-paper2'
              }`}
          >
            Order a brew →
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className={`md:hidden bg-transparent border-none cursor-pointer p-1 ${textColor}`}
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} active={active} />
    </>
  )
}

function MobileMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active?: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 bg-ink z-[9999] flex flex-col md:hidden">
      <div className="flex items-center justify-between px-5 py-[22px] border-b border-paper/20">
        <Wordmark color="text-paper" />
        <button
          className="bg-transparent border-none cursor-pointer text-paper p-1"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col items-center justify-center flex-1 gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className={`font-sans font-medium text-2xl tracking-[0.01em] no-underline text-paper ${item.label === active ? 'opacity-100' : 'opacity-70'
              } transition-opacity`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={onClose}
          className="font-sans font-semibold text-[13px] tracking-[0.02em] no-underline px-[18px] py-2.5 bg-paper text-ink hover:bg-paper2 transition-colors mt-4"
        >
          Order a brew →
        </Link>
      </nav>
    </div>,
    document.body
  )
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper px-5 md:px-14 pt-[72px] pb-8 relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay-heavy pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
        <div>
          <Wordmark color="text-paper" />
          <p className="font-sans text-sm leading-relaxed text-paper/70 mt-5 max-w-xs">
            A little Home brewery. Brewed on the
            west coast of BC since 2024.
          </p>
          <div className="mt-6 flex gap-2.5">
            {['IG', 'FB', 'UT'].map((s) => (
              <div
                key={s}
                className="w-[34px] h-[34px] border border-paper/30 flex items-center justify-center font-mono text-[10px] tracking-[0.1em] text-paper"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {[
          {
            h: 'Visit',
            l: ['123 Brew Lane', 'Vancouver, BC', 'Wed–Sat, noon–9pm', 'Sunday, 1–6pm'],
          },
          {
            h: 'Browse',
            l: [
              { label: 'Our Beers', href: '/beers' },
              { label: 'Our Story', href: '/story' },
              { label: 'Tap Room', href: '/taproom' },
              { label: 'Events', href: '/taproom' },
              { label: 'Recipes', href: '/recipes' },
            ],
          },
          {
            h: 'Get in touch',
            l: [
              'info@langerslager.com',
              '(555) 123-4567',
              { label: 'Custom brew requests', href: '/contact' },
              'Newsletter signup',
            ],
          },
        ].map((col) => (
          <div key={col.h}>
            <div className="eyebrow text-paper opacity-70 mb-[18px]">{col.h}</div>
            <ul className="list-none p-0 m-0">
              {col.l.map((li) => {
                const isLink = typeof li === 'object' && 'href' in li
                return (
                  <li
                    key={isLink ? li.label : (li as string)}
                    className="font-sans text-sm text-paper opacity-85 mb-2 leading-normal"
                  >
                    {isLink ? (
                      <Link href={li.href} className="text-paper no-underline hover:opacity-100">
                        {li.label}
                      </Link>
                    ) : (
                      (li as string)
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mt-16 pt-5 border-t border-paper/15 flex flex-col md:flex-row justify-between font-mono text-[11px] tracking-[0.12em] uppercase text-paper/55">
        <span>© 2026 Langer&apos;s Lager — Please drink responsibly</span>
      </div>
    </footer>
  )
}

export default function Layout({
  children,
  title,
  description,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>{title} — Langer&apos;s Lager</title>
        <meta name="description" content={description} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <main className="relative z-2">{children}</main>

      <Footer />
    </div>
  )
}
