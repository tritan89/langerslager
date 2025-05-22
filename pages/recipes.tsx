// pages/recipes.tsx
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { supabase } from '@/utils/supabase'
import { Recipe } from '@/types/beer'

interface RecipesProps {
  recipes: Recipe[]
}

export default function Recipes({ recipes }: RecipesProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All')

  const filteredRecipes = filterDifficulty === 'All'
    ? recipes
    : recipes.filter(recipe => recipe.difficulty === filterDifficulty)

  return (
    <div className="min-h-screen bg-amber-50">
      <Head>
        <title>Recipes - Langer&apos;s Lager</title>
        <meta name="description" content="Delicious recipes featuring Langer's Lager beers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-amber-800 text-white">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Langer&apos;s Lager</div>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/" className="hover:text-amber-300">Home</Link></li>
                <li><Link href="/recipes" className="hover:text-amber-300">Recipes</Link></li>
                <li><Link href="/contact" className="hover:text-amber-300">Contact Us</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-amber-900 text-center">Cook With Our Beer</h1>
        <p className="text-lg mb-8 max-w-3xl mx-auto text-center">
          Discover delicious recipes that incorporate our craft beers, enhancing flavors and creating unforgettable culinary experiences.
        </p>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            {['All', 'Easy', 'Intermediate', 'Advanced'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setFilterDifficulty(difficulty)}
                className={`px-4 py-2 text-sm font-medium ${filterDifficulty === difficulty
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-700 hover:bg-amber-100'
                  } border border-amber-300 ${difficulty === 'All' ? 'rounded-l-md' : ''
                  } ${difficulty === 'Advanced' ? 'rounded-r-md' : ''
                  }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="h-48 bg-amber-200"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-amber-900">{recipe.title}</h2>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      recipe.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-900 mb-4">{recipe.description}</p>
                  <button
                    className="text-amber-600 font-semibold hover:text-amber-800"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg">No recipes available at the moment. Check back soon!</p>
          </div>
        )}

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-amber-900">{selectedRecipe.title}</h2>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${selectedRecipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    selectedRecipe.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {selectedRecipe.difficulty}
                  </span>
                </div>

                <p className="text-gray-900 mb-6">{selectedRecipe.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-amber-800">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-900">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2 text-amber-800">Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-gray-900">{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2 text-amber-800">Beer Pairing</h3>
                  <p className="text-gray-900">{selectedRecipe.pairing_notes}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold">Langer&apos;s Lager</p>
              <p>Crafting extraordinary beer experiences</p>
            </div>
            <div>
              <p>&copy; {new Date().getFullYear()} Langer&apos;s Lager. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recipes:', error);
      return {
        props: {
          recipes: []
        }
      };
    }

    return {
      props: {
        recipes: recipes || []
      }
    };
  } catch (error) {
    console.error('Exception fetching recipes:', error);
    return {
      props: {
        recipes: []
      }
    };
  }
};
