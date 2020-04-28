import React, {useContext, useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import getTaskComponent from "./getTaskComponent";
import AccessDenied from "../../errors/AccessDenied";
import {isOmniUser} from "../../common";
import {AppContext} from "../../AppContext";
import * as processApi from "../../api/processApi"
import {useSnackbar} from "../../utils/snackbar";

const Task = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const {history} = props;
  const taskId = props.match.params.id;
  const [task, setTask] = useState(null);
  const {showError} = useSnackbar();

  useEffect(() => {
    loadTask(taskId, setTask, showError, history)
  }, [history, taskId, showError]);

  if (!task) {
    return <CircularProgress/>;
  }

  const TaskComponent = getTaskComponent(task);
  return (isOmniUser(currentUser) || currentUser.username === task.assignee) ?
    <TaskComponent task={task} currentUser={currentUser} {...props}/> :
    <AccessDenied/>;
};

const loadTask = (taskId, setTask, showError, history) => {
  processApi.getTaskWithProcessInfoAndVariablesById(taskId, history)
    .then(setTask)
    .catch(error => showError("Ошибка при попытке загрузки информации по задаче: " + error))

};

export default Task;
