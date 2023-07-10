import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../modal/modal'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import FeedDetail from '../feed-detail/feed-detail';
import { clearFeedAction, selectFeedAction } from '../../services/actions/feed';
import { getOrders } from '../../services/store';

const ModalOrder: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {orders} = useAppSelector(getOrders)
  const {id} = useParams();

  useEffect(() => {
    if (orders.length > 0 ) {
      dispatch(selectFeedAction(orders.find(item => item['_id'] === id)));
    }
  }, [orders])

  const onClose = (): void => {
    dispatch(clearFeedAction())
    navigate('/profile/orders')
  }
  return (
    <Modal style={{minWidth: '640px'}} onClose={onClose}>
      <FeedDetail />
    </Modal>
  )
}

export default ModalOrder;

