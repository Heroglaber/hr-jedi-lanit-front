import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getUserTaskList = (assignee, history) =>
  fetch(`/rest/task?assignee=${assignee}`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(tasks => tasks || []);

export const getUserTask = (processKey, taskId, executionId) => {
  const params = new URLSearchParams();
  params.append("processDefinitionKey", processKey);
  params.append("taskDefinitionKey", taskId);

  if (executionId) {
    params.append("executionId", executionId);
  }
  return fetch(`/rest/task?${params}`)
    .then(throwHttpErrors)
    .then(response => response.json());
};

export const completeTask = (taskId, variables, history) => {
  return fetch(`/rest/task/${taskId}/complete`, {
    method: 'POST',
    body: JSON.stringify({variables: variables}),
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history));
};

export const claimTask = (userId, taskId) => {
  return fetch(`/rest/task/${taskId}/claim`, {
    method: "POST",
    body: JSON.stringify({id: userId}),
    ...getCommonJsonRequestProps()
  })
    .then(throwHttpErrors)
};

export const startProcess = (processId, history, variables) => {
  return fetch(`/rest/process-definition/key/${processId}/start`, {
    method: "POST",
    body: JSON.stringify({variables: variables}),
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());
};

export const getProcessInstanceVariables = (processInstanceId) =>
  fetch(`/rest/process-instance/${processInstanceId}/variables`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response))
    .then(response => response.json());

export const findProcessInstance = (searchParams, history) => {
  const params = new URLSearchParams();
  for (let key in searchParams) {
    if (!searchParams.hasOwnProperty(key)) {
      continue;
    }
    params.append(key, searchParams[key]);
  }
  return fetch(`/rest/process-instance?${params}`)
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
};

export const sendMessage = (processInstanceId, messageName, history) => {
  return fetch(`/rest/message`, {
    method: "POST",
    body: JSON.stringify({
      messageName: messageName,
      processInstanceId: processInstanceId
    }),
  ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history));
};