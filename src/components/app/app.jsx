import React from 'react'
import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const App = () => {

  return (
    <main>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </div>
      </DndProvider>
    </main>
  )
}

export default App;
