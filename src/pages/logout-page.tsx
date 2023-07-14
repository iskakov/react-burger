import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { logoutAPI } from '../utils/api';
import { useAppDispatch } from '../utils/hooks';
import { logoutLoadAction } from '../services/actions/user';

const LogoutPage: FC = () =>  {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  React.useEffect(() => {
    const init = async () => {
      logoutAPI({token: getCookie('refreshToken')}).then(res => {
        if (res) {
          dispatch(logoutLoadAction())
          setCookie('accessToken', '')
          setCookie('refreshToken', '')
          navigation('/login')
        }
      })
    }
    init();
  }, [])
  return <></>
}

export default LogoutPage;