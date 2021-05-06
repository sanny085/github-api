import React, { useContext, useEffect, useState } from 'react'

import { Row, Container, Col, Input, Button, Form, InputGroup, InputGroupAddon } from 'reactstrap';
import Axios from 'axios';

import UserCart from '../components/UserCart';
import Repos from '../components/Repos';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

import UserContext from '../context/UserContext';
import AddContact from '../components/AddContact';

const Home = () => {
    const context = useContext(UserContext);
  //   const [query, setQuery] = useState('');
  //   const [user, setUser] = useState(null);
     
  //   const fetchDetails = async () => {
  //       try{
  //           const { data } = await Axios.get(`https://api.github.com/users/${query}`);
  //           setUser(data);
  //           console.log({data}); 
  //       }
  //       catch(error){
  //           console.log("Home error : "+error);
  //           toast("Not able to locate user", { type : "error" })
  //           console.log("Home Page : "+error);
  //       }
  //  };

   //Put AnyPage behind login
   if(!context.user?.uid) {
       return <Redirect to="/signin" />
   }

    return (
     <Container fluid>
       <Row className="mt-3">
         <Col md="3">
            {/* <InputGroup>
              <Input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Please Provide the username" />
              <InputGroupAddon addonType="append">
                <Button onClick={fetchDetails} color="primary">Fetch User</Button>
              </InputGroupAddon>
            </InputGroup> */}
            
           { context.user ? <UserCart user={context.userApi} /> : null }
          
         </Col>
         <Col md="9">
              { context.user ? <AddContact /> : '' }
              { context.user ? <Repos repos_url={context.userApi?.repos_url} /> : null }
       
         </Col>
       </Row>
     </Container>
    )
}

export default Home;

