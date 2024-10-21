import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import { urlMedia } from '../../apiRequest';
import { getPhotos, editPhoto, deletePhoto } from './helpers';
import { getProfileData } from '../profile/helpers';

const EditPhoto = ({ photoInfo, setPhotoInfo, setPhotoMode, setPhotos }) => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.data.profileId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhotoInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleProfileChange = () => {
    setPhotoInfo((prevInfo) => ({
      ...prevInfo,
      profile_pic: !photoInfo.profile_pic,
      profilePicChanged: true,
    }));
  };

  const handleEdit = async () => {
    await editPhoto(profileId, photoInfo);
    if (photoInfo.profilePicChanged) {
      getProfileData(dispatch, profileId);
    }
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  const handleDelete = async () => {
    await deletePhoto(profileId, photoInfo);
    if (photoInfo.profile_pic) {
      getProfileData(dispatch, profileId);
    }
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  return (
    <EditPhotoContainer>
      <PhotoContainer>
        <img src={`${urlMedia}${photoInfo.src}`} alt='to edit' />
      </PhotoContainer>
      <FormContainer>
        <Form.Group>
          <Form.Check
            type='checkbox'
            label='Profile Photo'
            name='profile_pic'
            checked={photoInfo.profile_pic}
            onChange={handleProfileChange}
          ></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            value={photoInfo.description}
            onChange={handleInputChange}
            placeholder='Enter photo description'
          />
        </Form.Group>
        <ButtonContainer>
          <Button onClick={handleEdit} variant='warning'>
            Edit
          </Button>
          <Button onClick={handleDelete} variant='danger'>
            Delete
          </Button>
        </ButtonContainer>
      </FormContainer>
    </EditPhotoContainer>
  );
};

export default EditPhoto;

const EditPhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  background-color: 'blue';
`;

const PhotoContainer = styled.div`
  flex: 1;
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const FormContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
