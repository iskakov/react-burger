import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { getUserStore } from '../../services/store';
import PropTypes from 'prop-types';

export default function ProtectedRouteElement({element, url}) {
  const {user} = useSelector(getUserStore)
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const init = () => {
      dispatch(getUser());
    }
    init();
  }, [])
  return user ? element : <Navigate to='/login' state={{from: location}} replace/>
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
}
