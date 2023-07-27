import PropTypes from 'prop-types';
import { ImageGalleryList } from './Styled.ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => {
  return (
    <ImageGalleryList>
      {pictures.map(picture => (
        <ImageGalleryItem key={picture.id} picture={picture} />
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape({id:PropTypes.number.isRequired, }).isRequired).isRequired,
}
