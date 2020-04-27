import React, {useContext, useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import getTaskUiDescription from "./getTaskUiDescription";
import AccessDenied from "../../errors/AccessDenied";
import {isOmniUser} from "../../common";
import {AppContext} from "../../AppContext";
import * as processApi from "../../api/processApi"
import {useSnackbar} from "../../utils/snackbar";
import TaskStub from "./TaskStub";
import TaskHarness from "./taskHarness/TaskHarness";
import Button from "@material-ui/core/Button";

const Task = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const {history} = props;
  const taskId = props.match.params.id;
  const [task, setTask] = useState(null);
  const {showError} = useSnackbar();

  useEffect(() => {
    loadTask(taskId, setTask, showError, history)
  }, [loadTask, history]);

  if (!task) {
    return <CircularProgress/>;
  }

  const taskUiDescription = getTaskUiDescription(task);
  const TaskComponent = taskUiDescription ? TaskHarness  : TaskStub;

  return (isOmniUser(currentUser) || currentUser.username === task.assignee) ?
    <TaskComponent uiDescription={taskUiDescription} task={task} currentUser={currentUser} {...props}/> :
    <AccessDenied/>;
};

const loadTask = (taskId, setTask, showError, history) => {
  processApi.getTaskWithProcessInfoAndVariablesById(taskId, history)
    .then(setTask)
    //.then(a => history.push("/task-list"))
    .catch(error => showError("Ошибка при попытке загрузки информации по задаче: " + error))

};

export default Task;
