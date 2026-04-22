import type { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/utils/supabase-server'
import type { OrderStatus } from '@/types/beers'

const validStatuses: OrderStatus[] = ['submitted', 'brewing', 'fermenting', 'ready']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createSupabaseServerClient({ req, res })
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const id = Number(req.query.id)
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid order ID' })
  }

  const { status } = req.body as { status: string }
  if (!status || !validStatuses.includes(status as OrderStatus)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const admin = createSupabaseAdminClient()
  const { data, error } = await admin
    .from('contact_submissions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return res.status(500).json({ error: 'Failed to update order' })
  }

  return res.status(200).json(data)
}
