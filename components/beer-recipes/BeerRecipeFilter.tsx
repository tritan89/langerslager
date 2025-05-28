// components/beer-recipes/BeerRecipeFilter.tsx
interface BeerRecipeFilterProps {
  currentFilter: {
    difficulty: string;
    style: string;
  };
  onFilterChange: (filterType: 'difficulty' | 'style', value: string) => void;
  availableStyles: string[];
}

const BeerRecipeFilter: React.FC<BeerRecipeFilterProps> = ({ 
  currentFilter, 
  onFilterChange,
  availableStyles 
}) => {
  const difficulties = ['All', 'Easy', 'Intermediate', 'Advanced'];
  const styles = ['All', ...availableStyles];

  return (
    <div className="space-y-4 mb-8">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Difficulty</h3>
        <div className="inline-flex rounded-md shadow-sm">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onFilterChange('difficulty', difficulty)}
              className={`px-4 py-2 text-sm font-medium ${
                currentFilter.difficulty === difficulty
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-700 hover:bg-amber-100'
              } border border-amber-300 ${
                difficulty === 'All' ? 'rounded-l-md' : ''
              } ${
                difficulty === 'Advanced' ? 'rounded-r-md' : ''
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Style</h3>
        <select
          value={currentFilter.style}
          onChange={(e) => onFilterChange('style', e.target.value)}
          className="px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {styles.map((style) => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BeerRecipeFilter;
