import type { StateCreator } from 'zustand'
import type { Recipe } from '../types'
import {
  createNotificationsSlice,
  type NotificationsSlice
} from './notificationsSlice'

export interface FavoritesSlice {
  favorites: Recipe[]
  isFavorite: (id: Recipe['idDrink']) => boolean
  toggleFavorite: (recipe: Recipe) => void
  loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<
  FavoritesSlice & NotificationsSlice,
  [],
  [],
  FavoritesSlice
> = (set, get, api) => ({
  favorites: [],

  isFavorite: (id) => get().favorites.some((item) => item.idDrink === id),

  toggleFavorite: (recipe) => {
    if (get().isFavorite(recipe.idDrink)) {
      set({
        favorites: get().favorites.filter(
          (item) => item.idDrink !== recipe.idDrink
        )
      })

      createNotificationsSlice(set, get, api).showNotification({
        message: 'Receta eliminada de favoritos',
        error: false
      })
    } else {
      set({ favorites: [...get().favorites, recipe] })

      createNotificationsSlice(set, get, api).showNotification({
        message: 'Receta agregada a favoritos',
        error: false
      })
    }

    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },

  loadFromStorage: () => {
    set({ favorites: JSON.parse(localStorage.getItem('favorites') ?? '[]') })
  }
})
