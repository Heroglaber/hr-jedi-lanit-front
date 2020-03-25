import React from "react";
import {Route, Switch} from "react-router-dom";
import Helmet from "react-helmet";
import NotFound from "../errors/NotFound";
import Login from "../pages/login/Login";
import SystemInfo from "../pages/systemInfo/SystemInfo";
import Landing from "../pages/landing/Landing";
import {useAppStyles} from "./appStyles";
import AuthRoute from "../security/AuthRoute";
import {ADMIN, ALL, OMNI} from "../security/Authorities";
import AccessDenied from "../errors/AccessDenied";

const App = () => {
  const classes = useAppStyles();
  return (
    <div>
      <Helmet bodyAttributes={{class: classes.body}}/>
      <Switch>
        <Route path="/login" component={Login} exact/>
        <AuthRoute path="/" component={Landing} authorities={ALL} exact/>
        <AuthRoute path="/system" component={SystemInfo} authorities={[ADMIN, OMNI]} exact/>
        <AuthRoute path="/access-denied" component={AccessDenied} exact/>
        <AuthRoute path="/" component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;