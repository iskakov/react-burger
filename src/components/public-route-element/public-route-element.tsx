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
  const location = useLocation()

  const init = () => {
    dispatch(getUser());
  }
  React.useEffect(() => {
    init();
  }, [])
  return !user ? element : <Navigate to={location.state ? (location.state.fromProtected ? location.state.fromProtected : location.state.from)?.pathname : '/'}  state={location.state ? location.state : {fromPublic: location}} replace/>
}

export default PublicRouteElement;