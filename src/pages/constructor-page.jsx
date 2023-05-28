import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import styles from './constructor-page.module.css'
import Modal from '../components/modal/modal'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CLEAR_IGREDIENT } from '../services/actions/burger-ingredient'

export default function ConstructoPage() {
  const {state} = useLocation();
  const [isModalIngredient, setIsModalIngredient] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onClose = () => {
    dispatch({type: CLEAR_IGREDIENT})
    setIsModalIngredient(false);
    const initialState = [{ path: '/', url: '/', title: 'mainPage' }];

    navigate('/', { replace:true, state:initialState })
  }
  useEffect(() => {
    if (state) {
      setIsModalIngredient(state[0].url !== '/')
    }
  }, [state]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
      {isModalIngredient && (
        <Modal header='Детали ингредиента' onClose={onClose}>
          <Outlet />
        </Modal>
      )}
    </DndProvider> 
    </>
    
  )
}
