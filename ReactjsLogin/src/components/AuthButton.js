import React, { useState } from "react";
import {useAuth0} from '@auth0/auth0-react';
import config from "../auth_config.json";

const { apiOrigin = "http://localhost:3001" } = config;

const AuthButton = () => {

    const {getAccessTokenSilently} = useAuth0();

    const callProtectedEndpoint = async() => {
        try {
            const token = await getAccessTokenSilently({
                audience:'https://nodejs-auth/api',
                scope:'read:posts',
            });
            console.log(token);
            const response = await fetch(`${apiOrigin}/api/protected`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {

        }
    };
    return (

            <button onClick={callProtectedEndpoint}>
                Authorize
            </button>

    )
};


export default AuthButton