import React from "react";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Helmet from "react-helmet";
import {useProcessTitleStyles} from "./processTitleStyles";

const ProcessTitle = ({task, process, isTitleNavigable = true}) => {
  const classes = useProcessTitleStyles();
  const proc = process || task.process;
  const variables = (task && task.variables) || (process && process.variables) || {};
  const helmetTitle = `${proc.businessKey || "---"} - ${task ? "Задачи" : "Процессы"} - Пампа`;
  return (
    <>
      <Helmet title={helmetTitle}/>
      <Typography className={classes.processTitle} variant="h3">
        {isTitleNavigable ?
          <NavLink to={`/process/${proc.id}`} className={classes.processTitleKey}>{proc.businessKey || "---"}</NavLink>
          :
          <span className={classes.processTitleKey}>{proc.businessKey || "---"}</span>
        }
        {variables.processName || "---"}
        <span className={classes.processTitleStatus}>{variables.processStatus || "---"}</span>
      </Typography>
    </>
  );
};

export default ProcessTitle;
