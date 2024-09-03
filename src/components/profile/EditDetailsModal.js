import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditDetailsModal } from '../../dataSlice';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getProfileData } from './helpers';

const EditDetailsModal = () => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.data.profileId);
  const showModal = useSelector((state) => state.data.editDetailsModal);
  const initialProfileDate = useSelector((state) => state.data.profileData);
  const [profileData, setProfileData] = useState(initialProfileDate);

  const handleSubmit = async (event) => {
    event.preventDefault();

    handleClose();
    getProfileData(dispatch, profileId);
  };

  const handleClose = () => {
    dispatchEvent(setEditDetailsModal(false));
  };
  return (
    <Modal show={showModal}>
      <Modal.Title>Edit {profileData.name}</Modal.Title>
      <Modal.Body></Modal.Body>
      <Modal.Body>
        <Form>
          <div className='d-flex justify-content-between'>
            <Button variatn='primary' type='submit'>
              Submit
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default EditDetailsModal;
