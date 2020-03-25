/* eslint-disable no-useless-escape */
import React, {useContext} from "react";
import LoginView from "./LoginView";
import {useFormik} from "formik";
import {formikValidate} from "../../forms";
import {required} from "../../forms/formik/formikValidationRules";
import * as securityApi from "../../api/securityApi";
import {AppContext} from "../../AppContext";
import {useSnackbar} from "../../utils/snackbar";

const validate = formikValidate({
  login: [required()],
  password: [required()],
});

const handleLogin = (history, location, context, setContext, showError) =>(values) => {
    return securityApi.login(values.login, values.password)
      .then((currentUser) => {
        setContext({...context, currentUser});
        if(!currentUser){
          return currentUser;
        }
        if (location.state && location.state.from) {
          return history.push(location.state.from);
        } else{
          return history.push("/");
        }
      })
      .catch(error => showError("Ошибка аутентификации: Неверное имя пользователя или пароль"));
  };
const Login = props => {
  const [context, setContext] = useContext(AppContext);
  const {history, location} = props;
  const {showError} = useSnackbar();
  const login = handleLogin(history, location, context, setContext, showError);

  const {values, errors, handleSubmit, handleChange, isSubmitting, setErrors} = useFormik({
    initialValues: {
      login: "",
      password: ""
    },
    onSubmit: (values) => {
      return login(values)
    },
    validate,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return <LoginView
    appName="HR Jedi"
    values={values}
    errors={errors}
    handleSubmit={handleSubmit}
    handleChange={handleChange}
    isSubmitting={isSubmitting}
    setErrors={setErrors}
    {...props}
  />;
};

export default Login;
