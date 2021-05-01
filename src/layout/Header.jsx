import React, {useState, useEffect} from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    return (
   <div>
     <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" className="text-light">Github Api</NavbarBrand>
       
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/components/">Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Logout</NavLink>
            </NavItem>
          </Nav>
         
        </Collapse>
     </Navbar>
  </div>
    )
}

export default Header
