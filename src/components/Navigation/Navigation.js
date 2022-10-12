import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { _HomepageName } from '../../_defaultValues';
import style from './Navigation.module.css'

import logo from '../../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultUserImage from '../../assets/defaultUser.png'

export default function Navigation() {
    const [defaultUser, setDefaultUser] = useState(defaultUserImage);

    useEffect(() => {
        const stickyElm = document.getElementById(style.root)

        const observer = new IntersectionObserver(
            ([e]) => e.target.classList.toggle(style.isSticky, e.intersectionRatio < 1),
            {
                rootMargin: '-1px',
                threshold: [1]
            }
        );
        observer.observe(stickyElm)
        let image = JSON.parse(sessionStorage.getItem('user'))?.images?.at(0)?.url;
        if (image) {
            setDefaultUser(image);
        }
    }, []);

    function getName() {
        return <span>
            <img src={defaultUser}
                style={{ heigth: "40px", width: "40px", borderRadius: "60px" }} />
            <b>{JSON.parse(sessionStorage.getItem('user')).display_name}</b>
        </span>
    };

    function isloggedIn() {
        //check if user is signed in
        if (!sessionStorage.getItem('accessToken')) {
            return <Nav.Link as={Link} to="/login">Login</Nav.Link>;
        } else {
            return <NavDropdown title={getName()} >
                <NavDropdown.Item href="#playlists">
                    <Nav.Link as={Link} to="/playlists">Your Playlists</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#contact">
                    <Nav.Link as={Link} to="/contact">Contact us</Nav.Link>
                </NavDropdown.Item>
                <hr></hr>
                <NavDropdown.Item href="#logout">
                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
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
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/tracks">Tracks</Nav.Link>
                    <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
                    <Nav.Link as={Link} to="/follower">Your Artists</Nav.Link>
                    <Nav.Link as={Link} to="/mix">Your Mix</Nav.Link>
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