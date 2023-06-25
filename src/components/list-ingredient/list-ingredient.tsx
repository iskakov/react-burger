import styles from './list-ingredient.module.css'
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { CATEGORY_ON_RUSSIAN, IBurgerType, TYPE_OF_CATEGORY } from '../../utils/constants';
import React, { FC } from 'react';
interface IListIngredient {
  id: string,
  data: Array<IBurgerType>;
  scrollTo: (key: string) => void
}
const ListIngredient: FC<IListIngredient> = (props) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        if(isIntersecting ) {
          props.scrollTo(target.id);
        };
      });
    }, {
      threshold: [0.6, 1]
    })
    const bun = document.getElementById(TYPE_OF_CATEGORY.bun);
    const sauce = document.getElementById(TYPE_OF_CATEGORY.sauce);
    const main = document.getElementById(TYPE_OF_CATEGORY.main);
    if (bun && sauce && main) {
      observer.observe(bun);
      observer.observe(sauce);
      observer.observe(main);
    }

    return () => observer.disconnect();
  }, [props]);

  return (
    <section id={props.id} className={styles.main}>
      <span className='pt-10 text text_type_main-medium'>{CATEGORY_ON_RUSSIAN[props.id]}</span>
      <section>
        {props.data.map((item) => 
          (<BurgerIngredient key={item['_id']} ingredient={item} />)
        )}
      </section>
    </section>
  );
}
export default ListIngredient;
