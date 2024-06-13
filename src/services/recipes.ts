import axios from 'axios'
import {
  categoriesApiSchema,
  drinksApiSchema,
  recipeApiSchema
} from '../schemas/recipes'
import type { Drink, SearchFilters } from '../types'

export const getCategories = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
  const { data } = await axios.get(url)
  const result = categoriesApiSchema.safeParse(data)

  if (result.success) {
    return result.data
  }
}

export const getDrinks = async ({ ingredient, category }: SearchFilters) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&&i=${ingredient}`
  const { data } = await axios.get(url)
  const result = drinksApiSchema.safeParse(data)

  if (result.success) {
    return result.data
  }
}

export const getRecipe = async (id: Drink['idDrink']) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const { data } = await axios.get(url)

  const result = recipeApiSchema.safeParse(data.drinks[0])

  if (result.success) {
    return result.data
  }
}
