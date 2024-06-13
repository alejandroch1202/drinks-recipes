import { useAppStore } from '../../stores/useAppStore'
import type { Drink } from '../../types'

export const DrinkCard = ({ drink }: { drink: Drink }) => {
  const selectRecipe = useAppStore((state) => state.selectRecipe)

  const handleClick = () => {
    selectRecipe(drink.idDrink)
  }

  return (
    <div className='border shadow-lg rounded-lg overflow-hidden'>
      <div className='overflow-hidden'>
        <img
          className='hover:scale-125 transition-transform hover:rotate-2'
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
        />
      </div>

      <div className='p-5'>
        <h2 className='text-2xl truncate font-black'>{drink.strDrink}</h2>
        <button
          onClick={handleClick}
          className='bg-orange-500 hover:bg-orange-600 rounded mt-5 text-white w-full text-lg font-bold p-3'
          type='button'
        >
          Ver receta
        </button>
      </div>
    </div>
  )
}
