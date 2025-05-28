// components/beer-recipes/BeerRecipeGrid.tsx
import { BeerRecipe } from '@/types/beer-recipes';
import BeerRecipeCard from './BeerRecipeCard';

interface BeerRecipeGridProps {
  recipes: BeerRecipe[];
  onRecipeClick: (recipe: BeerRecipe) => void;
}

const BeerRecipeGrid: React.FC<BeerRecipeGridProps> = ({ recipes, onRecipeClick }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-amber-700 text-lg">No recipes found matching your filters.</p>
        <p className="text-gray-600 mt-2">Try adjusting your filters or check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <BeerRecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
};

export default BeerRecipeGrid;
