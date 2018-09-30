import React from 'react'
import UserView from './UserView'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const UsersBlog = (props) => {
  
    if(props.user === undefined){  
        return(
            <div>
                <UserView users={props.allUsers} />
            </div>
        )
    } else if (props.user !== undefined){
        return (
            <div>
                <h1>blog app</h1>
                <h2>{props.user.name}</h2>
                <h4>{'Added: '}</h4>
                {
                    props.user.blogs.map(m =>
                        <div  key={m.id || m._id}>
                            <ListGroup>
                                <ListGroupItem href="#" disabled>
                                    {m.title}
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    )
          
                }
            </div>
        )
    }
}

export default UsersBlog