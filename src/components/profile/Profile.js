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
      <Row className='mt-4'>
        <Col xs={4} className='text-center'>
          <ResponsiveImage
            roundedCircle
            src={`${urlMedia}${data.photo}`}
            style={{ transform: `rotate(${data.rotation * 90}deg)` }}
            onClick={viewPhotos}
          />
          <h4>{data.name}</h4>
        </Col>
        <Col xs={8}>
          <div className='mt-3'>
            <h4>Bio</h4>
            <StyledP>{data.bio}</StyledP>
          </div>
          <div className='mt-4'>
            <StyledP>
              <strong>Location </strong>
              {data.location}
            </StyledP>
            <StyledP>
              <strong>Birth Place </strong>
              {data.birthplace}
            </StyledP>
            <StyledP>
              <strong>Birth Year </strong>
              {data.birthyear}
            </StyledP>
          </div>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs={12}>
          <StyledTable striped bordered hover>
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
          </StyledTable>
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

const StyledContainer = styled(Container).attrs({ fluid: true })`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const ResponsiveImage = styled(Image)`
  width: 100%;
  max-width: 200px;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    max-width: 150px;
    margin-bottom: 20px;
  }

  @media (max-width: 576px) {
    max-width: 100px;
    margin-bottom: 15px;
  }
`;

const StyledP = styled.p`
  @media (max-width: 768px);
   {
    font-size: 0.7rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;

export const StyledTable = styled(Table)`
  overflow-y: auto;
  width: 100%;

  thead th {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;

    th,
    td {
      padding: 0.5rem;
    }
  }

  @media (max-width: 576px) {
    font-size: 0.75rem;

    th,
    td {
      padding: 0.3rem;
    }
  }
`;
