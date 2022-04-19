import React, { useState } from "react";
import {useAuth0} from '@auth0/auth0-react';
import config from "../auth_config.json";

const { apiOrigin = "http://localhost:3001" } = config;

const LoginButton = () => {

    const {loginWithRedirect} = useAuth0();
    return (

            <button onClick={()=>loginWithRedirect()}>
                Log In
            </button>

    )
};


export default LoginButton