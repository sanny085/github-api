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
