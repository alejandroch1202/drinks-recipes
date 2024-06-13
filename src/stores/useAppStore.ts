import { create } from 'zustand'
import { createRecipesSlice, type RecipesSlice } from './recipeSlice'
import { createFavoritesSlice, type FavoritesSlice } from './favoritesSlice'
import {
  createNotificationsSlice,
  type NotificationsSlice
} from './notificationsSlice'
import { devtools } from 'zustand/middleware'

export const useAppStore = create<
  RecipesSlice & FavoritesSlice & NotificationsSlice
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationsSlice(...a)
  }))
)
