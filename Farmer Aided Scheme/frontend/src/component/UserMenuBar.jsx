import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Logout } from './Logout';

const UserMenuBar = () => {
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/user/getcrops"> Crops</Nav.Link>
            <Nav.Link href="/user/getscheme"> Schemes</Nav.Link>
            <Nav.Link href="/user/applicationstatus">Application Status</Nav.Link>
          </Nav>
        </Container>
        <Logout/>
      </Navbar>
    </>
  )
}

export default UserMenuBar