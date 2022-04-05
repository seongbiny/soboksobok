import React from "react";
import "./header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Login from "../../pages/Login";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header" id="header">
      <Navbar className="navbar" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="soboksobok_logo/sobok_w.png"
              style={{ width: 130 }}
              alt="logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/search">복지검색</Nav.Link>
            <Nav.Link href="/recommend">추천서비스</Nav.Link>
            <Nav.Link href="/qna">고객센터</Nav.Link>
          </Nav>
          <Login></Login>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
