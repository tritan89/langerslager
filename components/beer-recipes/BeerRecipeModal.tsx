// components/beer-recipes/BeerRecipeModal.tsx
import { BeerRecipe } from '@/types/beer-recipes';
import GrainBillSection from './recipe-sections/GrainBillSection';
import HopScheduleSection from './recipe-sections/HopScheduleSection';
import { WaterProfileSection, MashSection, FermentationSection } from './recipe-sections/WaterProfileSection.tsx';
import RecipeStatsSection from './recipe-sections/RecipeStatsSection';

interface BeerRecipeModalProps {
  recipe: BeerRecipe | null;
  onClose: () => void;
}

const BeerRecipeModal: React.FC<BeerRecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-white border-b border-amber-200 p-6 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-amber-900">{recipe.title}</h2>
              <p className="text-amber-700">{recipe.style}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <RecipeStatsSection
            originalGravity={recipe.original_gravity}
            finalGravity={recipe.final_gravity}
            abv={recipe.abv}
            ibu={recipe.ibu}
            srm={recipe.srm}
          />
        </div>
        
        <div className="overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-amber-800 mb-2">Description</h3>
            <p className="text-gray-700">{recipe.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <GrainBillSection grains={recipe.grains} />
            <HopScheduleSection hops={recipe.hops} boilTime={recipe.boil_time} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <WaterProfileSection waterAmount={recipe.water_amount} />
            <MashSection mashTemp={recipe.mash_temp} mashTime={recipe.mash_time} />
          </div>
          
          <FermentationSection yeast={recipe.yeast} boilTime={recipe.boil_time} />
          
          {recipe.additional_ingredients.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-800">Additional Ingredients</h3>
              <div className="bg-amber-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {recipe.additional_ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span className="font-medium text-gray-900">{ingredient.ingredient_name}</span>
                      <span className="text-gray-700">{ingredient.amount} - {ingredient.timing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {recipe.additional_notes && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-amber-800">Brewer's Notes</h3>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{recipe.additional_notes}</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-4 pt-4 border-t border-amber-200">
            <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg">
              Print Recipe
            </button>
            <button className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-3 px-6 rounded-lg">
              Scale Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerRecipeModal;
