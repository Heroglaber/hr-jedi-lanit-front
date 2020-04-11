import {getCommonJsonRequestProps, throwHttpErrors} from "../common";
export const VACATION_APPROVAL_PROCESS_ID = 'vacation-approval';

export const getUserTaskList = (assignee, history) =>
  fetch(`/rest/task?assignee=${assignee}`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(tasks => tasks || []);

export const startProcess = (processId) =>
  fetch(`/rest/process-definition/key/${processId}/start`, {
    method: "POST",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response))
    .then(response => response.json());

export const getProcessIstanceVariables = (processInstanceId) =>
  fetch(`/rest/process-instance/${processInstanceId}/variables`, {
    method: "GET",
    ...getCommonJsonRequestProps()
  })
    .then(response => throwHttpErrors(response))
    .then(response => response.json());
