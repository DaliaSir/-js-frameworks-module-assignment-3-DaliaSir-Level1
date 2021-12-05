import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import DetailsPage from "./components/home/pages/DetailsPage";
import './sass/style.scss';

function App() {
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <NavLink className="nav-brand-link" to="/" exact="true">
              <Navbar.Brand>JS Frameworks MA3</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <NavLink to="/" exact="true" className="nav-link">Home</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" exact="true" element={<HomePage />} />
            <Route path="/page/:id" element={<DetailsPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
