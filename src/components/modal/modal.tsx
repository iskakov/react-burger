import React, { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overvlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

interface IModal {
  header?: Readonly<string>;
  onClose: () => void;
  children?: ReactNode;
}

const modalRoot = document.getElementById('react-modals');
const Modal: FC<IModal> = ({onClose, header, children}) => {
  const onClick = (e) => {
    e.stopPropagation();
  }
  return modalRoot && createPortal(
    (
      <ModalOverlay onClose={onClose}>
        <section className={styles.modal + ' p-10' } onClick={onClick}>
          <section className={styles.header}>
            <span className='text text_type_main-large'>{header}</span>
            <CloseIcon type="primary" onClick={onClose} />
          </section>
          {children}
        </section>
      </ModalOverlay>
    ),
    modalRoot
  );
}

export default Modal;
