import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Navbar bg="danger" expand="lg">
      <Navbar.Brand as={NavLink} to="/" className='text-white fw-bold p-2'>MARVEL <span className='text-warning'>CHARACTER</span> Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/characters">Characters</Nav.Link>
          <Nav.Link as={NavLink} to="/character-form">Add Character</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
