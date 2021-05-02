import React, {useState, useContext, useEffect} from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem, 
    NavbarText} from 'reactstrap';
import {Link} from 'react-router-dom';
import UserContext from '../context/UserContext';

const Header = () => {
    const context = useContext(UserContext);
   
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

return (
 <div>
    <Navbar color="dark" light expand="md">
     <NavbarBrand ><Link to="./" className="text-light" style={{textDecoration:'none'}}>Github Fetcher</Link></NavbarBrand>
       <NavbarText className="text-secondary">{ context.user?.email ? context.user.email : " " }</NavbarText>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {
            context.user ? (
            <NavItem>
              <NavLink tag={Link} to="/*" className="text-light">Logout</NavLink>
            </NavItem>
            ) : (
             <>
             <NavItem>
              <NavLink tag={Link} to="/signup" className="text-light">Signup</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signin" className="text-light">Signin</NavLink>
            </NavItem>
            </>
            )
          }
             
          </Nav>
      </Collapse>
    </Navbar>
 </div>
 )
}

export default Header
