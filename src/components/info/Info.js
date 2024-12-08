import styled from 'styled-components';
import Edits from './Edits';
import Information from './Information';
import Visitors from './Visitors';
import { Container, Row, Col } from 'react-bootstrap';

const Info = () => {
  return (
    <StyledContainer>
      <StyledRow>
        <Col xs={12} sm={12} className='r1-c1 p-0'>
          <Edits />
        </Col>
        <Col xs={12} sm={12} className='r1-c2'>
          <Information />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col xs={12} className='r2'>
          <Visitors />
        </Col>
      </StyledRow>
    </StyledContainer>
  );
};
export default Info;

const StyledContainer = styled(Container).attrs({ fluid: true })`
  height: 95vh;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const StyledRow = styled(Row)`
  width: 100%;
  min-height: 50%;

  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;
