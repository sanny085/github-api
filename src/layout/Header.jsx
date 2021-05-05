import React, {useState, useContext, useEffect} from 'react';
import {
    Button,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem ,
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
import { FaUserCircle } from "react-icons/fa";
import Axios from 'axios';
import { toast } from 'react-toastify';

const Header = () => {
    const context = useContext(UserContext);
   
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
     
    const [query, setQuery] = useState('');
    const [user, setUser] = useState(null);
    
    const fetchDetails = async () => {
        try{
            const { data } = await Axios.get(`https://api.github.com/users/${query}`);
            console.log("Header page Api CAlling : "+{data});
            setUser(data);
            console.log("Header 1 : "+{data});
        }
        catch(error){
            console.log("Header error : "+error.message);
            toast("Not able to locate user", { type : "error" })
        }
   };
   useEffect( ()=> {
    context.setUserApi(user);
   },[user])
   
   const submitForm = (e) => {
     e.preventDefault();
     fetchDetails(); 
     console.log("Header page :"+context.userApi) 
  };

   const toggle = () => setIsOpen(!isOpen);
   const toggle1 = () => setDropdownOpen(prevState => !prevState);

return (
 <div>
    <Navbar color="dark" light expand="md" className="p-3">
     <NavbarBrand ><Link to="./" className="text-light" style={{textDecoration:'none'}}>Github Fetcher</Link></NavbarBrand>
       <NavbarText className="text-secondary"></NavbarText>
       
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar >
          <Nav className="ml-auto mr-3" navbar>
          {
            context.user ? (
              <>
           <NavItem>
        
            <InputGroup>
                <Input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Please Provide the username" />
                <InputGroupAddon addonType="append">
                  <Button outline onClick={submitForm} color="light">Fetch User</Button>
                </InputGroupAddon>
            </InputGroup>
            
           </NavItem>
           
            <NavItem>
              <Dropdown direction="left" className="border-0" isOpen={dropdownOpen} toggle={toggle1}>
                <DropdownToggle caret className="bg-none border-0" style={{backgroundColor:'#343a40'}}>
                    <FaUserCircle className="text-light h4"/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>{context.user?.email ? context.user.email : " " }</DropdownItem>
                  <DropdownItem divider></DropdownItem>
                  <DropdownItem>Your Profile</DropdownItem>
                  <DropdownItem>Your Repository</DropdownItem>
                  <DropdownItem>Your Project</DropdownItem>
                  <DropdownItem>Your stars</DropdownItem>
                  <DropdownItem text> 
                  <NavLink onClick={()=> (context.setUser(null))} className="text-dark">Logout</NavLink>
                </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            </>
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
