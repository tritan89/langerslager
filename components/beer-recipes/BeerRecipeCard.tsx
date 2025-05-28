// components/beer-recipes/BeerRecipeCard.tsx
import { BeerRecipe } from '@/types/beer-recipes';

interface BeerRecipeCardProps {
  recipe: BeerRecipe;
  onClick: (recipe: BeerRecipe) => void;
}

const BeerRecipeCard: React.FC<BeerRecipeCardProps> = ({ recipe, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSrmColor = (srm: number) => {
    // Approximate beer color based on SRM value
    if (srm <= 3) return '#F3E5AB';
    if (srm <= 6) return '#EACE3F';
    if (srm <= 9) return '#E5AA28';
    if (srm <= 12) return '#D58936';
    if (srm <= 15) return '#BF6938';
    if (srm <= 18) return '#9B4A39';
    if (srm <= 24) return '#6B2A32';
    if (srm <= 30) return '#451A25';
    return '#251013';
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
      onClick={() => onClick(recipe)}
    >
      <div className="h-32 relative" style={{ backgroundColor: getSrmColor(recipe.srm) }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-amber-900 mb-1">{recipe.title}</h3>
        <p className="text-sm font-medium text-amber-700 mb-3">{recipe.style}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xs text-gray-600">ABV</div>
            <div className="text-sm font-bold text-amber-800">{recipe.abv}%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600">IBU</div>
            <div className="text-sm font-bold text-amber-800">{recipe.ibu}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-600">SRM</div>
            <div className="text-sm font-bold text-amber-800">{recipe.srm}</div>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2">{recipe.description}</p>
        
        <button className="mt-3 text-amber-600 font-semibold hover:text-amber-800 text-sm">
          View Recipe →
        </button>
      </div>
    </div>
  );
};

export default BeerRecipeCard;
