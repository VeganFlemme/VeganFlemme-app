import { create } from 'zustand'

/**
 * Exemple de store Zustand pour gérer des préférences utilisateur.
 * Vous pourrez enrichir ce store avec les options de personnalisation
 * (allergies, objectifs nutritionnels, etc.).
 */
interface PreferencesState {
  calorieTarget: number | null
  setCalorieTarget: (target: number) => void
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  calorieTarget: null,
  setCalorieTarget: (target: number) => set({ calorieTarget: target }),
}))