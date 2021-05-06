import React, { useState } from 'react'

import {
    
    Grid,
    Tabs
} from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import {Button} from 'reactstrap';
import './AddContact.css'

const AddContact = () => {
    const [tabvalue, setTabvalue] = useState("Overview");
   
    const ResumeData = {
        projects : [
                   {tag:'Repository'},
                   {tag:'Projects'},
                   {tag:'Projects'},
                   {tag:'Packages'}
                ]
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
