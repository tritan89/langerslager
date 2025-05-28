// components/beer-recipes/recipe-sections/GrainBillSection.tsx
import { GrainBill } from '@/types/beer-recipes';

interface GrainBillSectionProps {
  grains: GrainBill[];
}

const GrainBillSection: React.FC<GrainBillSectionProps> = ({ grains }) => {
  const totalWeight = grains.reduce((sum, grain) => sum + grain.amount, 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800">Grain Bill</h3>
      
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="mb-3">
          <span className="text-sm font-medium text-gray-700">Total Grain Weight: </span>
          <span className="font-bold text-amber-900">{totalWeight.toFixed(2)} lbs</span>
        </div>
        
        <div className="space-y-2">
          {grains.map((grain, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{grain.grain_name}</span>
                  <span className="text-sm text-gray-700">{grain.amount} lbs ({grain.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{ width: `${grain.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrainBillSection;
