import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand as={NavLink} to='/'>Activity List PRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to='/clients'>Clientes</Nav.Link>
                <Nav.Link as={NavLink} to='/activities'>Atividades</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown align="end" title="Ander" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Configurações</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Sair
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
