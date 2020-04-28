import ServerValidationError from "./errors/ServerValidationError";
import * as locale from "date-fns/locale";
import classNames from "classnames";
import {OMNI} from "./security/Authorities";

const getUserLanguage = () => {
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  } else {
    return window.navigator.userLanguage || window.navigator.language;
  }
};

const getUserDateDnsLocale = () => {
  let localeName = getUserLanguage().replace("-", "");
  let localeNameShort = getUserLanguage().replace(/[A-Z]*/, "");
  return locale[localeName] || locale[localeNameShort] || locale.ru;
};

export const USER_LOCALE = getUserDateDnsLocale();

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
  const token = localStorage.getItem("hrjedi-token");
  if (token) {
    props.headers = {Authorization: `Bearer ${localStorage.getItem("hrjedi-token")}`};
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

export const isOmniUser = user => {
  const userAuthorities = user && user.authorities ? user.authorities.map(authObject => authObject.authority) : [];
  return userAuthorities.includes(OMNI);
};

export const previewfy = (classes, className, preview) => classNames({[className]: className, [classes.preview]: preview});

export const disablefy = (classes, className, preview, disabled) =>
  classNames({[className]: className, [classes.preview]: preview, [classes.disabled]: disabled});

export const emptyFunction = () => {
};

export const isString = checkedValue => typeof checkedValue === 'string' || checkedValue instanceof String;
