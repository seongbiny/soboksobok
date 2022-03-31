import React from "react";
import "./header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Login from "../../pages/Login";

const Header = () => {
  return (
    <header className="header">
      <Navbar className="navbar-light" style={{ backgroundColor: "#E2ECFD" }}>
        <Container>
          <Navbar.Brand href="/">소복소복</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">홈</Nav.Link> */}
            <Nav.Link href="/search">복지검색</Nav.Link>
            <Nav.Link href="/recommend">추천서비스</Nav.Link>
            <Nav.Link href="/qna">고객센터</Nav.Link>
          </Nav>
          {/* <Button variant="primary">로그인</Button> */}
          <Login></Login>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
