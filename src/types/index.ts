import type { z } from 'zod'
import type {
  categoriesApiSchema,
  drinkApiSchema,
  drinksApiSchema,
  recipeApiSchema,
  searchFiltersSchema
} from '../schemas/recipes'

export type Categories = z.infer<typeof categoriesApiSchema>

export type SearchFilters = z.infer<typeof searchFiltersSchema>

export type Drink = z.infer<typeof drinkApiSchema>

export type Drinks = z.infer<typeof drinksApiSchema>

export type Recipe = z.infer<typeof recipeApiSchema>
