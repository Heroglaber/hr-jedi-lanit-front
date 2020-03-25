import ServerValidationError from "./errors/ServerValidationError";

const unescapeMessage = (text) => {
  let value = text;
  if (value.startsWith("\"")) {
    value = value.slice(1);
  }
  if (value.endsWith("\"")) {
    value = value.slice(0, -1);
  }
  return value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\\t/g, "    ").replace(/\\"/g, "\"");
};

export const throwHttpErrors = (response, history) => {
  if (response.status === 409) {
    return new Promise((resolve, reject) => response.json()
      .then(violations => reject(new ServerValidationError(violations))));
  }

  if (response.status >= 400 && response.status <= 599) {
    if (response.status === 401) {
      history.push("/login");
    }
    return new Promise((resolve, reject) => response.text()
      .then(text => reject(new Error(`${response.status} ${response.statusText}\n\n${unescapeMessage(text || "<empty body>")}`))));
  }
  return response;
};

export const getCommonHttpRequestProps = () => {
  const props = {credentials: "same-origin"};
  const token = localStorage.getItem("token");
  if (token) {
    props.headers = {Authorization: `Bearer ${localStorage.getItem("token")}`};
  }
  return props;
};

export const getCommonJsonRequestProps = () => {
  const commonHttpRequestProps = getCommonHttpRequestProps();
  const headers = {Accept: "application/json", "Content-Type": "application/json;charset=UTF-8"};
  if (commonHttpRequestProps.headers && commonHttpRequestProps.headers.Authorization) {
    headers.Authorization = commonHttpRequestProps.headers.Authorization;
  }
  return {
    ...commonHttpRequestProps,
    headers,
  };
};
