// components/beer-recipes/recipe-sections/WaterProfileSection.tsx
interface WaterProfileSectionProps {
  waterAmount: {
    mash: number;
    sparge: number;
    total: number;
  };
}

export const WaterProfileSection: React.FC<WaterProfileSectionProps> = ({ waterAmount }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800">Water Profile</h3>
      
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-900">{waterAmount.mash}</div>
            <div className="text-sm text-gray-600">Mash (gal)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-900">{waterAmount.sparge}</div>
            <div className="text-sm text-gray-600">Sparge (gal)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-900">{waterAmount.total}</div>
            <div className="text-sm text-gray-600">Total (gal)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/beer-recipes/recipe-sections/MashSection.tsx
interface MashSectionProps {
  mashTemp: number;
  mashTime: number;
}

export const MashSection: React.FC<MashSectionProps> = ({ mashTemp, mashTime }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800">Mash Details</h3>
      
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900">{mashTemp}°F</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900">{mashTime} min</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// components/beer-recipes/recipe-sections/FermentationSection.tsx
interface FermentationSectionProps {
  yeast: {
    name: string;
    amount: string;
    temperature: number;
  };
  boilTime: number;
}

export const FermentationSection: React.FC<FermentationSectionProps> = ({ yeast, boilTime }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800">Fermentation</h3>
      
      <div className="bg-amber-50 rounded-lg p-4 space-y-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Yeast</div>
          <div className="font-bold text-amber-900">{yeast.name}</div>
          <div className="text-sm text-gray-700">{yeast.amount}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Fermentation Temp</div>
            <div className="text-xl font-bold text-amber-900">{yeast.temperature}°F</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Boil Time</div>
            <div className="text-xl font-bold text-amber-900">{boilTime} min</div>
          </div>
        </div>
      </div>
    </div>
  );
};
