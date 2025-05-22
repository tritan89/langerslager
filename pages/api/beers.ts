// pages/api/beers.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabase'
import { Beer } from '@/types/beers'

type ResponseData = {
  beers: Beer[]
  error?: string
  count?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ beers: [], error: 'Method not allowed' })
  }

  try {
    const { 
      limit = '10', 
      offset = '0', 
      season, 
      style,
      search 
    } = req.query

    let query = supabase
      .from('beers')
      .select('*', { count: 'exact' })

    // Apply filters
    if (season && typeof season === 'string') {
      query = query.eq('season', season)
    }

    if (style && typeof style === 'string') {
      query = query.eq('style', style)
    }

    if (search && typeof search === 'string') {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply pagination and ordering
    const { data: beers, error, count } = await query
      .order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1)

    if (error) {
      console.error('Error fetching beers:', error)
      return res.status(500).json({ 
        beers: [], 
        error: 'Failed to fetch beers' 
      })
    }

    return res.status(200).json({ 
      beers: beers || [], 
      count: count || 0 
    })

  } catch (error) {
    console.error('Exception in beers API:', error)
    return res.status(500).json({ 
      beers: [], 
      error: 'Internal server error' 
    })
  }
}
