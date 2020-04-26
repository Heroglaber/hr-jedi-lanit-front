import React from "react";
import * as securityApi from "../../api/securityApi";
import HarnessView from "./HarnessView";
import {withRouter} from "react-router";

const Harness = (props) => {
  const {children, history} = props;
  const onLogoutClick = () => {
    securityApi.logout()
      .then(() => history.push("/login"))
  };

  return <HarnessView {...props} onLogoutClick={onLogoutClick}>{children}</HarnessView>;
};

export default withRouter(Harness);
