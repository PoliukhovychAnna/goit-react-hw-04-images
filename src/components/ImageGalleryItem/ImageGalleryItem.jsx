import PropTypes from 'prop-types';
import { ModalWindow } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryImg } from './Styled.GalleryItem';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      picture: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <>
        <GalleryImg src={webformatURL} alt={tags} onClick={this.openModal} />
        {isModalOpen && (
          <ModalWindow
            isOpen={isModalOpen}
            img={largeImageURL}
            alt={tags}
            onClose={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};