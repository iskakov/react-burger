import React, { Component } from 'react'
import AppHeader from '../app-header/app-header'
import data from '../../utils/data'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'

export default class App extends Component {
  state= {
    burgerIngredients: data,
    burgerConstructor: []
  };

  addIngredient = (id) => {
    this.setState((prevState)=> {
      const burgerConstructor = prevState.burgerConstructor;
      const ingredient = prevState.burgerIngredients.find(item => item['_id'] === id)
      if (ingredient.type === 'bun') {
        const bunInConstructor =  burgerConstructor.find(item => item.type === 'bun' && item['_id'] !== ingredient['_id']);
        if (!bunInConstructor) {
          ingredient['__v'] += 2;
          burgerConstructor.push(ingredient);
          burgerConstructor.push(ingredient);
        } else {
          if (bunInConstructor['_id'] !== ingredient['_id']) {
            bunInConstructor['__v']--;
            burgerConstructor.splice(burgerConstructor.indexOf(bunInConstructor), 1, ingredient);
            ingredient['__v']++;
          }
        }
      } else {
        ingredient['__v']++;
        burgerConstructor.splice(burgerConstructor.length-1, 0, ingredient);
      }
      return {...prevState, burgerConstructor};
    })
  }
  delIngredient = (id) => {
    this.setState((prevState)=> {
      let burgerConstructor = prevState.burgerConstructor;
      let ingredient = prevState.burgerIngredients.find(item => item['_id'] === id.split('_')[0])
      if (ingredient['__v'] > 0) {
        ingredient['__v']--;
        burgerConstructor.splice(id.split('_')[1], 1);
      }
      return {...prevState, burgerConstructor};
    })
  }

  render() {
    return (
      <main>
        <AppHeader/>
        <div className={styles.main}>
          <BurgerIngredients burgerIngredients={this.state.burgerIngredients} addIngredient={this.addIngredient}/>
          <BurgerConstructor burgerConstructor={this.state.burgerConstructor} delIngredient={this.delIngredient}/>
        </div>
      </main>
    )
  }
}
