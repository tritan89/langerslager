// components/Layout.tsx
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
  title: string
  description: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>{title} - Langer's Lager</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className="bg-amber-800 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-amber-300">Langer's Lager</Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-amber-300">Home</Link></li>
                <li><Link href="/recipes" className="hover:text-amber-300">Recipes</Link></li>
                <li><Link href="/contact" className="hover:text-amber-300">Contact Us</Link></li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Langer's Lager</p>
              <p>Crafting extraordinary beer experiences</p>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-amber-300">Facebook</a>
              <a href="#" className="hover:text-amber-300">Instagram</a>
              <a href="#" className="hover:text-amber-300">Twitter</a>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Langer's Lager. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
