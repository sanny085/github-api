import React from 'react'
import {Card, CardBody} from 'reactstrap'; 
 
import { GoLocation } from "react-icons/go";

const UserCart = ({user}) => {
    return (
        <Card className="mb-4"  > 
            <img src={user?.avatar_url} alt={user?.login} className="p-1" style={{borderRadius:'50%',width:'275px'}}/>
            <CardBody>
              <h2 className="card-title text-left">{user?.name}</h2>
              <span className="card-subtitle text-left text-secondary">{user?.login}</span><br/> 
              
              <p className="text-dark p-0"><span style={{fontSize:'14px'}}>{user?.bio}</span></p>
              <div className="text-dark">{user?.followers ?  (user.followers + " followers") : " "}&nbsp;&nbsp;&nbsp;&nbsp;{user?.following ?  (user.following + " following") : " "}</div>
              <br/>
              <span className="text-muted">{(user?.location) ?   ( "Location : "+user?.location) : (" ") }</span>
              <div className="text-danger">Available for Hier : {user?.hireable ? "Yes" : "No"}</div>
             </CardBody>
        </Card>
    )
}
 

export default UserCart;
