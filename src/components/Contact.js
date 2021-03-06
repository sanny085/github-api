// https://firebase.google.com/docs/database/web/read-and-write?authuser=1#read_data_once
import React, { useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
// icons 
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

//TODO: DONE add firebase
import firebase from "firebase/app";

// context stuffs
//TODO: DONE import context and action: update and single_contact
import UserContext from '../context/UserContext';
import { CONTACT_TO_UPDATE, SET_SINGLE_CONTACT } from "../context/action.types";

import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const Contact = ({ contact, contactKey }) => {
  //TODO: DONE destructuring dispatch from the context
  const { dispatch } = useContext(UserContext);
 

  useEffect( () => {
  
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time; 
  
  }  );

  // history hooks to get history
  const history = useHistory();
  
  // to delete the contact when delete contact is clicked
  const deleteContact = () => {
    //TODO: DONE create this method from firebase
    firebase
      .database()
      .ref(`/contacts/${contactKey}`)
      .remove()
      .then(() => {
        toast("Deleted Successfully", { type: "warning" });
      })
      .catch(err => console.log(err));
  };

  // update the star/important contact ,ie, star it or unstar the single contact
  const updateImpContact = () => {
    //TODO: DONE update (star) contact, use contactKey
    firebase
      .database()
      .ref(`/contacts/${contactKey}`)
      .update(
        {
          star: !contact.star
        },
        err => {
          console.log(err);
        }
      )
      .then(() => {
        toast("Contact Updated", { type: "info" });
      })
      .catch(err => console.log(err));
  };

  // when the update icon/ pen ion is clicked
  const updateContact = () => {
    // dispatching one action to update contact
    //TODO: use dispatch to update
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: contact,
      key: contactKey
    })
    // and pushing to the add contact screen
    history.push("/contact/add");
  };
  
  // to view a single contact in the contact/view screen
  const viewSingleContact = contact => {
    // setting single contact in state
    //TODO: use dispatch to view single contact
    dispatch({
      type: SET_SINGLE_CONTACT,
      payload: contact
    })
    // sending...
    history.push("/contact/view");
  };

  return (
    <>
        <Row>
        <Col md="1" className="d-flex justify-content-center align-items-center">
          <div className="icon" onClick={() => updateImpContact()}>
            {contact.star ? (
              <FaStar className=" text-primary" />
            ) : (
              <FaRegStar className=" text-info" />
            )}
          </div>
        </Col>
        <Col md="2" className="d-flex justify-content-center align-items-center">
          <img src={contact.picture} alt={contact.picture?.downloadURL} style={{width:'100px',height:'85px'}} className="rounded-circle profile" />
        </Col>
        <Col md="6" onClick={() => viewSingleContact(contact)}>
          <div className="text-primary">{contact.name}</div>

          <div className="text-secondary">{contact.phoneNumber}</div>
          <div className="text-secondary">{contact.email}</div>

          <div className="text-info">{contact.address}</div>
        </Col>
        <Col md="1" onClick={() => viewSingleContact(contact)}>
           {
            
           }
          
        </Col>
        <Col md="2" className="d-flex justify-content-center align-items-center">
          <MdDelete className="text-danger icon btn-sm" onClick={() => deleteContact()} color="danger"  size="sm" />
          <MdEdit className="icon text-info ml-2 btn-sm" onClick={() => updateContact()}  size="sm"/>
        </Col>
      </Row>
    
    
      
    </>
  );
  
};
export default Contact;

