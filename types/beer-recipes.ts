// types/beer-recipes.ts
export interface BeerRecipe {
  id: number;
  title: string;
  description: string;
  style: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  
  // Brewing specifications
  grains: GrainBill[];
  hops: HopSchedule[];
  additional_ingredients: AdditionalIngredient[];
  water_amount: {
    mash: number;
    sparge: number;
    total: number;
  };
  mash_time: number;
  mash_temp: number;
  boil_time: number;
  yeast: {
    name: string;
    amount: string;
    temperature: number;
  };
  
  // Results
  original_gravity: number;
  final_gravity: number;
  abv: number;
  ibu: number;
  srm: number;
  
  additional_notes: string;
  image_url?: string;
  created_at: string;
}

export interface GrainBill {
  id?: number;
  grain_name: string;
  amount: number;
  percentage: number;
}

export interface HopSchedule {
  id?: number;
  hop_name: string;
  amount: number;
  time: number;
  usage: 'Boil' | 'Dry Hop' | 'Whirlpool';
}

export interface AdditionalIngredient {
  id?: number;
  ingredient_name: string;
  amount: string;
  timing: string;
}
