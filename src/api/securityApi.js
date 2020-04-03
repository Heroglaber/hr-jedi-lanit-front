import jwtDecode from "jwt-decode";
import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const extractUserInfoFromJwt = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(jwtDecode(token).userInfo) : null;//todo проверить
};

export const setCurrentUserToken = (currentUserToken) => {
  if (currentUserToken) {
    localStorage.setItem("token", currentUserToken); //todo проверить
  } else {
    localStorage.removeItem("token");
  }
};

export const login = (login, password) =>
  fetch(`/hr-rest/security/login`, {
    method: "POST",
    headers: {
      ...getCommonJsonRequestProps().headers,
    },
    body: JSON.stringify({login, password}),
  })
    .then(throwHttpErrors)
    .then(response => response.json())
    .then(jwtResponse => jwtResponse.accessToken)
    .then(accessToken => {
      setCurrentUserToken(accessToken);
      return getCurrentUser();
    });

export const logout = () => new Promise((resolve) => {
  setCurrentUserToken(null);
  resolve();
});

export const getCurrentUser = () => {
  const currentUserToken = localStorage.getItem("token");
  if (currentUserToken) {
    const decodedJwt = jwtDecode(currentUserToken);
    return JSON.parse(decodedJwt.currentUser);
  }
  return null;
};

export const getAllUsers = (history) =>
  fetch(`/hr-rest/security/user`, {
    method: "GET",
    ...getCommonJsonRequestProps(),
  })
    .then(response => throwHttpErrors(response, history))
    .then(response => response.json())
    .then(users => users || []);
