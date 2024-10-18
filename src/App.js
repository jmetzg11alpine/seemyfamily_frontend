import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Map from './components/Map';
import Info from './components/Info';
import Profile from './components/profile/Profile';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <Container>
        <HeaderContainer>
          <Header />
        </HeaderContainer>
        <ContentContainer>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/map' element={<Map />} />
            <Route path='/info' element={<Info />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </ContentContainer>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const HeaderContainer = styled.div`
  height: 5vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  height: 95vh;
  width: 100%;
`;
