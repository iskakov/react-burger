import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { logoutAPI } from '../utils/api';
import { LOGOUT_LOAD } from '../services/actions/user';
import { useAppDispatch } from '../utils/hooks';

const LogoutPage: FC = () =>  {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  React.useEffect(() => {
    const init = async () => {
      logoutAPI({token: getCookie('refreshToken')}).then(res => {
        if (res) {
          dispatch({type: LOGOUT_LOAD})
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