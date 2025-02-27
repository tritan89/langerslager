// pages/index.tsx
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [age, setAge] = useState<number | null>(null)
  const [ageVerified, setAgeVerified] = useState<boolean>(false)

  useEffect(() => {
    // Check if age verification was previously completed
    const verified = localStorage.getItem('ageVerified')
    if (verified === 'true') {
      setAgeVerified(true)
    }
  }, [])

  const handleAgeVerification = () => {
    if (age && age >= 21) {
      setAgeVerified(true)
      localStorage.setItem('ageVerified', 'true')
    } else {
      alert('You must be 21 or older to view this site.')
    }
  }

  if (!ageVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-800 text-white">
        <div className="bg-amber-900 p-8 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">Langer's Lager</h1>
          <p className="mb-4">Please verify your age to enter our site</p>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full p-2 mb-4 text-black rounded"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <button
            onClick={handleAgeVerification}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded"
          >
            Verify Age
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Langer's Lager - Craft Beer</title>
        <meta name="description" content="Handcrafted beer with uncompromising quality" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-amber-800 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Langer's Lager</div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-amber-300">Home</Link></li>
                <li><Link href="/recipes" className="hover:text-amber-300">Recipes</Link></li>
                <li><Link href="/contact" className="hover:text-amber-300">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0 bg-amber-900/50 z-10"></div>
          <div className="absolute inset-0 z-0">
            {/* Replace with your actual beer image */}
            <div className="w-full h-full bg-amber-700"></div>
          </div>
          <div className="relative z-20 container mx-auto h-full flex items-center px-4">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">Crafted With Passion</h1>
              <p className="text-xl mb-6">
                Langer's Lager brings you handcrafted beers made with the finest ingredients and decades of brewing tradition.
              </p>
              <Link href="/contact" className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-lg inline-block">
                Order Custom Brew
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Beers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-900">Our Signature Brews</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Classic Lager",
                  description: "Our flagship brew with a smooth, refreshing taste that's perfect for any occasion.",
                },
                {
                  name: "Amber Ale",
                  description: "A rich, malty profile with caramel notes and a balanced hop character.",
                },
                {
                  name: "IPA Delight",
                  description: "Bold hoppy flavor with citrus and pine notes for the adventurous beer lover.",
                }
              ].map((beer, index) => (
                <div key={index} className="bg-amber-100 rounded-lg p-6 shadow-md">
                  <div className="h-40 bg-amber-300 rounded-md mb-4"></div>
                  <h3 className="text-xl font-bold mb-2 text-amber-900">{beer.name}</h3>
                  <p className="text-amber-800">{beer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-amber-800 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="h-64 bg-amber-200 rounded-lg"></div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="mb-4">
                  Founded on a passion for exceptional beer, Langer's Lager has been perfecting the art of brewing since 2010. Our master brewers combine traditional techniques with innovative approaches to create distinctive flavors that stand out.
                </p>
                <p>
                  Every batch is crafted with care, using locally sourced ingredients whenever possible to support our community and ensure the freshest taste.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Langer's Lager</p>
              <p>Crafting extraordinary beer experiences</p>
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
