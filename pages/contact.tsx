import Head from 'next/head'
import { useState, FormEvent } from 'react'
import { NavBar, Footer } from '../components/Layout'
import DuotonePhoto from '../components/DuotonePhoto'

const beerStyles = ['Lager', 'Pale Ale', 'IPA', 'Sour', 'Stout', 'Porter', 'Wheat', 'Surprise me']
const flavourNotes = ['Citrus', 'Hoppy / bitter', 'Malty / bready', 'Fruity', 'Smoky', 'Sour / tart', 'Spiced', 'Chocolatey']

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hearAbout: '',
    beerStyle: [] as string[],
    quantity: '',
    targetAbv: '',
    flavours: [] as string[],
    occasion: '',
    eventDate: '',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const toggleChip = (field: 'beerStyle' | 'flavours', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Required'
    if (!formData.email.trim()) newErrors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    if (formData.beerStyle.length === 0) newErrors.beerStyle = 'Pick at least one'
    if (!formData.quantity.trim()) newErrors.quantity = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          beerType: formData.beerStyle.join(', '),
          quantity: formData.quantity,
          occasion: formData.occasion,
          message: [
            formData.flavours.length ? `Flavours: ${formData.flavours.join(', ')}` : '',
            formData.eventDate ? `Event date: ${formData.eventDate}` : '',
            formData.targetAbv ? `Target ABV: ${formData.targetAbv}` : '',
            formData.hearAbout ? `Heard about us: ${formData.hearAbout}` : '',
            formData.message,
          ].filter(Boolean).join('\n'),
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Failed to submit')

      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: '', email: '', phone: '', hearAbout: '', beerStyle: [],
        quantity: '', targetAbv: '', flavours: [], occasion: '', eventDate: '', message: '',
      })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>Contact — Langer&apos;s Lager</title>
        <meta name="description" content="Commission a custom beer. Weddings, work parties, or a reason you'd rather not say." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-2">
        <NavBar active="Contact" onPaper />
      </div>

      {/* Top header — split with photo */}
      <section className="relative z-2 grid grid-cols-[1.2fr_1fr] min-h-[520px]">
        <div className="px-14 pt-20 pb-[60px]">
          <div className="eyebrow mb-[18px]">№ 05 — Say hello</div>
          <h1 className="text-[108px] font-bold m-0 tracking-[-0.035em] leading-[0.9]">
            Commission a<br />
            <span className="italic font-medium text-ocean">beer</span>.
          </h1>
          <p className="text-lg leading-relaxed mt-9 max-w-[560px] text-ink opacity-80">
            Weddings, work parties, a very specific birthday, or a reason
            you&apos;d rather not say. We brew custom 5-gallon batches with four
            to six weeks of notice. Tell us what you want and we&apos;ll write
            back within two days.
          </p>
          <div className="flex gap-8 mt-11 pt-7 border-t border-ink/20">
            {[
              { label: 'Minimum', value: '5 gallons' },
              { label: 'Lead time', value: '4–6 weeks' },
              { label: 'Starting at', value: 'CA $180' },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-55 mb-1.5">
                  {item.label}
                </div>
                <div className="text-[22px] font-semibold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <DuotonePhoto
          src="/images/bottle_tub.jpg"
          alt="Bottles in ice"
          tone="ocean"
          overlayOpacity={0.55}
        />
      </section>

      {/* Form */}
      <section className="relative z-2 px-14 py-[100px] bg-paper2">
        <div className="grid grid-cols-[300px_1fr] gap-20">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink opacity-60 mb-3">
              Form 01 / of 01
            </div>
            <h2 className="text-[40px] font-bold m-0 tracking-[-0.02em] leading-[1.05]">
              Your brew,<br />blow by blow.
            </h2>
            <p className="text-sm leading-relaxed text-ink opacity-70 mt-5">
              More detail now = less back-and-forth later. If you don&apos;t know,
              leave it — we&apos;ll figure it out together.
            </p>
            <div className="mt-9 flex flex-col gap-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-ink opacity-65">
              <span>01 — About you</span>
              <span>02 — About the beer</span>
              <span>03 — The occasion</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-paper p-12 border-[1.5px] border-ink"
          >
            {submitSuccess && (
              <div className="bg-moss/10 border border-moss/30 text-moss px-6 py-4 mb-8">
                <p className="font-semibold">Thank you for your request!</p>
                <p className="text-sm mt-1 opacity-80">
                  We&apos;ve received your custom brewing inquiry and will get back
                  to you within 48 hours.
                </p>
              </div>
            )}

            {/* Section 01 — About you */}
            <div className="grid grid-cols-2 gap-8 mb-12">
              <FormField
                label="Full name" required name="name"
                value={formData.name} onChange={handleChange} error={errors.name}
              />
              <FormField
                label="Email" required name="email" type="email"
                value={formData.email} onChange={handleChange} error={errors.email}
              />
              <FormField
                label="Phone" name="phone" optional="optional"
                value={formData.phone} onChange={handleChange}
              />
              <FormField
                label="How'd you hear about us?" name="hearAbout"
                value={formData.hearAbout} onChange={handleChange}
              />
            </div>

            <div className="h-px bg-ink opacity-20 mb-10" />

            {/* Section 02 — About the beer */}
            <div className="mb-8">
              <FieldLabel label="What style of beer?" required error={errors.beerStyle} />
              <div className="flex flex-wrap gap-2 mt-1">
                {beerStyles.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    on={formData.beerStyle.includes(s)}
                    onClick={() => toggleChip('beerStyle', s)}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <FormField
                label="Quantity" required name="quantity"
                value={formData.quantity} onChange={handleChange}
                placeholder="e.g. 10 gallons (~85 bottles)" error={errors.quantity}
              />
              <FormField
                label="Target ABV" name="targetAbv"
                value={formData.targetAbv} onChange={handleChange}
                placeholder="e.g. 5 — 6 %"
              />
            </div>
            <div className="mb-12">
              <FieldLabel label="Flavour notes you'd like" />
              <div className="flex flex-wrap gap-2 mt-1">
                {flavourNotes.map((f) => (
                  <Chip
                    key={f}
                    label={f}
                    on={formData.flavours.includes(f)}
                    onClick={() => toggleChip('flavours', f)}
                  />
                ))}
              </div>
            </div>

            <div className="h-px bg-ink opacity-20 mb-10" />

            {/* Section 03 — The occasion */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <FormField
                label="Occasion" name="occasion"
                value={formData.occasion} onChange={handleChange}
                placeholder="e.g. Wedding reception"
              />
              <FormField
                label="Event date" name="eventDate"
                value={formData.eventDate} onChange={handleChange}
                placeholder="e.g. June 21, 2026"
              />
            </div>
            <div className="mb-12">
              <FieldLabel label="Anything else we should know" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-ink/25 bg-paper resize-none p-4 font-sans text-base text-ink outline-none leading-normal focus:border-ink/60 transition-colors"
                placeholder="Dietary restrictions, flavour preferences, pairing ideas..."
              />
            </div>

            <div className="h-px bg-ink opacity-20 mb-7" />

            <div className="flex justify-between items-center">
              <div className="mono-label text-ink opacity-60">
                Step 3 of 3 · We&apos;ll reply within 48h
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  className="bg-transparent text-ink border-[1.5px] border-ink px-6 py-4 font-sans text-sm font-semibold tracking-[0.01em] cursor-pointer hover:bg-ink/5 transition-colors"
                >
                  Save draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-ink text-paper border-none px-7 py-4 font-sans text-sm font-semibold tracking-[0.01em] cursor-pointer hover:bg-ink2 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send the request →'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Contact info */}
      <section className="relative z-2 px-14 py-[100px] bg-paper">
        <div className="grid grid-cols-3 gap-8 border-t-2 border-ink">
          {[
            { h: 'Email', v: 'info@langerslager.com', s: 'Replies in 48h, usually less. Include a few dates if you can.' },
            { h: 'Call', v: '(250) 555 · 0147', s: 'Weekday afternoons are best. Leave a message — we check voicemail.' },
            { h: 'Visit', v: '123 Brew Lane\nCraftsville, BC', s: 'Wed–Sun. Door around the side of the blue house with the tall hedge.' },
          ].map((c, i) => (
            <div
              key={i}
              className={`pt-9 pb-9 ${i < 2 ? 'pr-8 border-r border-ink/15' : ''} ${i > 0 ? 'pl-8' : ''}`}
            >
              <div className="eyebrow mb-3.5">{c.h}</div>
              <div className="text-[28px] font-bold tracking-[-0.015em] leading-[1.2] mb-3 whitespace-pre-line">
                {c.v}
              </div>
              <p className="text-sm leading-relaxed text-ink opacity-70 m-0">
                {c.s}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FieldLabel({ label, required, optional, error }: { label: string; required?: boolean; optional?: string; error?: string }) {
  return (
    <label className="flex justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-ink opacity-70 mb-2.5">
      <span>
        {label} {required && <span className="text-rust">*</span>}
        {error && <span className="text-rust ml-2">— {error}</span>}
      </span>
      {optional && <span className="opacity-50">{optional}</span>}
    </label>
  )
}

function FormField({
  label, name, value, onChange, required, optional, placeholder, type = 'text', error,
}: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean; optional?: string; placeholder?: string; type?: string; error?: string
}) {
  return (
    <div>
      <FieldLabel label={label} required={required} optional={optional} error={error} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border-0 border-b-[1.5px] bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors ${
          error ? 'border-rust' : 'border-ink focus:border-ocean'
        }`}
      />
    </div>
  )
}

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-sans text-sm font-medium px-4 py-2.5 border-[1.5px] cursor-pointer transition-colors ${
        on
          ? 'border-ink bg-ink text-paper'
          : 'border-ink/25 bg-transparent text-ink hover:border-ink/50'
      }`}
    >
      {label}
    </button>
  )
}
