import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../../stores/useAppStore'

export const Header = () => {
  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])
  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)
  const showNotification = useAppStore((state) => state.showNotification)
  const categories = useAppStore((state) => state.categories)
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setSearchFilters({
      ...searchFilters,
      [name]: value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.values(searchFilters).includes('')) {
      showNotification({
        message: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    searchRecipes(searchFilters)
  }

  return (
    <header
      className={
        isHome ? 'bg-header bg-center bg-cover bg-no-repeat' : 'bg-slate-800'
      }
    >
      <div className='mx-auto container px-5 py-16'>
        <div className='flex justify-between items-center'>
          <div>
            <img
              className='w-32'
              src='/logo.svg'
              alt='logotipo'
            />
          </div>

          <nav className='text-white flex gap-5 uppercase font-black text-xl'>
            <NavLink
              className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              to={'/'}
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'text-orange-400' : '')}
              to={'favoritos'}
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            onSubmit={handleSubmit}
            className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6'
          >
            <div className='space-y-4'>
              <label
                className='block text-white uppercase font-extrabold text-lg'
                htmlFor='ingredient'
              >
                Nombre o Ingrediente
              </label>

              <input
                type='text'
                id='ingredient'
                name='ingredient'
                className='p-3 w-full rounded-lg focus:outline-none'
                placeholder='Ej. Vodka, Tequila, Café'
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className='space-y-4'>
              <label
                className='block text-white uppercase font-extrabold text-lg'
                htmlFor='category'
              >
                Categoría
              </label>

              <select
                id='category'
                name='category'
                className='p-3 w-full rounded-lg focus:outline-none'
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value=''>Seleccionar</option>

                {categories.drinks.map(({ strCategory }) => (
                  <option
                    key={strCategory}
                    value={strCategory}
                  >
                    {strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              className='bg-orange-800 hover:bg-orange-900 text-white uppercase font-extrabold p-3 w-full rounded-lg focus:outline-none cursor-pointer'
              type='submit'
              value={'Buscar recetas'}
            />
          </form>
        )}
      </div>
    </header>
  )
}
