import type { NextApiRequest, NextApiResponse } from 'next'
import { createSupabaseServerClient } from '@/utils/supabase-server'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createSupabaseServerClient({ req, res })
  await supabase.auth.signOut()

  return res.status(200).json({ success: true })
}
