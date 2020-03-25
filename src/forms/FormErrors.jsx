import React from "react";
import Card from "@material-ui/core/Card";

export default ({classes, children}) => (
  <Card className={classes ? classes.formGeneralError : null}>
    {children}
  </Card>
);
