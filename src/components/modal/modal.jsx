import React from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overvlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals');
const Modal = (props) => {
  const onClick = (e) => {
    e.stopPropagation();
  }
  return createPortal(
      (
        <ModalOverlay onClose={props.onClose}>
          <section className={styles.modal + ' p-10' } onClick={onClick}>
            <section className={styles.header}>
              <span className='text text_type_main-large'>{props.header}</span>
              <CloseIcon type="primary" onClick={props.onClose} />
            </section>
            {props.children}
          </section>
        </ModalOverlay>
      ),
      modalRoot
    );
  }

Modal.propTypes = {
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
export default Modal;
