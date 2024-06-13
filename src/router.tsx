import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Layout } from './layouts'

const Favorites = lazy(async () => await import('./pages/Favorites'))

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            path='/'
            element={<Home />}
          />

          <Route
            path='/favoritos'
            element={
              <Suspense fallback='Cargando...'>
                <Favorites />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
