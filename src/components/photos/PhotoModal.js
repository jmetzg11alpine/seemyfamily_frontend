import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotoModal } from '../../dataSlice';
import { Modal, Button } from 'react-bootstrap';
import { getPhotos } from './helpers';
import styled from 'styled-components';
import AddPhoto from './AddPhoto';
import EditPhoto from './EditPhoto';
import ShowPhotos from './ShowPhotos';

const PhotoModal = ({ name }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.data.photoModal);
  const profileId = useSelector((state) => state.data.profileId);
  const loggedIn = useSelector((state) => state.data.loggedIn);
  const [photoMode, setPhotoMode] = useState('show');
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [photoInfo, setPhotoInfo] = useState({
    profile_pic: true,
    description: '',
    profilePicChanged: false,
  });

  const handleClose = () => {
    setPhotos([]);
    dispatch(setPhotoModal(false));
    setPhotoMode('show');
  };

  useEffect(() => {
    if (photoMode === 'edit') {
      setPhotoInfo(photos[activeIndex]);
    }
  }, [photoMode, activeIndex, photos]);

  useEffect(() => {
    if (showModal) {
      getPhotos(profileId, setPhotos);
    }
  }, [profileId, showModal]);

  return (
    <StyledModal className='MY-MODAL' show={showModal} size='lg'>
      <Modal.Header>{name}</Modal.Header>
      <Modal.Body>
        {photoMode === 'add' || photos.length === 0 ? (
          <AddPhoto setPhotoMode={setPhotoMode} setPhotos={setPhotos} />
        ) : photoMode === 'edit' ? (
          <EditPhoto
            photoInfo={photoInfo}
            setPhotoInfo={setPhotoInfo}
            setPhotoMode={setPhotoMode}
            setPhotos={setPhotos}
          />
        ) : (
          <ShowPhotos photos={photos} setActiveIndex={setActiveIndex} />
        )}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        {photos.length > 0 && (
          <>
            <Button
              disabled={!loggedIn}
              variant={photoMode === 'add' ? 'primary' : 'success'}
              onClick={() => setPhotoMode(photoMode === 'add' ? 'show' : 'add')}
            >
              {photoMode === 'add' ? 'Show Photos' : 'Add Photo'}
            </Button>
            <Button
              disabled={!loggedIn}
              variant={photoMode === 'edit' ? 'primary' : 'warning'}
              onClick={() => setPhotoMode(photoMode === 'edit' ? 'show' : 'edit')}
            >
              {photoMode === 'edit' ? 'Show Photos' : 'Edit Photo'}
            </Button>
          </>
        )}

        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .modal-dialog {
    min-width: 90vw;
    max-width: 90vw;
    max-height: 70vh;
    margin: auto;
    margin-top: 20px;
  }

  .modal-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: brightness(0.3) invert(0.3);
  }
`;

export default PhotoModal;
