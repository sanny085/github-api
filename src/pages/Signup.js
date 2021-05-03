import React, { useContext, useState, useEffect } from 'react'
import { Container, Form, Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader} from 'reactstrap';

import firebase from 'firebase/app';
import UserContext from '../context/UserContext';

import {Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';

const Signup = () => {
    const context = useContext(UserContext);
   
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
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
            toast(errorMessage,{type:'error'});
            // ..
        });
    }

    const handleSubmit = (e) => {
       e.preventDefault();
       handleSignUp();
    }

   if(context.user?.uid){
       return <Redirect to="/" />
   }

return (
<Container>
 <Row>
    <Col lg='6' className="offset-lg-3 mt-4">
    <Card className="border-0 ">
    <Form onSubmit={handleSubmit}>
        <CardHeader className="border-0 bg-light">
          <div className="p-1 text-center text-mono">Join Github Fetcher</div>
          <h2 className="d-none d-md-block mt-0 mb-2 text-center">Create your account</h2>
        </CardHeader>
        <CardBody className="mt-3">
            <div className="mb-3">
               <label for="email" className="form-label text-dark"><strong>Email address<span className="text-danger"> *</span></strong></label>
               <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}  className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email Id" />
               <div id="emailHelp" className="form-text" style={{fontSize:'12px',fontWeight:'400'}}>We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-1">
                <label for="password" className="form-label text-dark"><strong>Password<span className="text-danger"> *</span></strong></label>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} className="form-control" name="password" id="password" placeholder="Enter your password" />
                <div className="form-text" style={{fontSize:'12px',fontWeight:'400'}}>Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</div>
            </div>
        </CardBody>
        <CardFooter className="border-0 mb-2 bg-light">
         <Button type="submit" block color='success'><span style={{fontWeight:'400'}}>Create account</span></Button>
        </CardFooter>
    </Form>
    </Card>
    </Col>
 </Row> 
</Container>
    )
}

export default Signup;
