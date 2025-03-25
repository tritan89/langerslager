// components/BeerCard.tsx
import Image from 'next/image';

interface BeerCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

const BeerCard: React.FC<BeerCardProps> = ({ name, description, imageUrl }) => {
  return (
    <div className="bg-amber-100 rounded-lg p-6 shadow-md">
      <div className="h-40 rounded-md mb-4 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${name} beer`}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 text-amber-900">{name}</h3>
      <p className="text-amber-800">{description}</p>
    </div>
  );
};

export default BeerCard;
