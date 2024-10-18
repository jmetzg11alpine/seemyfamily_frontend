import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoggedIn from './LoggedIn';

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
          <LoggedIn />
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
