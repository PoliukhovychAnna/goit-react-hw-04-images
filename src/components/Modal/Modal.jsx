import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1200,
  },
  content: {
    backgroundColor: 'transparent',
    maxWidth: 'calc(100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
    padding: 0,
    border: 'none',
    position: 'static',
    borderRadius: 0,
    overflow: 'hidden',
  },
};

export const ModalWindow = ({ isOpen, img, alt, onClose }) => (
  <Modal
    style={customStyles}
    isOpen={isOpen}
    onRequestClose={onClose}
    onAfterOpen={() => disableBodyScroll(document)}
    onAfterClose={() => enableBodyScroll(document)}
  >
    <img src={img} alt={alt} />
  </Modal>
);

ModalWindow.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};