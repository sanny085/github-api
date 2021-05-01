import React from 'react'

import { Container } from 'reactstrap';
const Footer = () => {
    return (
        <div>
          <Container fluid tag="footer" className="text-center text-white bg-dark  p-1 fixed-bottom">
           All rights reserved.{" "+(new Date().getFullYear())}<br/> 
           copyright &#169; All Right Reserve Design & Developed By <span className="text-primary">sannykumar085@gmail.com</span>  
          </Container>
        </div>
    )
}

export default Footer;
