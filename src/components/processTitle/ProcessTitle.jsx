import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
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
        <ProcessStatus classes={classes} status={variables.processStatus || "---"}/>
      </Typography>
    </>
  );
};

const ProcessStatus = ({status, classes}) => {
  const [label, setLabel] = useState(null);
  useEffect(() => {
    Promise.resolve([])
      //.then(statuses => setLabel(statuses[status] || status));//todo доделать разрешение статусов
      .then(statuses => setLabel("Пока без статуса"));
  }, [status]);

  const preview = !label;
  return <span className={classNames(classes.processTitleStatus, {[classes.preview]: preview})}>{label || ""}</span>;
};

export default ProcessTitle;
