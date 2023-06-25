import React, { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { getUserStore } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface IPublicRouteElement {
  element: ReactElement;
}

const PublicRouteElement: FC<IPublicRouteElement> = ({element}) => {
  const {user} = useAppSelector(getUserStore)
  const dispatch = useAppDispatch();
  const {state} = useLocation()

  const init = () => {
    dispatch(getUser() as any);
  }
  React.useEffect(() => {
    init();
  }, [])
  return !user ? element : <Navigate to={state ? state.from.pathname : '/'} replace/>
}

export default PublicRouteElement;