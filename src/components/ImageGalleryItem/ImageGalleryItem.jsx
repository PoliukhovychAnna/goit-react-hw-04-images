import PropTypes from 'prop-types';
import { ModalWindow } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryImg } from './Styled.GalleryItem';



export const ImageGalleryItem = ({picture: { webformatURL, largeImageURL, tags}}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  };

 const closeModal = () => {
    setIsModalOpen(false)
  };
    return (
      <>
        <GalleryImg src={webformatURL} alt={tags} onClick={openModal} />
        {isModalOpen && (
          <ModalWindow
            isOpen={isModalOpen}
            img={largeImageURL}
            alt={tags}
            onClose={closeModal}
          />
        )}
      </>
    );
  }

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};