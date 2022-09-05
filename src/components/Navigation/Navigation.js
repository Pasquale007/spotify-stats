import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { _HomepageName } from '../../_defaultValues';
import style from './Navigation.module.css'

import logo from '../../assets/logo/logo.png';

export default function Navigation() {

    function getName() {
        return "Signed in as: " + JSON.parse(sessionStorage.getItem('user')).display_name
    };

    function isloggedIn() {
        //check if user is signed in
        if (!sessionStorage.getItem('accessToken')) {
            return <Nav.Link href="/login">Login</Nav.Link>;
        } else {
            return <NavDropdown title={getName()} >
                <NavDropdown.Item href="#logout">
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </NavDropdown.Item>
            </NavDropdown >
        }
    }

    return (
        <Navbar bg="primary" expand="lg" sticky="top" id={style.root}>
            <Navbar.Brand href="/">
                <img
                    alt="Logo"
                    src={logo}
                    width="50"
                    height="50"
                />{' '}
                {_HomepageName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/tracks">Tracks</Nav.Link>
                    <Nav.Link href="/artists">Artists</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {isloggedIn()}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}