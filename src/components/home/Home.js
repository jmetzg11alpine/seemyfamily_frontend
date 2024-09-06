import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, requestSort, getSortIndicator } from './helpers';
import { setMainData, setProfileId } from '../../dataSlice';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const data = useSelector((state) => state.data.mainData);
  const dispatch = useDispatch();
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const results = await getData();
      dispatch(setMainData(results.data));
    };
    fetchData();
  }, []);

  const sortedData =
    data && data.length > 0
      ? [...data].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        })
      : 0;

  const rowClicked = (id) => {
    navigate('/profile');
    dispatch(setProfileId(id));
  };

  return (
    <Container>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <SortableTh onClick={() => requestSort('name', sortConfig, setSortConfig)}>
              Name{getSortIndicator('name', sortConfig)}
            </SortableTh>
            <SortableTh
              onClick={() => requestSort('location__name', sortConfig, setSortConfig)}
            >
              Location{getSortIndicator('location__name', sortConfig)}
            </SortableTh>
            <SortableTh
              onClick={() => requestSort('birthdate', sortConfig, setSortConfig)}
            >
              Birth Date{getSortIndicator('birthdate', sortConfig)}
            </SortableTh>
            <SortableTh
              onClick={() => requestSort('birthplace', sortConfig, setSortConfig)}
            >
              Birth Place{getSortIndicator('birthplace', sortConfig)}
            </SortableTh>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item) => (
              <ClickableRow onClick={() => rowClicked(item.id)} key={item.id}>
                <td>{item.name}</td>
                <td>{item.location__name}</td>
                <td>{item.birthdate}</td>
                <td>{item.birthplace}</td>
              </ClickableRow>
            ))
          ) : (
            <tr>
              <td colSpan='3'>Loading...</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const StyledTable = styled(Table)`
  thead th {
    cursor: pointer;
  }
`;

export const SortableTh = styled.th`
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ClickableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;
