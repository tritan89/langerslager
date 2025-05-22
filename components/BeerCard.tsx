// components/BeerCard.tsx
import Image from 'next/image';

interface BeerCardProps {
  name: string;
  style: string;
  abv: number;
  description: string;
  season: string;
  imageUrl: string;
}

const BeerCard: React.FC<BeerCardProps> = ({ 
  name, 
  style, 
  abv, 
  description, 
  season, 
  imageUrl 
}) => {
  return (
    <div className="bg-amber-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="h-40 rounded-md mb-4 relative overflow-hidden">
        <Image
          src={`/images/${imageUrl}`}
          alt={`${name} beer`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-amber-900">{name}</h3>
        <span className="text-sm font-semibold text-amber-700 bg-amber-200 px-2 py-1 rounded">
          {abv}% ABV
        </span>
      </div>
      <p className="text-sm font-medium text-amber-700 mb-2 capitalize">
        {style} • {season}
      </p>
      <p className="text-amber-800 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default BeerCard;
