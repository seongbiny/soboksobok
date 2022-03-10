import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function NavBar() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">소복소복</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">추천</Nav.Link>
            <Nav.Link href="#pricing">QnA</Nav.Link>
          </Nav>
          <Button variant="primary">로그인</Button>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
