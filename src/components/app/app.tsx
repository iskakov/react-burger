import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routes/routes';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { getBurgerIngredients } from '../../services/store';

const App: FC = () => {
  const {ingredients} = useAppSelector(getBurgerIngredients)
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients())
    }
  }, [ingredients, dispatch]);
  return (
    <main>
      <BrowserRouter basename='/react-burger'>
        <Routes/>
      </BrowserRouter>
    </main>
  )
}

export default App;
