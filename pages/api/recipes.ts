// pages/api/recipes.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase'
import { Recipe } from '@/types/beers'

type ResponseData = {
  recipes: Recipe[]
  error?: string
  count?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ recipes: [], error: 'Method not allowed' })
  }

  try {
    const { 
      difficulty,
      limit = '20',
      offset = '0'
    } = req.query

    let query = supabase
      .from('recipes')
      .select('*', { count: 'exact' })

    // Apply difficulty filter if provided
    if (difficulty && typeof difficulty === 'string' && difficulty !== 'All') {
      query = query.eq('difficulty', difficulty)
    }

    // Apply pagination and ordering
    const { data: recipes, error, count } = await query
      .order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1)

    if (error) {
      console.error('Error fetching recipes:', error)
      return res.status(500).json({ 
        recipes: [], 
        error: 'Failed to fetch recipes' 
      })
    }

    return res.status(200).json({ 
      recipes: recipes || [], 
      count: count || 0 
    })

  } catch (error) {
    console.error('Exception in recipes API:', error)
    return res.status(500).json({ 
      recipes: [], 
      error: 'Internal server error' 
    })
  }
}
