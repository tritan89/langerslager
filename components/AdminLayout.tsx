import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'

type AdminLayoutProps = {
  children: ReactNode
  onLogout: () => void
}

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative">
      <Head>
        <title>Admin — Langer&apos;s Lager</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <header className="relative z-10 bg-ink text-paper px-14 py-[18px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 no-underline text-paper">
            <div className="w-3 h-3 bg-current rotate-45 shrink-0" />
            <span className="font-sans font-bold text-[22px] tracking-tight leading-none">
              Langer&apos;s Lager
            </span>
          </Link>
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/50 ml-2">
            Admin
          </span>
        </div>
        <button
          onClick={onLogout}
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/70 hover:text-paper border border-paper/25 hover:border-paper/50 px-4 py-2 bg-transparent cursor-pointer transition-colors"
        >
          Log out
        </button>
      </header>

      <main className="relative z-2">{children}</main>
    </div>
  )
}
