import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { downloadSQL, downLoadPhotos } from './helpers';

const Information = () => {
  const handleDownloadSQL = () => {
    downloadSQL();
  };
  const handlePhotoDownload = () => {
    downLoadPhotos();
  };
  return (
    <Container className='mt-2'>
      <div>
        All data is public and user generated. If you wish to contribute or have issues
        reach out to the godfather or email the mainter at jmetzg11@gmail.com
      </div>
      <div>
        <div className='mb-2'>You can download the database and photos</div>
        <ButtonContainer>
          <Button onClick={handleDownloadSQL}>Download SQL</Button>
          <Button onClick={handlePhotoDownload}>Download Photos</Button>
        </ButtonContainer>
      </div>
    </Container>
  );
};
export default Information;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
