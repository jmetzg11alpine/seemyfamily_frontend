import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Table, Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getEdits } from './helpers';

const Edits = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const containerRef = useRef();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data ? data.slice(indexOfFirstRow, indexOfLastRow) : 0;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev * rowsPerPage < data.length ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const updateRowsPerPage = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 800) setRowsPerPage(17);
        else if (width > 600) setRowsPerPage(15);
        else if (width > 500) setRowsPerPage(12);
        else if (width > 400) setRowsPerPage(10);
        else setRowsPerPage(8);
      }
    };
    updateRowsPerPage();
    getEdits(setData);

    window.addEventListener('resize', updateRowsPerPage);

    return () => window.removeEventListener('resize', updateRowsPerPage);
  }, []);

  return (
    <StyledContainer ref={containerRef}>
      <TitleContainer>
        <h2>Edits</h2>
        <div>
          <Button className='me-4' onClick={handlePrevPage}>
            <FaArrowLeft />
          </Button>
          {data && (
            <span>
              Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}
            </span>
          )}
          <Button className='ms-4' onClick={handleNextPage}>
            <FaArrowRight />
          </Button>
        </div>
      </TitleContainer>
      <Table striped bordered hover>
        <thead>
          <th>Date</th>
          <th>User</th>
          <th>Action</th>
          <th>Recipient</th>
        </thead>
        <tbody>
          {data &&
            currentRows.map((edit, index) => (
              <tr>
                <td>{edit.created_at.split('T')[0]}</td>
                <td>{edit.username}</td>
                <td>{edit.action}</td>
                <td>{edit.recipient}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </StyledContainer>
  );
};
export default Edits;

const StyledContainer = styled(Container)`
  width: 50%;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
