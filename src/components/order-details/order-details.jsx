import React from 'react';
import styles from './order-details.module.css';
import image from '../../images/done.png';

const OrderDetails = () => {
  return (
    <section className={styles.main}>
      <span className={styles.orderId + ' text text_type_digits-large mt-4'}>034536</span>
      <span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
      <img className={styles.img} alt='' src={image}/>
      <span className='text text_type_main-default mt-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
    </section>
  );
}

export default OrderDetails;