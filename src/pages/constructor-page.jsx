import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import styles from './constructor-page.module.css'
import { Outlet } from 'react-router-dom'

export default function ConstructoPage() {

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </div>
      <Outlet/>
    </DndProvider> 
  )
}
