import React, { FC } from 'react'
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
import FeedPage from '../../pages/feed-page';
import FeedsPage from '../../pages/feeds-page';
import OrdersPage from '../../pages/orders-page';
import OrderPage from '../../pages/order-page';
import ModalFeed from '../modal-feed/modal-feed';

const ListRoutes: FC = () => {
  const {state} = useLocation()
  return (
    <section>
      <AppHeader/>
      <Routes>
        <Route path='/' element={<ConstructoPage />}> 
          {state && <Route path='ingredients/:id' element={<ModalIngredient />}/>}
        </Route>
        <Route path='/feed' element={<FeedsPage />}> 
          {state && <Route path='/feed/:id' element={<ModalFeed />}/>}
        </Route>
        <Route path='/login' element={<PublicRouteElement element={<LoginPage />} />}/>
        <Route path='/logout' element={<LogoutPage />}/> 
        <Route path='/register' element={<PublicRouteElement element={<RegisterPage />} />}/>
        <Route path='/reset-password' element={<PublicRouteElement element={<ResetPasswordPage />} />}/>
        <Route path='/forgot-password' element={<PublicRouteElement element={<ForgotPasswordPage />} />} />
        <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />} /> }> 
          <Route index element={<Profile/>} />
          <Route path='/profile/orders' element={<OrdersPage/>} />
          {(state && state.from) && <Route path='/profile/orders/:id' element={<OrdersPage isModal={true} />}/>}
        </Route>
        {!state&& <Route path='/ingredients/:id' element={<IngredientPage />}/>}
        {!state && <Route path='/feed/:id' element={<FeedPage />}/>}
        {(!state || state?.fromProtected) && <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<OrderPage />} /> }/>}
        <Route path='/*' element={<NotFoundPage />}/>
      </Routes>
    </section>
    
  )
}

export default ListRoutes;
