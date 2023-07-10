import React, { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../modal/modal'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import FeedDetail from '../feed-detail/feed-detail';
import { clearFeedAction, selectFeedAction } from '../../services/actions/feed';
import { getFeeds } from '../../services/store';

const ModalFeed: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {feeds} = useAppSelector(getFeeds)
  const {id} = useParams();

  useEffect(() => {
    if (feeds.length > 0 ) {
      dispatch(selectFeedAction(feeds.find(item => item['_id'] === id)));
    }
  }, [feeds])

  const onClose = (): void => {
    dispatch(clearFeedAction())
    navigate('/feed')
  }
  return (
    <Modal style={{minWidth: '640px'}} onClose={onClose}>
      <FeedDetail />
    </Modal>
  )
}

export default ModalFeed;

