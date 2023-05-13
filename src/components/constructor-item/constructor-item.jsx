import React from 'react'
import styles from './constructor-item.module.css'
import { BURGER_INGREDIENT_TYPE, TYPE_OF_CATEGORY } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { delIngredient, sortingIngredients } from '../../services/reducers/burger-constructor';
import PropTypes from 'prop-types'

export default function ConstructorItem({index, ingredient, lastIndex}) {
  const dispatch = useDispatch();

  const delIngredientAction = (item, index) => {
    dispatch(delIngredient(item, false, index))
  }
  const ref = React.useRef(null)
  const [{ isDrag }, drag] = useDrag({
    type: 'constructorIngredients',
    item: () => {
      return { id: ingredient['_id'], order: ingredient.order }
    },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const [{handlerId}, drop] = useDrop({
    accept: "constructorIngredients",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.order
      const hoverIndex = ingredient.order
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      chageOrder(dragIndex, hoverIndex)
      item.order = hoverIndex
    },
  })
  drag(drop(ref))
  const chageOrder = React.useCallback((dragIndex,hoverIndex) => {
    dispatch(sortingIngredients(dragIndex, hoverIndex))
  },[]) 

  return (
    <section draggable ref={ingredient.type !== TYPE_OF_CATEGORY.bun ? ref : null} style={{opacity: isDrag ? 0 : 1}} data-handler-id={handlerId}
    key={ingredient['_id'] + '_' + index} className={styles['constructor-element'] + (ingredient.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
      {ingredient.type !== TYPE_OF_CATEGORY.bun && (
        <div className='mr-2'>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
      type={ingredient.type === TYPE_OF_CATEGORY.bun ? (index === 0 ? 'top' : index + 1  === lastIndex ? 'bottom' : '') : ''}
      isLocked={ingredient.type === TYPE_OF_CATEGORY.bun}
      text={ingredient.name + (ingredient.type === TYPE_OF_CATEGORY.bun ? (index === 0 ? ' (верх)' : index + 1 === lastIndex ? ' (низ)' : '') : '')}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={e => delIngredientAction(ingredient, index)} />
    </section>
  )
}

ConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  ingredient: BURGER_INGREDIENT_TYPE.isRequired,
}
