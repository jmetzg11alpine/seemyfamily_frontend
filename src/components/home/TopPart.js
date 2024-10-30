import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';

const TopPart = ({
  dataLength,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  rowsPerPage,
}) => {
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev * rowsPerPage < dataLength ? prev + 1 : prev));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Container className='mt-2'>
      <Form.Group className='ms-5'>
        <Form.Control
          type='text'
          placeholder='Search by name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <div className='me-5'>
        <Button className='me-4' onClick={handlePrevPage}>
          <FaArrowLeft />
        </Button>
        {dataLength && (
          <span>
            Page {currentPage} of {Math.ceil(dataLength / rowsPerPage)}
          </span>
        )}
        <Button className='ms-4' onClick={handleNextPage}>
          <FaArrowRight />
        </Button>
      </div>
    </Container>
  );
};
export default TopPart;

const Container = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
`;
