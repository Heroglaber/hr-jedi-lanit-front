import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const getAllUsers = (history) =>
  fetch(`/hr-rest/employees`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(users => users || []);

export const updateEmail = (history, email) =>
  fetch(`/hr-rest/employees/current/update-email`, {
    method: "POST",
    ...getCommonJsonRequestProps(),
    body: email,
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(users => users || []);

export const findUser = (history, login) =>
  fetch(`/hr-rest/employees/${login}`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json());
