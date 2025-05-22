// types/beer.ts
export interface Beer {
  id: number;
  name: string;
  style: string;
  abv: number;
  description: string;
  season: string;
  hops: string;
  malts: string;
  extras: string;
  imageUrl: string;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  beerType: string;
  quantity: string;
  occasion: string;
  message: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  ingredients: string[];
  instructions: string[];
  pairing_notes: string;
  image_url?: string;
  created_at: string;
}
