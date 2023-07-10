import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import { CLEAR_IGREDIENT } from '../../services/actions/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useAppDispatch } from '../../utils/hooks';

const ModalIngredient: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const onClose = (): void => {
    dispatch({type: CLEAR_IGREDIENT})
    navigate('/')
  }
  return (
    <Modal header='Детали ингредиента' onClose={onClose}>
      <IngredientDetails />
    </Modal>
  )
}

export default ModalIngredient;

