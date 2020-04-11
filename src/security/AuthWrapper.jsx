import React, {useContext} from "react";
import {AppContext} from "../AppContext";

/**
 * In this component methods React.Children.map and React.cloneElement are used to pass arguments of AuthWrapper to its child elements.
 * React.Children.map is used to invoke a clone function for every child component of AuthWrapper and returns an array of cloned child elements.
 * React.cloneElement is used to clone component passed to it and to assign arguments of AuthWrapper to a cloned component.
 */
const AuthWrapper = ({authorities, children, dispatch, ...otherProps}) => {
  const [context] = useContext(AppContext);
  const userAuthorities = context.currentUser && context.currentUser.authorities ? context.currentUser.authorities.map(authObject => authObject.authority) : [];
  if (authorities.some(authority => userAuthorities.includes(authority))) {
    return <>{React.Children.map(children, child => React.cloneElement(child, {...otherProps}))}</>;
  }
  return <></>;
};

export default AuthWrapper;

