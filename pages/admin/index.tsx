import { useState } from 'react'
import { GetServerSideProps } from 'next'
import AdminLayout from '@/components/AdminLayout'
import StatusBadge from '@/components/StatusBadge'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/utils/supabase-server'
import type { Order, OrderStatus } from '@/types/beers'

const statuses: { label: string; value: OrderStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Submitted', value: 'submitted' },
  { label: 'Brewing', value: 'brewing' },
  { label: 'Fermenting', value: 'fermenting' },
  { label: 'Ready', value: 'ready' },
]

const statusOptions: OrderStatus[] = ['submitted', 'brewing', 'fermenting', 'ready']

interface AdminProps {
  orders: Order[]
}

export default function AdminDashboard({ orders: initialOrders }: AdminProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  async function handleStatusChange(id: number, newStatus: OrderStatus) {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        const updated = await res.json()
        setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)))
      }
    } finally {
      setUpdatingId(null)
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="px-14 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-ink/50 mb-2">Dashboard</div>
            <h1 className="text-[42px] font-bold tracking-[-0.025em] leading-none m-0">
              Brew Orders
            </h1>
          </div>
          <div className="font-mono text-[11px] tracking-[0.08em] text-ink/50">
            {orders.length} total orders
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-8">
          {statuses.map((s) => {
            const isActive = filter === s.value
            const count =
              s.value === 'all'
                ? orders.length
                : orders.filter((o) => o.status === s.value).length
            return (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`px-4 py-2 font-mono text-[11px] tracking-[0.1em] uppercase border cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-transparent text-ink border-ink/20 hover:border-ink/40'
                }`}
              >
                {s.label} ({count})
              </button>
            )
          })}
        </div>

        {/* Orders table */}
        <div className="border-t-2 border-ink">
          {/* Header */}
          <div className="grid grid-cols-[60px_120px_1fr_1fr_100px_160px] gap-4 px-4 py-3 border-b border-ink/15 font-mono text-[10px] tracking-[0.12em] uppercase text-ink/50">
            <span>#</span>
            <span>Date</span>
            <span>Name</span>
            <span>Beer Type</span>
            <span>Qty</span>
            <span>Status</span>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center font-mono text-sm text-ink/40">
              No orders found
            </div>
          )}

          {filtered.map((order) => (
            <div key={order.id} className="border-b border-ink/10">
              {/* Row */}
              <div
                className="grid grid-cols-[60px_120px_1fr_1fr_100px_160px] gap-4 px-4 py-4 items-center hover:bg-paper2/50 cursor-pointer transition-colors"
                onClick={() =>
                  setExpandedId(expandedId === order.id ? null : order.id)
                }
              >
                <span className="font-mono text-[11px] text-ink/40">
                  {String(order.id).padStart(3, '0')}
                </span>
                <span className="font-mono text-[12px] text-ink/70">
                  {formatDate(order.created_at)}
                </span>
                <span className="font-sans text-sm font-medium truncate">
                  {order.name}
                </span>
                <span className="font-sans text-sm text-ink/80 truncate">
                  {order.beer_type}
                </span>
                <span className="font-mono text-[12px] text-ink/70">
                  {order.quantity}
                </span>
                <div onClick={(e) => e.stopPropagation()}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value as OrderStatus)
                    }
                    disabled={updatingId === order.id}
                    className={`w-full bg-transparent border border-ink/15 px-2 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase cursor-pointer focus:outline-none focus:border-ink/40 ${
                      updatingId === order.id ? 'opacity-50' : ''
                    }`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expanded details */}
              {expandedId === order.id && (
                <div className="px-4 pb-5 pt-1 bg-paper2/30">
                  <div className="grid grid-cols-3 gap-8 pl-[60px]">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/45 mb-1">
                        Email
                      </div>
                      <div className="font-sans text-sm">{order.email}</div>
                    </div>
                    {order.phone && (
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/45 mb-1">
                          Phone
                        </div>
                        <div className="font-sans text-sm">{order.phone}</div>
                      </div>
                    )}
                    {order.occasion && (
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/45 mb-1">
                          Occasion
                        </div>
                        <div className="font-sans text-sm">{order.occasion}</div>
                      </div>
                    )}
                  </div>
                  {order.message && (
                    <div className="pl-[60px] mt-4">
                      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/45 mb-1">
                        Message
                      </div>
                      <div className="font-sans text-sm text-ink/80 max-w-xl leading-relaxed">
                        {order.message}
                      </div>
                    </div>
                  )}
                  <div className="pl-[60px] mt-4">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createSupabaseServerClient(context)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { redirect: { destination: '/admin/login', permanent: false } }
  }

  const admin = createSupabaseAdminClient()
  const { data: orders, error } = await admin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return { props: { orders: [] } }
  }

  return { props: { orders: orders ?? [] } }
}
