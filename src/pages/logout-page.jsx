import React from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../utils/cookie';
import { logoutAPI } from '../utils/api';
import { LOGOUT_LOAD } from '../services/actions/user';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
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
  React.useEffect(() => {
    init();
  }, [])
  return <></>
}
