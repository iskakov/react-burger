import React from 'react'
import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {TYPE_OF_CATEGORY} from '../../utils/constants'

const App = () => {

  const [state, setState] = React.useState({
    burgerIngredients: [],
    burgerConstructor: []
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const data = await fetchedData.json();
        setState({
          burgerIngredients: data.data,
          success: data.success,
          burgerConstructor: []
        })
      } catch (e) {
        setState({
          isError: true,
          errorMessage: 'Не удалось загрузить данные'
        })
      }
    }
    getData();
  }, []);

  const addIngredient = (id) => {
    const burgerConstructor = state.burgerConstructor;
    const ingredient = state.burgerIngredients.find(item => item['_id'] === id)
    if (ingredient.type === TYPE_OF_CATEGORY.bun) {
      let bunInConstructor = burgerConstructor.find(item => item.type === TYPE_OF_CATEGORY.bun);
      if (!bunInConstructor) {
        ingredient['__v'] += 2;
        if (burgerConstructor.length > 0) {
          burgerConstructor.splice(burgerConstructor.indexOf(bunInConstructor), 0, ingredient);
        } else {
          burgerConstructor.push(ingredient);
        }
        burgerConstructor.push(ingredient);
      } else {
        bunInConstructor = burgerConstructor.find(item => item.type === TYPE_OF_CATEGORY.bun && item['_id'] !== ingredient['_id']);
        if (bunInConstructor && bunInConstructor['_id'] !== ingredient['_id']) {
          bunInConstructor['__v']--;
          burgerConstructor.splice(burgerConstructor.indexOf(bunInConstructor), 1, ingredient);
          ingredient['__v']++;
        }
      }
    } else {
      ingredient['__v']++;
      burgerConstructor.splice(burgerConstructor.length-1, 0, ingredient);
    }

    setState({...state, burgerConstructor});
    }
  const delIngredient = (id) => {
    const burgerConstructor = state.burgerConstructor;
    const ingredient = state.burgerIngredients.find(item => item['_id'] === id.split('_')[0])
    if (ingredient['__v'] > 0) {
      ingredient['__v']--;
      burgerConstructor.splice(id.split('_')[1], 1);
    }
    setState({...state, burgerConstructor});
  }

  return (
    <main>
      <AppHeader/>
      <div className={styles.main}>
        <BurgerIngredients burgerIngredients={state.burgerIngredients} addIngredient={addIngredient}/>
        <BurgerConstructor burgerConstructor={state.burgerConstructor} delIngredient={delIngredient}/>
      </div>
    </main>
  )
}

export default App;
