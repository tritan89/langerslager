// pages/api/beer-recipes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { BeerRecipe } from '@/types/beer-recipes';

type ResponseData = {
  recipes: BeerRecipe[];
  error?: string;
  count?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ recipes: [], error: 'Method not allowed' });
  }

  try {
    const { 
      limit = '20', 
      offset = '0', 
      difficulty,
      style,
      search 
    } = req.query;

    let query = supabase
      .from('beer_recipes')
      .select(`
        *,
        recipe_grains (
          id,
          grain_name,
          amount,
          percentage
        ),
        recipe_hops (
          id,
          hop_name,
          amount,
          time,
          usage
        ),
        recipe_ingredients (
          id,
          ingredient_name,
          amount,
          timing
        )
      `, { count: 'exact' });

    // Apply filters
    if (difficulty && typeof difficulty === 'string' && difficulty !== 'All') {
      query = query.eq('difficulty', difficulty);
    }

    if (style && typeof style === 'string' && style !== 'All') {
      query = query.eq('style', style);
    }

    if (search && typeof search === 'string') {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply pagination and ordering
    const { data: recipes, error, count } = await query
      .order('created_at', { ascending: false })
      .range(parseInt(offset as string), parseInt(offset as string) + parseInt(limit as string) - 1);

    if (error) {
      console.error('Error fetching beer recipes:', error);
      return res.status(500).json({ 
        recipes: [], 
        error: 'Failed to fetch beer recipes' 
      });
    }

    // Transform the data
    const transformedRecipes: BeerRecipe[] = (recipes || []).map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      style: recipe.style,
      difficulty: recipe.difficulty,
      grains: recipe.recipe_grains || [],
      hops: recipe.recipe_hops || [],
      additional_ingredients: recipe.recipe_ingredients || [],
      water_amount: {
        mash: recipe.water_mash || 0,
        sparge: recipe.water_sparge || 0,
        total: recipe.water_total || 0
      },
      mash_time: recipe.mash_time,
      mash_temp: recipe.mash_temp,
      boil_time: recipe.boil_time,
      yeast: {
        name: recipe.yeast_name || '',
        amount: recipe.yeast_amount || '',
        temperature: recipe.yeast_temp || 0
      },
      original_gravity: recipe.original_gravity,
      final_gravity: recipe.final_gravity,
      abv: recipe.abv,
      ibu: recipe.ibu,
      srm: recipe.srm,
      additional_notes: recipe.additional_notes || '',
      image_url: recipe.image_url,
      created_at: recipe.created_at
    }));

    return res.status(200).json({ 
      recipes: transformedRecipes, 
      count: count || 0 
    });

  } catch (error) {
    console.error('Exception in beer recipes API:', error);
    return res.status(500).json({ 
      recipes: [], 
      error: 'Internal server error' 
    });
  }
}
