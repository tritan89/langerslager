// components/beer-recipes/recipe-sections/RecipeStatsSection.tsx
interface RecipeStatsSectionProps {
  originalGravity: number;
  finalGravity: number;
  abv: number;
  ibu: number;
  srm: number;
}

const RecipeStatsSection: React.FC<RecipeStatsSectionProps> = ({
  originalGravity,
  finalGravity,
  abv,
  ibu,
  srm
}) => {
  const getSrmColor = (srm: number) => {
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
    <div className="bg-amber-100 rounded-lg p-4">
      <div className="grid grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">OG</div>
          <div className="text-lg font-bold text-amber-900">{originalGravity.toFixed(3)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">FG</div>
          <div className="text-lg font-bold text-amber-900">{finalGravity.toFixed(3)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">ABV</div>
          <div className="text-lg font-bold text-amber-900">{abv}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">IBU</div>
          <div className="text-lg font-bold text-amber-900">{ibu}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">SRM</div>
          <div className="flex items-center justify-center">
            <div 
              className="w-8 h-8 rounded-full border-2 border-amber-800"
              style={{ backgroundColor: getSrmColor(srm) }}
            ></div>
            <span className="ml-2 text-lg font-bold text-amber-900">{srm}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeStatsSection;
