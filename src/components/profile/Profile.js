import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {
  setAddRelativeModal,
  setEditDetailsModal,
  setProfileId,
  setPhotoModal,
} from '../../dataSlice';
import { ClickableRow, SortableTh } from '../home/Home';
import { requestSort, getSortIndicator } from '../home/helpers';
import { getProfileData } from './helpers';
import AddRelativeModal from './AddRelativeModal';
import EditDetailsModal from './EditDetailsModal';
import PhotoModal from '../photos/PhotoModal';
import { urlMedia } from '../../apiRequest';

const Profile = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.profileData);
  const loggedIn = useSelector((state) => state.data.loggedIn);
  const [sortConfig, setSortConfig] = useState({
    key: 'relation',
    direction: 'ascending',
  });

  const relations = data.relations;
  const sortedRelations =
    relations && relations.length > 0
      ? [...relations].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        })
      : 0;

  const addRelative = () => {
    dispatch(setAddRelativeModal(true));
  };

  const editDetails = () => {
    dispatch(setEditDetailsModal(true));
  };

  const viewPhotos = () => {
    dispatch(setPhotoModal(true));
  };

  const rowClicked = (id) => {
    getProfileData(dispatch, id);
    dispatch(setProfileId(id));
  };

  return (
    <StyledContainer fluid>
      <Row className='pt-4'>
        <Col xs={12} md={4} className='text-center'>
          <Image
            roundedCircle
            fluid
            src={`${urlMedia}${data.photo}`}
            style={{ cursor: 'pointer' }}
            onClick={viewPhotos}
          />
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
              <strong>Location </strong>
              {data.location}
            </p>
            <p>
              <strong>BirthPlace </strong>
              {data.birthplace}
            </p>
            <p>
              <strong>BirthDate </strong>
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
                <SortableTh
                  onClick={() => requestSort('relation', sortConfig, setSortConfig)}
                >
                  Relation{getSortIndicator('relation', sortConfig)}
                </SortableTh>
                <SortableTh
                  onClick={() => requestSort('name', sortConfig, setSortConfig)}
                >
                  Name{getSortIndicator('name', sortConfig)}
                </SortableTh>
              </tr>
            </thead>
            <tbody>
              {sortedRelations && sortedRelations.length > 0 ? (
                sortedRelations.map((item, index) => (
                  <ClickableRow key={index} onClick={() => rowClicked(item.id)}>
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
          <Button disabled={!loggedIn} variant='success' onClick={addRelative}>
            Add Relative
          </Button>
        </Col>
        <Col>
          <Button disabled={!loggedIn} variant='warning' onClick={editDetails}>
            Edit Details
          </Button>
        </Col>
      </Row>
      <AddRelativeModal name={data.name} />
      <EditDetailsModal name={data.name} />
      <PhotoModal name={data.name} />
    </StyledContainer>
  );
};
export default Profile;

const StyledContainer = styled(Container)`
  height: 100%;
  width: 100%;
  padding: 20px;
`;
