import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
const Profile = () => {
    // Here "user" stores the login user information
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
        <div>
            <h2>{user.name}</h2>
            <JSONPretty data={user} />
        </div>
        )
    )
}

export default Profile