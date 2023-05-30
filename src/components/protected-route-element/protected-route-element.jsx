import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { getUserStore } from '../../services/store';
import PropTypes from 'prop-types';

export default function ProtectedRouteElement({element, url}) {
  const {user} = useSelector(getUserStore)
  const dispatch = useDispatch();

  React.useEffect(() => {
    const init = () => {
      dispatch(getUser());
    }
    init();
  }, [])
  return user ? element : <Navigate to='/login' state={[{url}]} replace/>
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
}
