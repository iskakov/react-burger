import React, { FC } from 'react'
import styles from './feed-ingredients.module.css'
import { IBurgerType } from '../../utils/constants'

interface IFeedIngredients {
  ingredients: Array<IBurgerType>;
}
const showedIngredients = 6;
const FeedIngredients: FC<IFeedIngredients> = ({ingredients}) => {

  return (
    <section className={styles.main + ' mr-2'}>
      {ingredients.slice(0, showedIngredients).map((ingredient, index) => (
        <section key={ingredient['_id'] + ' ' + index} className={styles.ingredient}>
          <img className={styles.img} alt='ingredient' src={typeof ingredient === 'object' ? ingredient.image_mobile : ''}/>
          {index === showedIngredients-1 && ingredients.length - showedIngredients !== 0 &&(
            <section className={styles.counter}>
              <span className='text text_type_main-default' > +{ingredients.length - showedIngredients}</span>
            </section>
          )}
        </section>
      ))}
    </section>
  )
}
export default FeedIngredients
