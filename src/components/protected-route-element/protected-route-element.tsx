import React, { FC, ReactElement} from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';
import { getUserStore } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

interface IProtectedRouteElement {
  element: ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({element}) =>  {
  const {user} = useAppSelector(getUserStore)
  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const init = () => {
      dispatch(getUser());
    }
    init();
  }, [])
  return user ? element : <Navigate to='/login' state={{from: location}} replace/>
}

export default ProtectedRouteElement;