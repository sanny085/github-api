import React from 'react'
import {Card, CardBody} from 'reactstrap'; 

const UserCart = ({user}) => {
    return (
        <Card className="text-center mt-3 mb-4"> 
            <img src={user.avatar_url} alt={user.login}/>
            <CardBody>
              <div className="text-primary">{user.location}</div>
              <div className="text-primary">{user.name}</div>
              <div className="text-primary">{user.bio}</div>
              
              <div className="text-primary">Available for Hier : {user.hireable ? "Yes" : "No"}</div>
              <div className="text-primary">{user.followers}</div>
            </CardBody>
        </Card>
    )
}
 

export default UserCart;
