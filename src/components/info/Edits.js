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
        if (width > 500) setRowsPerPage(12);
        else if (width > 400) setRowsPerPage(10);
        else setRowsPerPage(5);
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
        <ButtonContainer>
          <ResponsiveButton onClick={handlePrevPage}>
            <FaArrowLeft />
          </ResponsiveButton>
          {data && (
            <span>
              Page {currentPage} of {Math.ceil(data.length / rowsPerPage)}
            </span>
          )}
          <ResponsiveButton onClick={handleNextPage}>
            <FaArrowRight />
          </ResponsiveButton>
        </ButtonContainer>
      </TitleContainer>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Action</th>
            <th>Recipient</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            currentRows.map((edit, index) => (
              <tr key={index}>
                <td>{edit.created_at.split('T')[0]}</td>
                <td>{edit.username}</td>
                <td>{edit.action}</td>
                <td>{edit.recipient}</td>
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
};
export default Edits;

const StyledContainer = styled(Container).attrs({ fluid: true })`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResponsiveButton = styled(Button)`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 576px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.85rem;
  }
`;

const StyledTable = styled(Table)`
  width: 90%;
  margin: 0 auto;
  padding: 0 5px;
  height: 85%;

  @media (max-width: 1536px) {
    font-size: 0.75rem;

    th,
    td {
      padding: 0.3rem;
    }
  }

  @media (max-width: 1162px) {
    font-size: 0.55rem;

    th,
    td {
      padding: 0.1rem;
    }
  }
`;
