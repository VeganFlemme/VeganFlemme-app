export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface DailyMenu {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  totalNutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export function generateDailyMenu(recipes: Recipe[]): DailyMenu {
  const getRandom = () => recipes[Math.floor(Math.random() * recipes.length)];

  const breakfast = getRandom();
  let lunch = getRandom();
  let dinner = getRandom();

  // Optionally ensure different meals
  // Calculate total nutrition
  const totalNutrition = {
    calories: breakfast.calories + lunch.calories + dinner.calories,
    protein: breakfast.protein + lunch.protein + dinner.protein,
    fat: breakfast.fat + lunch.fat + dinner.fat,
    carbs: breakfast.carbs + lunch.carbs + dinner.carbs,
  };

  return { breakfast, lunch, dinner, totalNutrition };
}
