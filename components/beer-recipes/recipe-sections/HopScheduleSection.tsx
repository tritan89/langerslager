// components/beer-recipes/recipe-sections/HopScheduleSection.tsx
import { HopSchedule } from '@/types/beer-recipes';

interface HopScheduleSectionProps {
  hops: HopSchedule[];
  boilTime: number;
}

const HopScheduleSection: React.FC<HopScheduleSectionProps> = ({ hops, boilTime }) => {
  const sortedHops = [...hops].sort((a, b) => b.time - a.time);
  
  const getUsageColor = (usage: string) => {
    switch (usage) {
      case 'Boil': return 'bg-blue-100 text-blue-800';
      case 'Whirlpool': return 'bg-purple-100 text-purple-800';
      case 'Dry Hop': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-amber-800">Hop Schedule</h3>
      
      <div className="bg-amber-50 rounded-lg p-4">
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-amber-300"></div>
          
          {/* Time markers */}
          <div className="flex justify-between mb-8 relative">
            <div className="text-xs text-gray-600">
              <div className="w-2 h-2 bg-amber-600 rounded-full mb-1"></div>
              {boilTime} min
            </div>
            <div className="text-xs text-gray-600">
              <div className="w-2 h-2 bg-amber-600 rounded-full mb-1 ml-auto"></div>
              0 min
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {sortedHops.map((hop, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-amber-200 pb-2">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{hop.hop_name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded ${getUsageColor(hop.usage)}`}>
                    {hop.usage}
                  </span>
                  <span className="text-xs text-gray-600">
                    @ {hop.time} min
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-amber-900">{hop.amount} oz</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HopScheduleSection;
