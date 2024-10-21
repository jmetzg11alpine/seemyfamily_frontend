import { Carousel, Image } from 'react-bootstrap';
import { urlMedia } from '../../apiRequest';
import styled from 'styled-components';

const ShowPhotos = ({ photos, setActiveIndex }) => {
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };
  return (
    <Carousel interval={null} indicators={false} controls={true} onSelect={handleSelect}>
      {photos.map((photo, index) => (
        <Carousel.Item key={index}>
          {photo.description && (
            <PhotoDescription>
              <p>{photo.description}</p>
            </PhotoDescription>
          )}
          <StyledImageContainer>
            <StyledImage
              rounded
              fluid
              src={`${urlMedia}${photo.src}`}
              alt={photo.description}
              className='d-block w-100'
            />
          </StyledImageContainer>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  max-height: 50vh;
  object-fit: contain;
`;

const PhotoDescription = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
`;

export default ShowPhotos;
