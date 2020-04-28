import React, {useState} from "react";
import TaskHarnessView from "./TaskHarnessView";
import * as processApi from "../../../api/processApi";
import {useSnackbar} from "../../../utils/snackbar";
import {emptyFunction} from "../../../common";
import {useFormik} from "formik";

const TaskHarness = (props) => {
  const {uiDescription, task} = props;
  const {actions, defaultActionId} = uiDescription;
  const actionByActionIdMap = convertActionsToMapOfActionByActionId(actions);
  const [currentAction, setCurrentAction] = useState(actionByActionIdMap[defaultActionId] || actions[0]);
  const {showError, showSuccess} = useSnackbar();

  const {values, handleSubmit, isSubmitting, setFieldValue, errors, setErrors} = useFormik({
    initialValues: {
      taskVariables: task.variables,
      taskVariableMetas: task.variableMetas
    },
    onSubmit: handleTaskSubmit(props, currentAction, showSuccess, showError),
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

const handleTaskSubmit = (props, currentAction, showSuccess, showError) => (values) => {

  const preCompleteTaskAction = currentAction.preCompleteTaskAction || defaultPreCompleteTaskAction;
  const completeTaskAction = currentAction.completeTaskAction || defaultCompleteTaskAction;
  const postCompleteTaskAction = currentAction.postCompleteTaskAction || defaultPostCompleteAction;
  const updateVariables = currentAction.updateVariables || defaultUpdateVariables;
  const variableMetas = currentAction.variableMetas || values.taskVariableMetas;

  const {task} = props;
  const variablesUpdates = updateVariables(values.taskVariables, currentAction, task);
  return preCompleteTaskAction(props, values, showSuccess, showError)
    .then(() => completeTaskAction(props, variablesUpdates, variableMetas, showError))
    .then(() => postCompleteTaskAction(props, showError))
    .then(() => showSuccess(`Задача "${task.name}" успешно завершена!`));
};

const defaultPreCompleteTaskAction = () => Promise.resolve("default pre-complete");

const defaultCompleteTaskAction = (props, variablesUpdates, variableMetas, showError) => {
  const {task, history} = props;
  return processApi.completeTaskWithVariablesUpdating(task.id, variablesUpdates, variableMetas, history)
    .catch(error => showError("Возникла ошибка при завершении задачи" + error));
};

const defaultPostCompleteAction = (props, showError) => {
  return processApi.getTasksByProcessIdAndAssignee(props.task.processInstanceId, props.currentUser.username)
    .then(taskList => {
      const destinationUrl = taskList && taskList.length ? `/task/${taskList[0].id}` : "/";
      return props.history.push(destinationUrl)
    })
    .catch(error => showError("Возникла ошибка при переходе со страницы задачи " + error));
};

const defaultUpdateVariables = (variables, action) => ({
  action: action.id,
});

export default TaskHarness;
