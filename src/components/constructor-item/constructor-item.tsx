import React, { FC } from 'react'
import styles from './constructor-item.module.css'
import { IBurgerType, TYPE_OF_CATEGORY } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from "react-dnd";
import { delIngredient, sortingIngredients } from '../../services/actions/burger-constructor';
import { CHANGE_DRAG } from '../../services/actions/burger-constructor';
import { useAppDispatch } from '../../utils/hooks';
interface IConstuctorItem {
  ingredient: IBurgerType
}
interface IDragConstructoIngredients {
  id: Readonly<string>,
  order: number
}
interface IDragObject {
  isDrag: boolean
}

const ConstructorItem: FC<IConstuctorItem> = ({ingredient}) => {
  const dispatch = useAppDispatch();

  const delIngredientAction = (): void => {
    dispatch(delIngredient(ingredient))
  }
  const ref = React.useRef<HTMLDivElement>(null)
  const [{ isDrag }, drag] = useDrag<IDragConstructoIngredients, unknown, IDragObject>({
    type: 'constructorIngredients',
    item: { id: ingredient.uuid ? ingredient.uuid : '', order: ingredient.order ? ingredient.order : 0},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    }),
    end: (item) => {
      dispatch({type: CHANGE_DRAG, uuid: item.id, isDrag: false})
    }
  });
  const [, drop] = useDrop<IDragConstructoIngredients >({
    accept: "constructorIngredients",

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
      if (clientOffset && hoverIndex) {
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
      
    }
  })
  React.useEffect(() => {
    if (!ingredient.isDrag && isDrag) {
      dispatch({type: CHANGE_DRAG, uuid: ingredient.uuid, isDrag})
    }
  }, [isDrag, dispatch, ingredient.isDrag, ingredient.uuid])
  drag(drop(ref))
  const chageOrder = React.useCallback((dragIndex,hoverIndex) => {
    dispatch(sortingIngredients(dragIndex, hoverIndex))
  }, [dispatch]) 

  return (
    <section draggable ref={ref} style={{opacity: ingredient.isDrag ? 0 : 1}}
      key={ingredient.uuid}
      className={styles['constructor-element'] + (ingredient.type === TYPE_OF_CATEGORY.bun ? ' ml-8': '') + ' mb-4'}>
      <div className='mr-2'>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={delIngredientAction} />
    </section>
  )
}

export default ConstructorItem;