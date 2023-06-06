import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../../pages/login-page'
import RegisterPage from '../../pages/register-page'
import ResetPasswordPage from '../../pages/reset-password-page'
import ForgotPasswordPage from '../../pages/forgot-password-page'
import ProfilePage from '../../pages/profile-page'
import ConstructoPage from '../../pages/constructor-page'
import NotFoundPage from '../../pages/404-not-found-page'
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import PublicRouteElement from '../public-route-element/public-route-element';
import LogoutPage from '../../pages/logout-page';
import AppHeader from '../app-header/app-header';
import IngredientPage from '../../pages/ingredient-page';
import Profile from '../profile/profile';
import ModalIngredient from '../modal-ingredient/modal-ingredient';

export default function ListRoutes() {
  const {state} = useLocation()
  return (

    <section>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<ConstructoPage />}> 
          {state && <Route path='ingredients/:id' element={<ModalIngredient />}/>}
        </Route>
        <Route path='/login' element={<PublicRouteElement element={<LoginPage />} />}/>
        <Route path='/logout' element={<LogoutPage />}/> 
        <Route path='/register' element={<PublicRouteElement element={<RegisterPage />} />}/>
        <Route path='/reset-password' element={<PublicRouteElement element={<ResetPasswordPage />} />}/>
        <Route path='/forgot-password' element={<PublicRouteElement element={<ForgotPasswordPage />} />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} url='/profile' /> }> 
          <Route index element={<Profile/>} />
        </Route>
        {!state && <Route path='/ingredients/:id' element={<IngredientPage />}/>}
        <Route path='/*' element={<NotFoundPage />}/>
      </Routes>
    </section>
    
  )
}
