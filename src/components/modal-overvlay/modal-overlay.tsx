import React, { FC, ReactNode } from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
  onClose: ()=>void;
  children: ReactNode
}
const ModalOverlay: FC<IModalOverlay> = ({onClose, children}) => {

  React.useEffect(() => {
    const main = document.getElementById('mainOverlay');
    if(main) {
      main.focus()
    }
  })

  const onKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  return (
    <section id='mainOverlay' tabIndex={0} onKeyDown={onKeyPress} className={styles.main} onClick={onClose}>
      {children}
    </section>
  );
}

export default ModalOverlay;
