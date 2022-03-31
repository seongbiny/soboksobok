import React from "react";
import "./header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Login from "../../pages/Login";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">소복소복</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="/">홈</Nav.Link> */}
            <Nav.Link href="/search">복지검색</Nav.Link>
            <Nav.Link href="/recommend">추천서비스</Nav.Link>
            <Nav.Link href="/qna">고객센터</Nav.Link>
            {/* <Link to="/search">
              <Button variant="primary">복지검색</Button>
            </Link>
            <Link to="/recommend">
              <Button variant="primary">추천서비스</Button>
            </Link>
            <Link to="/qna">
              <Button variant="primary">고객센터</Button>
            </Link> */}
          </Nav>
          {/* <Button variant="primary">로그인</Button> */}
          <Login></Login>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
