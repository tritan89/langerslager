// pages/contact.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useState, FormEvent } from 'react'

type FormData = {
  name: string
  email: string
  phone: string
  beerType: string
  quantity: string
  occasion: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    beerType: '',
    quantity: '',
    occasion: '',
    message: ''
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.beerType.trim()) newErrors.beerType = 'Beer type is required'
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form')
      }

      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        beerType: '',
        quantity: '',
        occasion: '',
        message: ''
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      // You could add error state handling here
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Contact Us - Langer&apos;s Lager</title>
        <meta name="description" content="Request custom beer brewing from Langer's Lager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-amber-800 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Langer&apos;s Lager</div>
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

      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-amber-900 text-center">Custom Brewing Request</h1>
          <p className="text-lg mb-12 text-center">
            Looking for a special beer for your event or occasion? Fill out the form below and we&apos;ll craft a custom brew just for you!
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">Thank you for your request!</p>
                <p>We&apos;ve received your custom brewing inquiry and will get back to you within 48 hours.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-900 font-medium mb-2">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-900 font-medium mb-2">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-900 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="beerType" className="block text-gray-900 font-medium mb-2">Beer Type*</label>
                  <select
                    id="beerType"
                    name="beerType"
                    value={formData.beerType}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.beerType ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select a beer type</option>
                    <option value="lager">Lager</option>
                    <option value="ale">Ale</option>
                    <option value="ipa">IPA</option>
                    <option value="stout">Stout</option>
                    <option value="porter">Porter</option>
                    <option value="wheat">Wheat Beer</option>
                    <option value="custom">Custom (describe in message)</option>
                  </select>
                  {errors.beerType && <p className="text-red-500 text-sm mt-1">{errors.beerType}</p>}
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-gray-900 font-medium mb-2">Quantity (Gallons)*</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="e.g. 5 gallons, 10 gallons"
                  />
                  {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                </div>

                <div>
                  <label htmlFor="occasion" className="block text-gray-900 font-medium mb-2">Occasion</label>
                  <input
                    type="text"
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g. Wedding, Corporate Event"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-900 font-medium mb-2">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Tell us about your preferences, flavor profile, timeline, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-amber-900">Visit Our Brewery</h2>
              <p className="mb-4">Come see where the magic happens! Take a tour of our facilities and enjoy tastings of our latest brews.</p>
              <address className="not-italic">
                <p className="mb-1">123 Brew Lane</p>
                <p className="mb-1">Craftsville, BC 12345</p>
                <p className="mb-4">Canada</p>
                <p><strong>Hours:</strong></p>
                <p className="mb-1">Monday - Friday: 10am - 6pm</p>
                <p className="mb-1">Saturday: 11am - 5pm</p>
                <p>Sunday: Closed</p>
              </address>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-amber-900">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Email:</p>
                  <p>info@langerslager.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone:</p>
                  <p>(555) 123-4567</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Social Media:</p>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-amber-700 hover:text-amber-500">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-amber-700 hover:text-amber-500">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.969 7.5H14.72c-.293 0-.619.02-.969.116v2.508h2.803l-.397 2.901h-2.406v7.228h-2.969v-7.228H8.854v-2.901h1.928V9.377c0-1.964.67-3.116 3.107-3.116h3.08v3.239z"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-amber-700 hover:text-amber-500">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.17 10.89c-.2 4.44-2.94 7.5-7.28 7.61-4.35-.11-7.09-3.17-7.28-7.61h2.01c.16 3.05 2.28 5.39 5.27 5.5 2.99-.11 5.11-2.45 5.27-5.5h2.01z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-amber-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Langer&apos;s Lager</p>
              <p>Crafting extraordinary beer experiences</p>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Langer&apos;s Lager. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
