import React, { useContext} from "react";

import { Container, ListGroup, ListGroupItem, Spinner, Row, Col } from "reactstrap";
import Contact from "./Contact";  
import UserContext from "../context/UserContext"; 

const MainContacts = () => {
  const { state } = useContext(UserContext);

  // destructuring contacts and isLoading from state
  const { contacts, isLoading } = state;
  // history hooks from react router dom to get history
   
  // handle fab icon button click
  // will set in state of the contact to update and send it to the contact/add route
 

  // return loading spinner
  if (isLoading) {
    return (
      <div className="Center">
        <Spinner color="primary" />
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      {/* TODO: Loop through FIREBASE objects  */}
      {
       contacts.length === 0 && !isLoading ? (
        <div className="Center text-large text-primary">
          NO Contacts found in firebase
        </div>
      ) : (
        <ListGroup>
          {Object.entries(contacts).map(([key, value]) => (
            <ListGroupItem key={key} className="m-1">
                <Contact contact={value} contactKey={key} />
            </ListGroupItem>
           ))}
        </ListGroup>
       )
      }
     
    </Container>
  );
};

export default MainContacts;
