import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    // const { authTokens, setAuthTokens } = useAuth();

    const validateAuthTokens = () => {
        // if (!authTokens) {
        //     return false;
        // } else if (authTokens.issued_at + authTokens.expires_in < Date.now()) {
        //     setAuthTokens("");
        //     return false;
        // }
        // return true;

        if (Cookies.get("logged")) {
            return Cookies.get("logged");
        } else {
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                validateAuthTokens() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
            }
        />
    );
};

export default ProtectedRoute;
