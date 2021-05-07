import React from 'react'

import { Container } from 'reactstrap';
const Footer = () => {
    return (
        <Container fluid={true} className="bg-dark fixed-bottom pt-1 pb-1"> 
          <Container   tag="footer" className="text-justify text-white bg-dark ">
           <span style={{fontSize:'13px'}}>All rights reserved.{" "+(new Date().getFullYear())}<br/> 
           copyright &#169; All Right Reserve Design & Developed By <span className="text-primary">sannykumar085@gmail.com</span>  
           </span>
          </Container>
        </Container>
    )
}

export default Footer;
