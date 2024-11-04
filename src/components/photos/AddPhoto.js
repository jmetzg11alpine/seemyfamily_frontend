import { UseDispatch, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { uploadPhoto, getPhotos } from './helpers';
import { getProfileData } from '../profile/helpers';

const AddPhoto = ({ setPhotoMode, setPhotos }) => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.data.profileId);
  const [data, setData] = useState({ profileId: profileId });

  const handlePhotoUpload = (event) => {
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
    const response = await uploadPhoto(data);
    if (response.profile) {
      getProfileData(dispatch, profileId);
    }
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  return (
    <div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Control type='file' accept='image/*' onChange={handlePhotoUpload} />
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

export default AddPhoto;
