import React from 'react'
import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import {TYPE_OF_CATEGORY} from '../../utils/constants'
import { getIngredients } from '../../utils/api'
import {BurgerConstructorContext} from '../../services/burger-constructor'
import { summReducer } from "../../reducers/summReducer";
import { OrderContext } from '../../services/order-context'

const App = () => {

  const [state, setState] = React.useState({
    isLoading: false,
    data: []
  });
  const [burgerConstructor, setBurgerConstructor] = React.useState([]);
  const [order, setOrder] = React.useState({});
  const [summ, summDispatch] = React.useReducer(summReducer, {summ: 0});

  React.useEffect(() => {
    const getData = async () => {
      try {
        setState({...state, isLoading: true})
        const data = await getIngredients();
        setState({
          isLoading: false,
          ...data,
          burgerConstructor: []
        })
      } catch (data) {
        setState({
          isLoading: false,
          success: false,
          errorMessage: data.message
        })
      }
    }
    getData();
  }, []);

  const addIngredient = (id) => {
    const ingredient = state.data.find(item => item['_id'] === id)
    if (ingredient.type === TYPE_OF_CATEGORY.bun) {
      let bunInConstructor = burgerConstructor.find(item => item.type === TYPE_OF_CATEGORY.bun);
      if (!bunInConstructor) {
        ingredient['__v'] += 2;
        if (burgerConstructor.length > 0) {
          burgerConstructor.splice(0, 0, ingredient);
        } else {
          burgerConstructor.push(ingredient);
        }
        summDispatch({type: 'inc', payload: ingredient.price * 2})
      } else {
        bunInConstructor = burgerConstructor.find(item => item.type === TYPE_OF_CATEGORY.bun && item['_id'] !== ingredient['_id']);
        if (bunInConstructor && bunInConstructor['_id'] !== ingredient['_id']) {
          bunInConstructor['__v'] -= 2;
          burgerConstructor.splice(burgerConstructor.indexOf(bunInConstructor), 1, ingredient);
          ingredient['__v'] += 2;
          summDispatch({type: 'inc', payload: ingredient.price * 2})
          summDispatch({type: 'dec', payload: bunInConstructor.price * 2})
        }
      }
    } else {
      ingredient['__v']++;
      burgerConstructor.push(ingredient);
      summDispatch({type: 'inc', payload: ingredient.price})
    }
    setState({...state})
    setBurgerConstructor([...burgerConstructor]);
    }
  const delIngredient = (id) => {
    const ingredient = state.data.find(item => item['_id'] === id.split('_')[0])
    if (ingredient['__v'] > 0) {
      ingredient['__v']--;
      burgerConstructor.splice(id.split('_')[1], 1);
      summDispatch({type: 'dec', payload: ingredient.price})
    }
    setState({...state})
    setBurgerConstructor([...burgerConstructor]);
  }

  return (
    <main>
      <AppHeader/>
      {state.isLoading ? (
        <div className={`${styles.main} ${styles.loading} text text_type_main-large`}> Идет загрузкка данных...</div>
      ) : state.success ? (
          <div className={styles.main}>
            <BurgerIngredients burgerIngredients={state.data} addIngredient={addIngredient}/>
            <BurgerConstructorContext.Provider value={{burgerConstructor, summ}}>
              <OrderContext.Provider value={{order, setOrder}}>
                <BurgerConstructor delIngredient={delIngredient}/>
              </OrderContext.Provider>
            </BurgerConstructorContext.Provider>
          </div>
        ) : (
          <div className={`${styles.main} ${styles.error} text text_type_main-large`} > {state.errorMessage}</div>
        )}
    </main>
  )
}

export default App;
