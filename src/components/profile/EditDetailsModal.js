import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEditDetailsModal } from '../../dataSlice';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import {
  getProfileData,
  getRelations,
  postProfileEdits,
  deleteProfile,
  relationOptions,
} from './helpers';
import Select from 'react-select';
import styled from 'styled-components';

const EditDetailsModal = ({ name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileId = useSelector((state) => state.data.profileId);
  const showModal = useSelector((state) => state.data.editDetailsModal);
  const initialProfileData = useSelector((state) => state.data.profileData);
  const loggedIn = useSelector((state) => state.data.loggedIn);
  const [profileData, setProfileData] = useState({});
  const [possibleRelatives, setPossibleRelatives] = useState([]);
  const [clickedRemoveId, setClickRemoveId] = useState(null);

  useEffect(() => {
    if (profileId && showModal) {
      getRelations(profileId, setPossibleRelatives);
    }
    setProfileData(initialProfileData);
  }, [profileId, initialProfileData, showModal]);

  const handleClose = () => {
    dispatch(setEditDetailsModal(false));
    setPossibleRelatives([]);
    setClickRemoveId(null);
  };

  const handleChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRemoveClick = (id) => {
    setClickRemoveId(id);
    handleChange('relation_remove', id);
  };

  const handleSubmit = async () => {
    await postProfileEdits(profileData);
    handleClose();
    getProfileData(dispatch, profileId);
  };

  const deleteUser = async () => {
    await deleteProfile(profileData);
    handleClose();
    navigate('/');
  };

  return (
    <StyledModal show={showModal} size='lg'>
      <Modal.Title className='p-3'>Edit {name}</Modal.Title>
      <Modal.Body>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={profileData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Birth Place</Form.Label>
              <Form.Control
                type='text'
                value={profileData.birthplace}
                onChange={(e) => handleChange('birthplace', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type='date'
                value={profileData.birthdate}
                onChange={(e) => handleChange('birthdate', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                value={profileData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Lat</Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={profileData.lat}
                disabled={!profileData.location}
                onChange={(e) => handleChange('lat', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>lng</Form.Label>
              <Form.Control
                type='number'
                step='any'
                value={profileData.lng}
                disabled={!profileData.location}
                onChange={(e) => handleChange('lng', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as='textarea'
              value={profileData.bio}
              rows={5}
              onChange={(e) => handleChange('bio', e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Name</th>
                <th>Relation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button variant='success' size='sm'>
                    Add
                  </Button>
                </td>
                <td>
                  <Select
                    options={possibleRelatives}
                    value={profileData.person_add || null}
                    onChange={(option) => handleChange('person_add', option)}
                    isSearchable={true}
                    placeholder='Search...'
                  />
                </td>
                <td>
                  <Select
                    options={relationOptions}
                    value={profileData.relation_add || null}
                    onChange={(option) => handleChange('relation_add', option)}
                  />
                </td>
              </tr>
              {profileData.relations &&
                profileData.relations.map((person, index) => (
                  <tr key={index}>
                    <td>
                      <Button
                        variant={clickedRemoveId === person.id ? 'danger' : 'warning'}
                        size='sm'
                        onClick={() => handleRemoveClick(person.id)}
                        disabled={clickedRemoveId === person.id}
                      >
                        Remove
                      </Button>
                    </td>
                    <td> {person.name}</td>
                    <td>{person.relation}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button disabled={!loggedIn} variant='primary' onClick={handleSubmit}>
          Update
        </Button>
        <Button disabled={!loggedIn} variant='danger' onClick={deleteUser}>
          Delete
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};
export default EditDetailsModal;

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
