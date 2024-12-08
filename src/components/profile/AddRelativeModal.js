import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAddRelativeModal } from '../../dataSlice';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getProfileData, addRelative, relationOptions } from './helpers';
import styled from 'styled-components';

const AddRelativeModal = ({ name }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.data.addRelativeModal);
  const profileId = useSelector((state) => state.data.profileId);
  const loggedIn = useSelector((state) => state.data.loggedIn);
  const [location, setLocation] = useState('');
  const [newProfile, setNewProfile] = useState({});

  const handleLocation = (location) => {
    setLocation(location);
    handleChange('location', location);
  };

  const handelePhotoUpload = (event) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const file = event.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        handleChange('photo_base64', reader.result);
      };
    } else {
      alert('Please upload a valid image file (JPEG, PNG, GIF)');
    }
  };

  const handleChange = (key, value) => {
    setNewProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    handleChange('profileId', profileId);
  }, [showModal, profileId]);

  const handleClose = () => {
    dispatch(setAddRelativeModal(false));
    setLocation('');
    setNewProfile({});
  };

  const handleSubmit = async () => {
    await addRelative(newProfile);
    await getProfileData(dispatch, profileId);
    handleClose();
  };

  return (
    <StyledModal show={showModal} size='lg'>
      <Modal.Header>
        <Modal.Title>Add New Relative to {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  required
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Relation</Form.Label>
                <Form.Select
                  value={newProfile.relation || ''}
                  onChange={(e) => handleChange('relation', e.target.value)}
                >
                  <option value='' disabled>
                    select relation
                  </option>
                  {relationOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Current Location</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Current location'
                  value={location}
                  onChange={(e) => handleLocation(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Lat</Form.Label>
                <Form.Control
                  type='number'
                  step='any'
                  disabled={!location}
                  onChange={(e) => handleChange('lat', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Lng</Form.Label>
                <Form.Control
                  type='number'
                  step='any'
                  disabled={!location}
                  onChange={(e) => handleChange('lng', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Birth Place</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter birth place'
                  onChange={(e) => handleChange('birthplace', e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Birth year</Form.Label>
                <Form.Control
                  type='integer'
                  placeholder='Enter birth date'
                  onChange={(e) => handleChange('birthyear', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className='mb-3'>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3'>
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control type='file' accept='image/*' onChange={handelePhotoUpload} />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button
          variant='primary'
          onClick={handleSubmit}
          disabled={!newProfile.name || !newProfile.relation || !loggedIn}
        >
          Submit
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};
export default AddRelativeModal;

const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: 90vw;
    margin: auto;
  }

  @media (max-width: 768px) {
    .modal-dialog {
      min-width: 100vw;
      max-width: 100vw;
      margin: 0;
    }
  }
`;
