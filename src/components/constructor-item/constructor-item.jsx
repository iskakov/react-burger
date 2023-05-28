import React from 'react'
import styles from './constructor-item.module.css'
import { BURGER_INGREDIENT_TYPE, TYPE_OF_CATEGORY } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { delIngredient, sortingIngredients } from '../../services/reducers/burger-constructor';
import PropTypes from 'prop-types'
import { CHANGE_DRAG } from '../../services/actions/burger-constructor';

export default function ConstructorItem({ingredient}) {
  const dispatch = useDispatch();

  const delIngredientAction = (item) => {
    dispatch(delIngredient(item))
  }
  const ref = React.useRef(null)
  const [{ isDrag }, drag] = useDrag({
    type: 'constructorIngredients',
    item: () => {
      return { id: ingredient.uuid, order: ingredient.order }
    },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    }),
    end: (item) => {
      dispatch({type: CHANGE_DRAG, uuid: item.id, isDrag: false})
    }
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
    }
  })
  React.useEffect(() => {
    if (!ingredient.isDrag && isDrag) {
      dispatch({type: CHANGE_DRAG, uuid: ingredient.uuid, isDrag})
    }
  }, [isDrag, dispatch])
  drag(drop(ref))
  const chageOrder = React.useCallback((dragIndex,hoverIndex) => {
    dispatch(sortingIngredients(dragIndex, hoverIndex))
  }, []) 

  return (
    <section draggable ref={ref} style={{opacity: ingredient.isDrag ? 0 : 1}} data-handler-id={handlerId}
    key={ingredient.uuid}
    className={styles['constructor-element'] + (ingredient.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
      <div className='mr-2'>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={e => delIngredientAction(ingredient)} />
    </section>
  )
}

ConstructorItem.propTypes = {
  ingredient: BURGER_INGREDIENT_TYPE.isRequired
}
