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
  quantity: '5' | '10';
  occasion: string;
  eventDate: string;
  message: string;
}

export type OrderStatus = 'submitted' | 'brewing' | 'fermenting' | 'ready'

export interface Order {
  id: number
  name: string
  email: string
  phone: string | null
  beer_type: string
  quantity: string
  occasion: string | null
  message: string | null
  status: OrderStatus
  created_at: string
  updated_at: string
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
