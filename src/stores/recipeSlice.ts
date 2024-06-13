import type { StateCreator } from 'zustand'
import type { Categories, Drink, Drinks, Recipe, SearchFilters } from '../types'
import { getCategories, getDrinks, getRecipe } from '../services/recipes'
import { initialRecipe } from '../data/constants'

export interface RecipesSlice {
  categories: Categories
  drinks: Drinks
  recipe: Recipe
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilters: SearchFilters) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => void
  closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSlice> = (set) => ({
  categories: { drinks: [] },
  drinks: { drinks: [] },
  modal: false,
  recipe: initialRecipe,

  fetchCategories: async () => {
    const categories = await getCategories()
    set({ categories })
  },

  searchRecipes: async (searchFilters) => {
    const drinks = await getDrinks(searchFilters)
    set({ drinks })
  },

  selectRecipe: async (id) => {
    const recipe = await getRecipe(id)
    set({ recipe, modal: true })
  },

  closeModal: () => {
    set(() => ({ modal: false, recipe: initialRecipe }))
  }
})
