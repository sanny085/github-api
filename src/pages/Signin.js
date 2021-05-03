import React, { useContext, useState, useEffect } from 'react'
import { Container, Form, Button, NavLink, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader} from 'reactstrap';
import {Link} from 'react-router-dom';


import firebase from 'firebase/app';
import UserContext from '../context/UserContext';

import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

const Signin = () => {
    const context = useContext(UserContext);
   
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSignUp = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in 
               //passing whole data            
            console.log(res);
            context.setUser({email: res.user.email, uid: res.user.uid})
          
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error Message is :"+errorMessage+"errorCode is :"+errorCode);
            alert(errorMessage);
            toast(errorMessage,{type:'error'});
            // ..
        });
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       handleSignUp();
    }
  
   if(context.user?.uid) {
       return <Redirect to="/" />
   }

return (
<Container  >
 <Row>
    <Col lg='6' className="offset-lg-3 mt-5 mx-auto">
         <div className="p-2 text-center text">
            <h4 style={{fontWeight:'300'}}>Sign in to Github Fetcher</h4>
          </div>
    <Card className="mx-auto w-75">
    <Form onSubmit={handleSubmit}>
        <CardBody style={{backgroundColor:'#f6f8fa'}}>
          <div className="mb-3">
               <label for="email" className="form-label text-dark">Username or email address</label>
               <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email Id" />
            </div>
          <div class="mb-1">
                <label for="password" className="form-label text-dark">Password</label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" name="password" id="password" placeholder="Enter your password" />
          </div>
          <div className="mt-3 mb-2">
               <Button type="submit" block color='success'>Sign in</Button>
          </div>
        </CardBody>
    </Form>
    </Card>
       <div className="card text-center mt-3 w-75 mx-auto">
         <p className="pt-3">New to GitHub? <Link tag={Link} to="/signup" className="text-primary">Create an account.</Link></p>
       </div>
    </Col>
 </Row> 
</Container>
    )
}

export default Signin;
