import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <Navbar bg='info'>
      <Container>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/map'>
            Map
          </Nav.Link>
          <Nav.Link as={Link} to='/info'>
            Info
          </Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          <Navbar.Text>Signed in as: John</Navbar.Text>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
