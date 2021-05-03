import React from 'react'
import {Card, CardBody} from 'reactstrap'; 

const UserCart = ({user}) => {
    return (
        <Card className=" mt-3 mb-4"> 
            <img src={user?.avatar_url} alt={user?.login} style={{borderRadius:'50%'}}/>
            <CardBody>
            <h1 className="card-title text-left">{user?.name}</h1>
              <div className="text-primary">Location : {user?.location}</div>
              
              <div className="text-primary">{user?.bio}</div>
              
              <div className="text-primary">Available for Hier : {user?.hireable ? "Yes" : "No"}</div>
              <div className="text-primary">Followers : {user?.followers}</div>
            </CardBody>
        </Card>
    )
}
 

export default UserCart;
