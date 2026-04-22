import { useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { createSupabaseServerClient } from '@/utils/supabase-server'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      window.location.href = '/admin'
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink font-sans text-paper relative flex items-center justify-center">
      <Head>
        <title>Login — Langer&apos;s Lager Admin</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay-heavy pointer-events-none" />

      <div className="relative z-10 w-full max-w-[400px] px-6">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-3 h-3 bg-paper rotate-45" />
            <span className="font-sans font-bold text-[22px] tracking-tight">
              Langer&apos;s Lager
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-paper/50">
            Admin Dashboard
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-[11px] tracking-[0.12em] uppercase text-paper/60 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-ink2 border border-paper/20 text-paper px-4 py-3 font-sans text-sm focus:outline-none focus:border-paper/50 transition-colors"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] tracking-[0.12em] uppercase text-paper/60 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-ink2 border border-paper/20 text-paper px-4 py-3 font-sans text-sm focus:outline-none focus:border-paper/50 transition-colors"
            />
          </div>

          {error && (
            <div className="font-mono text-[11px] tracking-[0.08em] text-rust2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-paper text-ink py-3.5 font-sans font-semibold text-sm tracking-[0.01em] cursor-pointer border-none hover:bg-paper2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createSupabaseServerClient(context)
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return { redirect: { destination: '/admin', permanent: false } }
  }

  return { props: {} }
}
