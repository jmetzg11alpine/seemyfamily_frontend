import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlMedia } from '../../apiRequest';
import { getPhotos, editPhoto, deletePhoto } from './helpers';
import { getProfileData } from '../profile/helpers';
import { FaRedoAlt } from 'react-icons/fa';

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

  const handleRotatation = () => {
    setPhotoInfo((prevInfo) => ({
      ...prevInfo,
      rotation: (prevInfo.rotation + 1) % 4,
    }));
  };

  const handleEdit = async () => {
    await editPhoto(photoInfo);
    if (photoInfo.profilePicChanged) {
      getProfileData(dispatch, profileId);
    }
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  const handleDelete = async () => {
    await deletePhoto(photoInfo);
    if (photoInfo.profile_pic) {
      getProfileData(dispatch, profileId);
    }
    setPhotoMode('show');
    getPhotos(profileId, setPhotos);
  };

  return (
    <StyledRow>
      <Col sm={4}>
        <PhotoContainer>
          <img
            src={`${urlMedia}${photoInfo.src}`}
            alt='to edit'
            style={{ transform: `rotate(${photoInfo.rotation * 90}deg)` }}
          />
        </PhotoContainer>
      </Col>
      <Col sm={8}>
        <Row className='my-4'>
          <Row>
            <Form.Group as={FlexContainer}>
              <Form.Check
                type='checkbox'
                label='Profile Photo'
                name='profile_pic'
                checked={photoInfo.profile_pic}
                onChange={handleProfileChange}
              ></Form.Check>
              <StyledFaRedoAlt onClick={handleRotatation} />
            </Form.Group>
          </Row>
        </Row>
        <Row className='mb-4'>
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
        </Row>
        <Row className='mb-4'>
          <ButtonContainer>
            <Button onClick={handleEdit} variant='warning'>
              Edit
            </Button>
            <Button onClick={handleDelete} variant='danger'>
              Delete
            </Button>
          </ButtonContainer>
        </Row>
      </Col>
    </StyledRow>
  );
};

export default EditPhoto;

const StyledRow = styled(Row)`
  display: flex;
  align-items: stretch;
`;

const PhotoContainer = styled.div`
  padding: 10px;
  img {
    max-width: 100%;
    max-height: 250px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledFaRedoAlt = styled(FaRedoAlt)`
  margin-left: 20%;
  cursor: pointer;

  &:hover {
    color: #007bff; /* Change color on hover (blue in this case) */
    transform: scale(1.2); /* Slightly enlarge icon on hover */
  }
`;

const ButtonContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
