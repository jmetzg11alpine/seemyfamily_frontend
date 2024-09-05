import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { setAddRelativeModal, setEditDetailsModal, setProfileId } from '../../dataSlice';
import { ClickableRow } from '../home/Home';
import { getProfileData } from './helpers';
import AddRelativeModal from './AddRelativeModal';
import EditDetailsModal from './EditDetailsModal';

const Profile = () => {
  const dispatch = useDispatch();
  const profileId = useSelector((state) => state.data.profileId);
  const data = useSelector((state) => state.data.profileData);
  const addRelative = () => {
    dispatch(setAddRelativeModal(true));
  };
  const editDetails = () => {
    dispatch(setEditDetailsModal(true));
  };

  useEffect(() => {
    getProfileData(dispatch, profileId);
  }, [profileId, dispatch]);

  const rowClicked = (id) => {
    getProfileData(dispatch, id);
    dispatch(setProfileId(id));
  };

  return (
    <StyledContainer fluid>
      <Row className='pt-4'>
        <Col xs={12} md={4} className='text-center'>
          <Image roudedCircle fluid />
          <h3 className='mt-3'>{data.name}</h3>
        </Col>
        <Col>
          <div className='mt-3'>
            <h5>Bio</h5>
            <p>{data.bio}</p>
          </div>
          <div className='mt-4'>
            <h5>Basic Info</h5>
            <p>
              <strong>BirthPlace</strong>
              {data.birthplace}
            </p>
            <p>
              <strong>BirthDate</strong>
              {data.birthdate}
            </p>
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12}>
          <h4>Family Relations</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Relations</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.relations && data.relations.length > 0 ? (
                data.relations.map((item) => (
                  <ClickableRow onClick={() => rowClicked(item.id)}>
                    <td>{item.relation}</td>
                    <td>{item.name}</td>
                  </ClickableRow>
                ))
              ) : (
                <tr>
                  <td colSpan='2'>Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='success' onClick={addRelative}>
            Add Relative
          </Button>
        </Col>
        <Col>
          <Button variant='warning' onClick={editDetails}>
            Edit Details
          </Button>
        </Col>
      </Row>
      <AddRelativeModal name={data.name} />
      <EditDetailsModal name={data.name} />
    </StyledContainer>
  );
};
export default Profile;

const StyledContainer = styled(Container)`
  height: 100%;
  width: 100%;
  padding: 20px;
`;
