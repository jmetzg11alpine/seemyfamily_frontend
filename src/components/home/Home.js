import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, checkLoginStatus, requestSort, getSortIndicator } from './helpers';
import { setMainData, setProfileId } from '../../dataSlice';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../profile/helpers';
import TopPart from './TopPart';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.mainData);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const containerRef = useRef();
  const navigate = useNavigate();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredData = data
    ? data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const sortedData =
    filteredData && filteredData.length > 0
      ? [...filteredData].sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        })
      : 0;
  const currentRows = sortedData ? sortedData.slice(indexOfFirstRow, indexOfLastRow) : 0;

  useEffect(() => {
    const fetchData = async () => {
      const results = await getData();
      dispatch(setMainData(results.data));
    };
    const updateRowsPerPage = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 800) setRowsPerPage(25);
        else if (width > 600) setRowsPerPage(14);
        else if (width > 500) setRowsPerPage(8);
        else if (width > 400) setRowsPerPage(5);
        else setRowsPerPage(8);
      }
    };
    updateRowsPerPage();
    fetchData();
    checkLoginStatus(dispatch);

    window.addEventListener('resize', updateRowsPerPage);

    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, [dispatch]);

  const rowClicked = (id) => {
    navigate('/profile');
    dispatch(setProfileId(id));
    getProfileData(dispatch, id);
  };

  return (
    <Container ref={containerRef}>
      <TopPart
        dataLength={filteredData.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />
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
          {currentRows.length > 0 ? (
            currentRows.map((item) => (
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
  overflow-y: auto;
  width: 100%;

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
