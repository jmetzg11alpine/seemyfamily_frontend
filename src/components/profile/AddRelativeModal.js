import { useSelector, useDispatch } from 'react-redux';
import { setAddRelativeModal } from '../../dataSlice';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { getProfileData } from './helpers';
const url = process.env.REACT_APP_API;

const AddRelativeModal = ({ name }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.data.addRelativeModal);
  const profileId = useSelector((state) => state.data.profileId);

  const handleClose = () => {
    dispatch(setAddRelativeModal(false));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      profileId: profileId,
      name: event.target.name.value,
      relation: event.target.relation.value,
      location: event.target.location.value,
      lat: event.target.lat.value,
      lng: event.target.lng.value,
    };

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await fetch(url + '/add_relative', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        console.log('Relative added');
      } else {
        console.error('Failed to add relative');
      }
    } catch (error) {
      console.error('Failed to submit data');
    }
    console.log('new data was submitted');
    handleClose();
    getProfileData(dispatch, profileId);
  };

  return (
    <Modal show={showModal} onHide={handleClose} size='lg'>
      <Modal.Header closButton>
        <Modal.Title>Add New Relative to {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' placeholder='Enter name' required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='relation'>
                <Form.Label>Relation</Form.Label>
                <Form.Select required>
                  <option>Parent</option>
                  <option>Sibling</option>
                  <option>Child</option>
                  <option>Spouse</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='location'>
                <Form.Label>Current Location</Form.Label>
                <Form.Control type='text' placeholder='Enter Current location' />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-3' controlId='lat'>
                <Form.Label>Lat</Form.Label>
                <Form.Control type='number' />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-3' controlId='lng'>
                <Form.Label>Lng</Form.Label>
                <Form.Control type='number' />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Birth Place</Form.Label>
                <Form.Control type='text' placeholder='Enter birth place' />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3'>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type='date' placeholder='Enter birth date' />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className='mb-3'>
            <Form.Label>Bio</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type='file' />
          </Form.Group>

          <div className='d-flex justify-content-between'>
            <Button variant='primary' type='submit'>
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
export default AddRelativeModal;
