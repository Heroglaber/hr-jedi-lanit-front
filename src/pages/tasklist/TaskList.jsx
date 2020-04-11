import React, {useContext, useEffect, useState} from "react";
import * as processApi from "../../api/processApi";
import ViewTaskList from "./ViewTaskList";
import {useSnackbar} from "../../utils/snackbar";
import {AppContext} from "../../AppContext";

const TaskList = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const [tasks, setTasks] = useState();
  const {history} = props;
  const {showError} = useSnackbar();

  useEffect(() => {
    loadTasks(currentUser, setTasks, history, showError)
  }, [currentUser, history, showError]);

  const onTaskClick = taskId => () => {
    history.push(`/task/${taskId}`);
  };

  return <ViewTaskList tasks={tasks} onTaskClick={onTaskClick}/>;
};

function loadTasks(currentUser, setTasks, history, showError) {
  processApi.getUserTaskList(currentUser.username || "", history)
    .then(tasks => {
      const updatedTasks = tasks.map(task => {
          return processApi.getProcessIstanceVariables(task.processInstanceId)
            .then(processVariables => {
              task.processBusinessKey = processVariables.businessKey.value;
              task.processName = processVariables.name.value;
              return task;
            })
        });
        Promise.all(updatedTasks).then(resolvedTasks => setTasks(resolvedTasks));
    })
    .catch(error => showError("Ошибка при попытке загрузки списка задач: " + error))
}

export default TaskList;
