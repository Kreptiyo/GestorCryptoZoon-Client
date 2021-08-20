import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button className="btn btn-light" onClick={() => loginWithRedirect()} style={{marginTop: '50px'}}>Login</button>;
};