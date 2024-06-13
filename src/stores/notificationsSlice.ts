import type { StateCreator } from 'zustand'
import type { FavoritesSlice } from './favoritesSlice'

interface Notification {
  message: string
  error: boolean
  show: boolean
}

export interface NotificationsSlice {
  notification: Notification
  showNotification: (payload: Omit<Notification, 'show'>) => void
  hideNotification: () => void
}

export const createNotificationsSlice: StateCreator<
  NotificationsSlice & FavoritesSlice,
  [],
  [],
  NotificationsSlice
> = (set, get) => ({
  notification: { message: '', error: false, show: false },

  showNotification: ({ message, error }) => {
    set({
      notification: {
        message,
        error,
        show: true
      }
    })

    setTimeout(() => {
      get().hideNotification()
    }, 5000)
  },

  hideNotification: () => {
    set({
      notification: {
        message: '',
        error: false,
        show: false
      }
    })
  }
})
