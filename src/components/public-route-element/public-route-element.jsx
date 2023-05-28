import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/reducers/user';
import { getUserStore } from '../../services/store';

export default function PublicRouteElement({element}) {
  const {user} = useSelector(getUserStore)
  const dispatch = useDispatch();
  const {state} = useLocation()

  const init = () => {
    dispatch(getUser());
  }
  React.useEffect(() => {
    init();
  }, [])
  return !user ? element : <Navigate to={state ? state[0].url : '/'} replace/>
}
