import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import Login from '../pages/Login.jsx';

function NavBar() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">소복소복</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/welfare">추천</Nav.Link>
            <Nav.Link href="/">QnA</Nav.Link>
          </Nav>
          <Button variant="primary">로그인</Button>
          <Login></Login>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
