import jwtDecode from "jwt-decode";
import {getCommonJsonRequestProps, throwHttpErrors} from "../common";

export const setCurrentUserToken = (currentUserToken) => {
  if (currentUserToken) {
    localStorage.setItem("hrjedi-token", currentUserToken);
  } else {
    localStorage.removeItem("hrjedi-token");
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
  const currentUserToken = localStorage.getItem("hrjedi-token");
  if (currentUserToken) {
    const decodedJwt = jwtDecode(currentUserToken);
    if (Date.now() >= decodedJwt.exp * 1000) {
      setCurrentUserToken(null);
      return null;
    }
    return JSON.parse(decodedJwt.currentUser);
  }
  return null;
};

