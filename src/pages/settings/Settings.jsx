import React, {useState} from "react";
import SettingsView from "./SettingsView";
import {generateSecuredPassword} from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";

const Settings = (props) => {
  const [generatedPassword, setGeneratedPassword] = useState();
  const {history} = props;
  const {showError} = useSnackbar();
  const generatePassword = () =>
    generateSecuredPassword(history)
      .then(password => setGeneratedPassword(password))
      .catch(error => showError("Ошибка при попытке получить пароль: " + error));
  return (
    <SettingsView generatedPassword={generatedPassword} generatePassword={generatePassword}/>
  );
};

export default Settings;
