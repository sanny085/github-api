import React, { useContext, useEffect } from 'react'

import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Axios from 'axios';
import UserContext from '../context/UserContext';

const Home = () => {
    const context = useContext(UserContext);
    
    return (
        <div>
            <h1>Our Home Page</h1>
            {
                {/* console.log("Home page input: "+ context.user.name )  */}
            } 
        </div>
    )
}

export default Home;
