import type { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/utils/supabase-server'
import type { OrderStatus } from '@/types/beers'

const validStatuses: OrderStatus[] = ['submitted', 'brewing', 'fermenting', 'ready']

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createSupabaseServerClient({ req, res })
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const admin = createSupabaseAdminClient()
  let query = admin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const status = req.query.status as string | undefined
  if (status && validStatuses.includes(status as OrderStatus)) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch orders' })
  }

  return res.status(200).json(data)
}
