import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import AccessDenied from "../errors/AccessDenied";
import {AppContext} from "../AppContext";
import Harness from "../pages/harness/Harness";

const AuthRoute = ({component: Component, authorities = [], ...otherProps}) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const userAuthorities = currentUser && currentUser.authorities ? currentUser.authorities.map(authObject => authObject.authority) : [];
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (!currentUser) {
          return <Redirect to={{pathname: "/login", state: {from: props.location}}}/>;
        }

        const getPageComponent = () => {
          if (authorities.length && !authorities.some(authority => userAuthorities.includes(authority))) {
            return AccessDenied;
          }
          return Component;
        };

        const PageComponent = getPageComponent();
        return <Harness currentUser={currentUser}><PageComponent {...props} authorities={authorities}/></Harness>;
      }}
    />
  );
};


export default AuthRoute;
