import React, {useContext, useEffect} from "react";
import {hot} from "react-hot-loader";
import {withRouter} from "react-router-dom";
import IdleTimer from "react-idle-timer";
import AppView from "./AppView";
import * as securityApi from "../api/securityApi";
import {useSnackbar} from "../utils/snackbar";
import {AppContext} from "../AppContext";
import Login from "../pages/login/Login";

const logout = (currentUserName, context, setContext, snackbar) => () => {
  securityApi.logout()
    .then(() => setContext({...context, currentUser: null}))
    .then(() => snackbar.showSuccess(`Вас слишком долго не было, ${currentUserName}!`));

};

const App = (props) => {
  const [context, setContext] = useContext(AppContext);
  const currentUser = context.currentUser;
  const snackbar = useSnackbar();

  useEffect(() => {
    setContext({...context, currentUser: securityApi.getCurrentUser()});
  },[]);

  const currentUserName = currentUser && currentUser.login;

  return (
      currentUser ?
        <IdleTimer element={document} onIdle={logout(currentUserName, context, setContext, snackbar)} timeout={1000 * 60 * 30}>
          <AppView {...props}/>
        </IdleTimer>
        :
        <Login/>
  );

};

export default withRouter(hot(module)(App));
