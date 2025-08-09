import create from 'zustand'

interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  fat: number
  carbs: number
}

interface DailyMenu {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  totalNutrition: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
}

interface MenuStore {
  dailyMenu: DailyMenu | null
  weeklyMenu: DailyMenu[]
  loading: boolean
  error: string | null
  generateDailyMenu: () => Promise<void>
  generateWeeklyMenu: () => Promise<void>
}

export const useMenuStore = create<MenuStore>((set) => ({
  dailyMenu: null,
  weeklyMenu: [],
  loading: false,
  error: null,
  generateDailyMenu: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/generate-menu')
      if (!res.ok) throw new Error('Failed to fetch menu')
      const data = await res.json()
      set({ dailyMenu: data.menu, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },
  generateWeeklyMenu: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('/api/generate-menu?week=true')
      if (!res.ok) throw new Error('Failed to fetch weekly menu')
      const data = await res.json()
      set({ weeklyMenu: data.weeklyMenu, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },
}))
