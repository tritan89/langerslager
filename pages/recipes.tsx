import Head from 'next/head'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { NavBar, Footer } from '../components/Layout'
import { supabase } from '@/utils/supabase'
import { Recipe } from '@/types/beers'

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
    <div className="min-h-screen bg-paper font-sans text-ink relative overflow-hidden">
      <Head>
        <title>Recipes — Langer&apos;s Lager</title>
        <meta name="description" content="Delicious recipes featuring Langer's Lager beers" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>

      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      <div className="relative z-2 bg-paper">
        <NavBar active="Recipes" onPaper />
      </div>

      {/* Header */}
      <section className="relative z-2 px-14 pt-[100px] pb-[60px]">
        <div className="eyebrow mb-5">Recipes &amp; pairings</div>
        <h1 className="text-[96px] font-bold m-0 tracking-[-0.035em] leading-[0.9] max-w-[900px]">
          Cook with<br />
          <span className="italic font-medium text-moss">our beer</span>.
        </h1>
        <p className="text-lg leading-relaxed mt-8 max-w-[560px] text-ink opacity-75">
          Discover delicious recipes that incorporate our craft beers, enhancing
          flavors and creating unforgettable culinary experiences.
        </p>
      </section>

      {/* Filter bar */}
      <section className="relative z-2 px-14 pb-12">
        <div className="flex gap-4 border-b-2 border-ink pb-4">
          {['All', 'Easy', 'Intermediate', 'Advanced'].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(d)}
              className={`font-mono text-[11px] tracking-[0.14em] uppercase px-4 py-2 cursor-pointer transition-colors border-none ${
                filterDifficulty === d
                  ? 'bg-ink text-paper font-bold'
                  : 'bg-transparent text-ink font-medium opacity-70 hover:opacity-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Recipe grid */}
      <section className="relative z-2 px-14 pb-[100px]">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-3 border-t border-l border-ink">
            {filteredRecipes.map((recipe, i) => (
              <article
                key={recipe.id}
                className="border-r border-b border-ink bg-paper cursor-pointer hover:bg-paper2 transition-colors"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className={`h-[200px] relative overflow-hidden ${
                  ['bg-moss', 'bg-ocean', 'bg-kelp'][i % 3]
                }`}>
                  <div className="absolute inset-0 dots-overlay opacity-22" />
                  <div className="absolute bottom-4 left-6 font-mono text-[10px] tracking-[0.18em] uppercase text-paper/85">
                    [ recipe photo ]
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex justify-between items-start mb-3">
                    <div className="index-tag">№ {String(i + 1).padStart(3, '0')}</div>
                    <div className={`font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-[3px] border ${
                      recipe.difficulty === 'Easy'
                        ? 'border-moss text-moss'
                        : recipe.difficulty === 'Intermediate'
                        ? 'border-ocean text-ocean'
                        : 'border-rust text-rust'
                    }`}>
                      {recipe.difficulty}
                    </div>
                  </div>
                  <h3 className="text-[26px] font-bold mb-3 tracking-[-0.02em] leading-[1.1]">
                    {recipe.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink opacity-75 mb-5">
                    {recipe.description}
                  </p>
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink border-b border-ink pb-0.5 w-fit">
                    View recipe →
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-ink opacity-60">
              No recipes available at the moment. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-8 z-50"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-paper border-[1.5px] border-ink max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`inline-block font-mono text-[10px] tracking-[0.14em] uppercase px-2 py-[3px] border mb-3 ${
                    selectedRecipe.difficulty === 'Easy'
                      ? 'border-moss text-moss'
                      : selectedRecipe.difficulty === 'Intermediate'
                      ? 'border-ocean text-ocean'
                      : 'border-rust text-rust'
                  }`}>
                    {selectedRecipe.difficulty}
                  </div>
                  <h2 className="text-[36px] font-bold tracking-[-0.02em] leading-[1.1]">
                    {selectedRecipe.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="bg-transparent border-none text-ink opacity-50 hover:opacity-100 cursor-pointer text-2xl transition-opacity"
                >
                  ×
                </button>
              </div>

              <p className="text-base leading-relaxed text-ink opacity-80 mb-8">
                {selectedRecipe.description}
              </p>

              <div className="mb-8">
                <div className="eyebrow mb-4">Ingredients</div>
                <ul className="list-none p-0 m-0 border-t border-ink/15">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="py-2 border-b border-ink/10 text-sm">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <div className="eyebrow mb-4">Instructions</div>
                <ol className="list-none p-0 m-0">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-4 py-3 border-b border-ink/10">
                      <span className="font-mono text-sm font-semibold text-ocean shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-kelp/10 p-6 border border-kelp/20">
                <div className="eyebrow text-kelp mb-3">Beer pairing</div>
                <p className="text-sm leading-relaxed m-0">
                  {selectedRecipe.pairing_notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching recipes:', error)
      return { props: { recipes: [] } }
    }

    return { props: { recipes: recipes || [] } }
  } catch (error) {
    console.error('Exception fetching recipes:', error)
    return { props: { recipes: [] } }
  }
}
