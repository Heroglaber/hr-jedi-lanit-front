import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getUserTaskList = (assignee, history) =>
  fetch(`/rest/task?assignee=${assignee}`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(tasks => tasks || []);

export const startProcess = (processKey, history, processVariables = {}) =>
  fetch(`/rest/process-definition/key/${processKey}/start`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: JSON.stringify(processVariables && {variables: processVariables}),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());

export const getProcessInstanceVariables = (processInstanceId, history) =>
  fetch(`/rest/process-instance/${processInstanceId}/variables`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());

export const getTaskWithProcessInfoAndVariablesById = (taskId, history) =>
  getTaskById(taskId, history)
    .then((task) => {
      const processId = task.processInstanceId;
      const processInfoPromise = getHistoryProcessInstanceById(processId, history);
      const taskVariablesPromise = getTaskLocalVariablesById(taskId, history)
        .then(variables => {
          return variables;
        });
      return Promise.all([processInfoPromise, taskVariablesPromise])
        .then((results) => {
          const [process, variables] = results;
          const [values, metas] = unwrapValues(variables);
          return {
            ...task,
            process,
            variables: values,
            variableMetas: metas,
          };
        });
    });

export const getTaskById = (taskId, history) =>
  fetch(`/rest/task/${taskId}`, {method: "GET", ...getCommonJsonRequestProps()})
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());


export const getHistoryProcessInstanceById = (processId, history) =>
  fetch(`/rest/history/process-instance/${processId}`, {method: "GET", ...getCommonJsonRequestProps()})
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());

const getTaskLocalVariablesById = (id, history) =>
  fetch(`/rest/task/${id}/localVariables`, {method: "GET", ...getCommonJsonRequestProps()})
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());

const unwrapValues = (variables) => {
  const values = {};
  const metas = {};
  Object.keys(variables).forEach((name) => {
    const variable = variables[name];
    const {value, ...meta} = variable;
    values[name] = value;
    metas[name] = meta;
  });
  return [values, metas];
};

export const getTasksByProcessIdAndAssignee = (processId, assignee, history) => {
  const url = `/rest/task?processInstanceId=${processId}` + (assignee ? `&assignee=${assignee}` : "");
  return fetch(url, {method: "GET", ...getCommonJsonRequestProps()})
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
};

export const completeTaskWithVariablesUpdating = (taskId, variablesUpdates, variableMetas, history) => {
  const updates = wrapValues(variablesUpdates, variableMetas);
  const patch = {modifications: {}};
  Object.keys(updates).forEach((name) => {
    patch.modifications[name] = {...updates[name]};
    if (patch.modifications[name].type === "Object") {
      patch.modifications[name].value = JSON.stringify(patch.modifications[name].value);
    }
  });
  return updateTaskLocalVariables(taskId, patch, history)
    .then(() => completeTask(taskId, history));
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


const completeTask = (taskId, history) =>
  fetch(`/rest/task/${taskId}/complete`, {
    ...getCommonJsonRequestProps(),
    method: "POST",
    body: "",
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.text());
