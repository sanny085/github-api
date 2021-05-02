import React, { useContext, useState } from 'react'
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

    return (
        <div>
            <h1>Signup Page in React js</h1>
        </div>
    )
}

export default Signup;
