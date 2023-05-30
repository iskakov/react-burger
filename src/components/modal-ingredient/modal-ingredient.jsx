import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/modal'
import { useDispatch } from 'react-redux';
import { CLEAR_IGREDIENT } from '../../services/actions/burger-ingredient';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function ModalIngredient() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onClose = () => {
    dispatch({type: CLEAR_IGREDIENT})
    navigate('/')
  }
  return (
    <Modal header='Детали ингредиента' onClose={onClose}>
      <IngredientDetails />
    </Modal>
  )
}
