import React, {useContext, useEffect, useState} from "react";
import * as processApi from "../../api/processApi";
import TaskListView from "./TaskListView";
import {useSnackbar} from "../../utils/snackbar";
import {AppContext} from "../../AppContext";

const TaskList = (props) => {
  const [context] = useContext(AppContext);
  const {currentUser} = context;
  const [tasks, setTasks] = useState();
  const {history} = props;
  const {showError} = useSnackbar();

  useEffect(() => {
    loadTasks(currentUser, setTasks, history, showError);
  }, [currentUser, history, showError]);

  const onTaskClick = taskId => () => {
    history.push(`/task/${taskId}`);
  };

  return <TaskListView tasks={tasks} onTaskClick={onTaskClick}/>;
};

function loadTasks(currentUser, setTasks, history, showError) {
  processApi.getUserTaskList(currentUser.username || "", history)
    .then(tasks => {
      const updatedTasksPromises = tasks.map(task => {
        const {processInstanceId} = task;

        return processApi.getHistoryProcessInstanceById(processInstanceId, history)
          .then(processInstance => {
            return processApi.getProcessInstanceVariables(processInstanceId, history)
              .then(processVariables => {
                task.processBusinessKey = processInstance.businessKey || '';
                task.processName = processVariables.processName.value || '';
                return task;
              });
          });
      });

      Promise.all(updatedTasksPromises).then(resolvedTasks => setTasks(resolvedTasks));
    })
    .catch(error => showError("Ошибка при попытке загрузки списка задач: " + error))
}

export default TaskList;
