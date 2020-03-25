import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSimplePageStyles} from "../../styles/simplePageStyles";

const AppVersionLabel = ({appVersion, label = "", delimiter = false, preview = true, className}) => {
  const classes = useSimplePageStyles();
  return (
    (preview) || !appVersion ?
      <Typography className={className} component="span">
        {label.concat(": ")}
        <CircularProgress className={classes.progress}/>
      </Typography> :
      <Typography className={className} component="span">
        {label.concat(delimiter ? ": " : " ")}
        {appVersion}
      </Typography>
  );
};

export default AppVersionLabel;
