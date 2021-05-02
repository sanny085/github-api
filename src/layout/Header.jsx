import React, {useState, useContext, useEffect} from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
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
import { FaUserAlt } from "react-icons/fa";


const Header = () => {
    const context = useContext(UserContext);
  
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

return (
 <div>
    <Navbar color="dark" light expand="md" className="p-3">
     <NavbarBrand ><Link to="./" className="text-light" style={{textDecoration:'none'}}>Github Fetcher</Link></NavbarBrand>
       <NavbarText className="text-secondary">{ context.user?.email ? context.user.email : " " }</NavbarText>
       
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {
            context.user ? (
            <NavItem>
              <NavLink onClick={()=> (context.setUser(null))} className="text-light">Logout</NavLink>
             
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
