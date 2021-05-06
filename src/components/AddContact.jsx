import React, { useState, useContext, useEffect } from 'react';
import {
    Grid, 
    Tabs
       } from "@material-ui/core";

import Tab from '@material-ui/core/Tab';

import { 
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Spinner,
    Row,
    Col
} from 'reactstrap';

import firebase from 'firebase/app';

import {imageConfig} from '../utils/config';
import { readAndCompressImage } from 'browser-image-resizer';
import { v4 } from 'uuid';

import UserContext from '../context/UserContext';
import {CONTACT_TO_UPDATE} from '../context/action.types';

import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'; 
import './AddContact.css';


const AddContact = () => {
    const {state, dispatch} = useContext(UserContext);

    const [tabvalue, setTabvalue] = useState("Overview");
    const ResumeData = {
        projects : [
                   {tag:'Repository'},
                   {tag:'Projects'},
                   {tag:'Projects'},
                   {tag:'Packages'}
                ]
            };

    const {contactToUpdate, contactToUpdateKey} = state; 
    const history = useHistory();    
    
     // simple state of all component
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [star, setStar] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

     // when their is the contact to update in the Context state
     // then setting state with the value of the contact
     // will changes only when the contact to update changes
    useEffect( () => {
        if (contactToUpdate) {
            setName(contactToUpdate.name);
            setEmail(contactToUpdate.email);
            setPhoneNumber(contactToUpdate.phoneNumber);
            setAddress(contactToUpdate.address);
            setStar(contactToUpdate.star);
            setDownloadUrl(contactToUpdate.picture);

            // also setting is update to true to make the update action instead the addContact action
            setIsUpdate(true);
        }
    }, [contactToUpdate]);

  
   // To upload image to firebase and then set the the image link in the state of the app
   const imagePicker = async e => {
    // TODO: upload image and set D-URL to state
    try {
      const file = e.target.files[0];

      var metadata = {
        contentType: file.type
      };

      let resizedImage = await readAndCompressImage(file, imageConfig);
      const storageRef = await firebase.storage().ref();
      var uploadTask = storageRef
        .child("images/" + file.name)
        .put(resizedImage, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
        setIsUploading(true);
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            setIsUploading(false);
            console.log("UPloading is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("UPloading is in progress...");
            break;
        }
       if(progress == 100){
        setIsUploading(false);
        toast("uploaded", {type: "success"})
       }

      });
    }
    catch (error) {
      console.error(error);
      toast("Something went wrong", { type: "error" });
    }

  };

  // setting contact to firebase DB
  const addContact = async () => {
    //TODO: add contact method
  };

  // to handle update the contact when there is contact in state and the user had came from clicking the contact update icon
  const updateContact = async () => {
    //TODO: update contact method
  };

  // firing when the user click on submit button or the form has been submitted
  const handleSubmit = e => {
    e.preventDefault();

    // isUpdate wll be true when the user came to update the contact
    // when their is contact then updating and when no contact to update then adding contact
    //TODO: set isUpdate value

    // to handle the bug when the user visit again to add contact directly by visiting the link
    dispatch({
      type: CONTACT_TO_UPDATE,
      payload: null,
      key: null
    });

    // after adding/updating contact then sending to the contacts
    // TODO :- also sending when their is any errors
    history.push("/");
  };



return (
<>
{/*Tabs*/}
<Grid item xs={12}>
    <Tabs value={tabvalue} indicatorColor="white" className="customTabs" 
        onChange={(event, newValue) =>{setTabvalue(newValue) }}>

        <Tab label="Overview" value="Overview" 
            className={ tabvalue === 'Overview' ? 'customTabs_item active mx-2' : 'customTabs_item mx-2'} />   
        {/*Set method remove Duplicate value from listing*/}
        { [...new Set(ResumeData.projects.map((items) => items.tag ))].map( (n)=>  (
            <Tab label={n}  value={n} className={tabvalue === n ? 'customTabs_item active mx-2' : 'customTabs_item mx-2'}/>
          ) )
        }
    </Tabs>
</Grid>
{/*End Tabs*/}

{/*Project*/}
<Grid container>
    <Grid item xs={12}>
     {
        tabvalue === "Repository" ? (
            <>
            <div class="d-flex flex-row-reverse bd-highlight">
              <Button color="success ">Add New </Button> 
            </div>
            </>
        ) : null 
     }
    </Grid>
 </Grid>
{/*End Project*/}
 

</>
 )
}

export default AddContact;
