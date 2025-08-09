/**
 * Définition des types de base utilisés dans l'application.
 */

/**
 * Représente un ingrédient importé depuis Supabase.
 */
export interface Ingredient {
  id: number
  name: string
  unit: string
  calories: number
  protein: number
  fat: number
  carbs: number
}

/**
 * Représente une recette et ses ingrédients.
 */
export interface Recipe {
  id: number
  name: string
  instructions: string
  ingredients: Array<{ ingredientId: number; quantity: number }>
}