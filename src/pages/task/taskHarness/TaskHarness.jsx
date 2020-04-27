import React, {useState} from "react";
import TaskHarnessView from "./TaskHarnessView";
import * as taskApi from "../../../api/taskApi";
import {useSnackbar} from "../../../utils/snackbar";
import {emptyFunction} from "../../../common";
import {useFormik} from "formik";
import Button from "@material-ui/core/Button";

const TaskHarness = (props) => {
  const {uiDescription, task} = props;
  const {actions, defaultActionId} = uiDescription;
  const actionByActionIdMap = convertActionsToMapOfActionByActionId(actions);
  const [currentAction, setCurrentAction] = useState(actionByActionIdMap[defaultActionId] || actions[0]);
  const {showError} = useSnackbar();

  const {initialValues, values, handleSubmit, isSubmitting, setFieldValue, errors, setErrors} = useFormik({
    initialValues: {
      taskVariables: task.variables,
      taskVariableMetas: task.variableMetas
    },
    onSubmit: handleTaskSubmit(props, currentAction, showError),
    validate: currentAction.validate || emptyFunction,
    validateOnChange: false,
    validateOnBlur: false,
  });


  return <TaskHarnessView
    actionByActionIdMap={actionByActionIdMap}
    currentAction={currentAction}
    setCurrentAction={setCurrentAction}
    values={values}
    setFieldValue={setFieldValue}
    errors={errors}
    setErrors={setErrors}
    handleSubmit={handleSubmit}
    isSubmitting={isSubmitting}
    {...props}/>;

};

const convertActionsToMapOfActionByActionId = actions => {
  return Array.isArray(actions) ?
    actions.reduce((prevValue, action) => {
      prevValue[action.id] = action;
      return prevValue;
    }, {})
    : {};
};

const handleTaskSubmit = (props, currentAction, showError) => (values) => {

  const completeTaskAction = currentAction.completeTaskAction || defaultCompleteTaskAction;
  const postCompleteTaskAction = currentAction.postCompleteTaskAction || defaultPostCompleteAction;
  const updateVariables = currentAction.updateVariables || defaultUpdateVariables;
  const variableMetas = currentAction.variableMetas || values.taskVariableMetas;

  const {task} = props;
  const variablesUpdates = updateVariables(values.taskVariables, currentAction, task);
  return completeTaskAction(props, variablesUpdates, variableMetas, showError)
    .then(() => postCompleteTaskAction(props, showError));
};

const defaultCompleteTaskAction = (props, variablesUpdates, variableMetas, showError) => {
  const {task, history} = props;
  return taskApi.completeTaskWithUpdatingVariables(task.id, variablesUpdates, variableMetas, history)
    .catch(error => showError("Возникла ошибка при завершении задачи" + error));
};

const defaultPostCompleteAction = (props, showError) => {
  return taskApi.getTasksByProcessIdAndAssignee(props.task.processInstanceId, props.currentUser.username)
    .then(taskList => {
      const destinationUrl = taskList && taskList.length ? `/task/${taskList[0].id}` : "/";
      return props.history.push("/")
    })
    .catch(error => showError("Возникла ошибка при переходе со страницы задачи " + error));
};

const defaultUpdateVariables = (variables, action) => ({
  ...variables,
  action: action.id,
});

export default TaskHarness;
