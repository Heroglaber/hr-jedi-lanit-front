import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getTasksByProcessIdAndAssignee = (processId, assignee, history) => {
  const url = `/rest/task?processInstanceId=${processId}` + (assignee ? `&assignee=${assignee}` : "");
  return fetch(url, {method: "GET", ...getCommonJsonRequestProps()})
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
};

export const completeTaskWithUpdatingVariables = (taskId, variablesUpdates, variableMetas, history) => {
  const updates = wrapValues(variablesUpdates, variableMetas);
  const patch = {modifications: {}};
  Object.keys(updates).forEach((name) => {
    patch.modifications[name] = {...updates[name]};
    if (patch.modifications[name].type === "Object") {
      patch.modifications[name].value = JSON.stringify(patch.modifications[name].value);
    }
  });
  return updateTaskLocalVariables(taskId, patch, history)
    .then(() => camundaCompleteTask(taskId, history));
};

const wrapValues = (values, metas) => {
  const variables = {};
  Object.keys(values).forEach((name) => {
    variables[name] = {
      ...(metas[name] || []),
      value: values[name],
    };
  });
  return variables;
};

const updateTaskLocalVariables = (taskId, patch, history) =>
  fetch(`/rest/task/${taskId}/localVariables`, {
    ...getCommonJsonRequestProps(),
    method: "POST",
    body: JSON.stringify(patch),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.text());


const camundaCompleteTask = (taskId, history) =>
  fetch(`/rest/task/${taskId}/complete`, {
    ...getCommonJsonRequestProps(),
    method: "POST",
    body: "",
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.text());
