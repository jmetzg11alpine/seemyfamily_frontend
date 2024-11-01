import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData, checkLoginStatus, requestSort, getSortIndicator } from './helpers';
import { setMainData, setProfileId } from '../../dataSlice';
import { Container, Table, Image } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../profile/helpers';
import TopPart from './TopPart';
import { urlMedia } from '../../apiRequest';

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.mainData);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [photoSize, setPhotoSize] = useState(20);
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
        if (width > 1200) {
          setPhotoSize(32);
          setRowsPerPage(20);
        } else if (width > 1100) {
          setPhotoSize(32);
          setRowsPerPage(18);
        } else if (width > 900) {
          setPhotoSize(30);
          setRowsPerPage(16);
        } else if (width > 800) {
          setPhotoSize(28);
          setRowsPerPage(15);
        } else if (width > 700) {
          setPhotoSize(26);
          setRowsPerPage(14);
        } else if (width > 400) {
          setPhotoSize(25);
          setRowsPerPage(12);
        } else {
          setPhotoSize(24);
          setRowsPerPage(8);
        }
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
    <StyledContainer ref={containerRef}>
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
                <td>
                  <Image
                    src={`${urlMedia}${item.photo}`}
                    alt={`{item.name}'s profile`}
                    roundedCircle
                    width={photoSize}
                    height={photoSize}
                    className='me-2'
                  />
                  {item.name}
                </td>
                <td>{item.location}</td>
                <td>{item.birthdate}</td>
                <td>{item.birthplace}</td>
              </ClickableRow>
            ))
          ) : (
            <tr>
              <td colSpan='4'>Loading...</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled(Container).attrs({ fluid: true })`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
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
