import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPhotoModal } from '../../dataSlice';
import { Modal, Button, Carousel, Form } from 'react-bootstrap';
import { uploadPhoto, getPhotos } from './helpers';

const AddPhoto = ({ setPhotoMode, setPhotos }) => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.data.profileId);
  const [data, setData] = useState({ profileId: profileId });

  const handelePhotoUpload = (event) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setData((prev) => ({
          ...prev,
          photo_base64: reader.result,
        }));
      };
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF)');
    }
  };

  const handleDescription = (event) => {
    setData((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleUploadPhoto = async () => {
    await uploadPhoto(data);
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  return (
    <div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Control type='file' accept='image/*' onChange={handelePhotoUpload} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='description'
            onChange={handleDescription}
          />
        </Form.Group>
      </Form>
      <Button variant='info' disabled={!data.photo_base64} onClick={handleUploadPhoto}>
        Upload
      </Button>
    </div>
  );
};

const EditPhoto = () => {
  return <div>Edit photo</div>;
};

const ShowPhotos = ({ photos }) => {
  return (
    <Carousel>
      {photos.map((photo, index) => (
        <Carousel.Item key={index}>
          <img src={photo.src} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

const PhotoModal = ({ name }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.data.photoModal);
  const profileId = useSelector((state) => state.data.profileId);
  const [photoMode, setPhotoMode] = useState('show');
  const [photos, setPhotos] = useState([]);

  const handleClose = () => {
    setPhotos([]);
    dispatch(setPhotoModal(false));
    setPhotoMode('show');
  };

  useEffect(() => {
    if (showModal) {
      getPhotos(profileId, setPhotos);
    }
  }, [profileId, showModal]);

  return (
    <Modal show={showModal} size='lg'>
      <Modal.Header>{name}</Modal.Header>
      <Modal.Body>
        {photoMode === 'add' || photos.length === 0 ? (
          <AddPhoto setPhotoMode={setPhotoMode} setPhotos={setPhotos} />
        ) : photoMode === 'edit' ? (
          <EditPhoto />
        ) : (
          <ShowPhotos photos={photos} />
        )}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        {photos.length > 0 && (
          <>
            <Button
              variant={photoMode === 'add' ? 'primary' : 'success'}
              onClick={() => setPhotoMode(photoMode === 'add' ? 'show' : 'add')}
            >
              {photoMode === 'add' ? 'Show Photos' : 'Add Photo'}
            </Button>
            <Button
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
    </Modal>
  );
};
export default PhotoModal;
