import { Navbar, Nav, Container } from "react-bootstrap";

const MyNav = () => (
  <Navbar bg="dark" variant="dark">
    <Container fluid>
      <Navbar.Brand href="#home">EpiBooks</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Shop</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#browse">Browse</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default MyNav;
