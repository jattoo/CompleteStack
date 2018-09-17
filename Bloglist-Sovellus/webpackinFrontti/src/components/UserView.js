import React from 'react'
import { BrowserRouter as Router,Route,  Link } from 'react-router-dom'
import {  Table } from 'react-bootstrap'


const UserView = ({ users, view}) => {
    //console.log('users: ',users.map(user=>user))
    return (
        <div>  
            <div>
                {view}
                <div>
                    <h1>blog app users</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th></th>
                                <th>blog added</th>
                            </tr>
                        </thead>
                        
                        { users ?
                            users.map(user =>
              
                                <tbody key={user.id}>
                                    <tr >
                                        <td >
                                            <Link to={`/users/${user.id}`}>{user.name} </Link>
                                        </td>
                                        <td>{user.blogs.length}</td>
                                    </tr>
                                </tbody>
                            ):
                            ''}
                        
                    </Table>
                </div>
            </div>
        </div> 
    )
}

export default UserView
