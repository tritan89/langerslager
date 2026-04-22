import { OrderStatus } from '@/types/beers'

const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  submitted: { bg: 'bg-fog', text: 'text-ink', label: 'Submitted' },
  brewing: { bg: 'bg-ocean', text: 'text-paper', label: 'Brewing' },
  fermenting: { bg: 'bg-moss', text: 'text-paper', label: 'Fermenting' },
  ready: { bg: 'bg-rust', text: 'text-paper', label: 'Ready' },
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-block px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}
