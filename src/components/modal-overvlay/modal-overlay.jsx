import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
  return (
    <section className={styles.main} onClick={props.onClose}>
      {props.children}
    </section>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
