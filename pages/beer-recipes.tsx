// pages/beer-recipes.tsx
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '@/components/Layout';
import BeerRecipeGrid from '@/components/beer-recipes/BeerRecipeGrid';
import BeerRecipeModal from '@/components/beer-recipes/BeerRecipeModal';
import BeerRecipeFilter from '@/components/beer-recipes/BeerRecipeFilter';
import { supabase } from '@/utils/supabase';
import { BeerRecipe } from '@/types/beer-recipes';

interface BeerRecipesPageProps {
  recipes: BeerRecipe[];
  error?: string;
}

export default function BeerRecipes({ recipes, error }: BeerRecipesPageProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<BeerRecipe | null>(null);
  const [filter, setFilter] = useState({
    difficulty: 'All',
    style: 'All'
  });

  // Get unique styles from recipes
  const availableStyles = [...new Set(recipes.map(r => r.style))].sort();

  // Filter recipes based on current filters
  const filteredRecipes = recipes.filter(recipe => {
    const difficultyMatch = filter.difficulty === 'All' || recipe.difficulty === filter.difficulty;
    const styleMatch = filter.style === 'All' || recipe.style === filter.style;
    return difficultyMatch && styleMatch;
  });

  const handleFilterChange = (filterType: 'difficulty' | 'style', value: string) => {
    setFilter(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <Layout 
      title="Beer Recipes" 
      description="Browse our collection of homebrewing recipes"
    >
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-amber-900">Homebrewing Recipes</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            Explore our collection of tried and tested beer recipes. Each recipe includes detailed grain bills, 
            hop schedules, and brewing instructions to help you recreate these beers at home.
          </p>
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error loading recipes</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <BeerRecipeFilter
              currentFilter={filter}
              onFilterChange={handleFilterChange}
              availableStyles={availableStyles}
            />

            <BeerRecipeGrid
              recipes={filteredRecipes}
              onRecipeClick={setSelectedRecipe}
            />
          </>
        )}

        <BeerRecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch beer recipes with related data
    const { data: recipes, error } = await supabase
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
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching beer recipes:', error);
      return {
        props: {
          recipes: [],
          error: error.message
        }
      };
    }

    // Transform the data to match our BeerRecipe interface
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

    return {
      props: {
        recipes: transformedRecipes
      }
    };
  } catch (error) {
    console.error('Exception fetching beer recipes:', error);
    return {
      props: {
        recipes: [],
        error: 'Failed to load recipes'
      }
    };
  }
};
