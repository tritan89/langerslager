import Image from 'next/image'
import { ReactNode } from 'react'

type Tone = 'moss' | 'ocean' | 'deep' | 'light'

const overlays: Record<Tone, string> = {
  moss: 'linear-gradient(180deg, rgba(14,42,43,0.55), rgba(61,91,63,0.7))',
  ocean: 'linear-gradient(180deg, rgba(14,42,43,0.5), rgba(29,74,85,0.75))',
  deep: 'linear-gradient(180deg, rgba(14,42,43,0.7), rgba(10,58,48,0.9))',
  light: 'linear-gradient(180deg, rgba(14,42,43,0.35), rgba(29,74,85,0.55))',
}

export default function DuotonePhoto({
  src,
  alt = '',
  tone = 'moss',
  height,
  overlayOpacity = 0.55,
  children,
  className = '',
}: {
  src: string
  alt?: string
  tone?: Tone
  height?: string
  overlayOpacity?: number
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-ink ${className}`}
      style={{ height: height || '100%' }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover duotone-photo"
        style={{ filter: 'grayscale(0.6) contrast(1.05) brightness(0.95)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: overlays[tone], opacity: overlayOpacity }}
      />
      <div
        className="absolute inset-0 dots-overlay"
        style={{ mixBlendMode: 'multiply', opacity: 0.35 }}
      />
      {children && <div className="relative z-2 h-full">{children}</div>}
    </div>
  )
}
