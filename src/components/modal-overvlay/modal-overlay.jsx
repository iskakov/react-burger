import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

  React.useEffect(() => {
    document.getElementById('mainOverlay').focus()
  })

  const onKeyPress = (e) => {
    if (e.key === 'Escape') {
      props.onClose()
    }
  }
  return (
    <section id='mainOverlay' tabIndex="0" onKeyDown={onKeyPress} className={styles.main} onClick={props.onClose}>
      {props.children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
