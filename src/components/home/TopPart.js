import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button, Form, Row, Col } from 'react-bootstrap';

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
    <StyledRow className='my-2'>
      <Col xs={12} sm={6} className='row-one'>
        <Form.Group>
          <StyledInput
            type='text'
            placeholder='Search by name...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} sm={6} className='row-two'>
        <Row className='d-flex align-items-center'>
          <Col xs={3}>
            <StyledButton onClick={handlePrevPage}>
              <FaArrowLeft />
            </StyledButton>
          </Col>
          <Col xs={6}>
            {dataLength && (
              <span>
                Page {currentPage} of {Math.ceil(dataLength / rowsPerPage)}
              </span>
            )}
          </Col>
          <Col xs={3}>
            <StyledButton onClick={handleNextPage}>
              <FaArrowRight />
            </StyledButton>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
};
export default TopPart;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    .row-one {
      margin-top: 5px;
    }

    .row-two {
      margin: 5px 0;
    }
  }
`;

const StyledInput = styled(Form.Control)`
  max-width: 200px;
  font-size: 0.9rem;
`;

const StyledButton = styled(Button)`
  padding: 0.375rem 0.75rem;
  font-size: 0.85rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
