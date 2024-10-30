import styled from 'styled-components';
import Edits from './Edits';
import Information from './Information';
import Visitors from './Visitors';

const Info = () => {
  return (
    <Container>
      <FirstRow>
        <Edits />
        <Information />
      </FirstRow>
      <SecondRow>
        <Visitors />
      </SecondRow>
    </Container>
  );
};
export default Info;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  height: 65%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const SecondRow = styled.div`
  height: 35%;
  width: 100%;
`;
