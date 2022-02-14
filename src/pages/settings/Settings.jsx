import React, {useState} from "react";
import SettingsView from "./SettingsView";
import {generateSecuredPassword, uploadEmployees} from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";

const Settings = (props) => {
  const [generatedPassword, setGeneratedPassword] = useState();
  const {history} = props;
  const {showError, showSuccess} = useSnackbar();
  const generatePassword = () =>
    generateSecuredPassword(history)
      .then(password => setGeneratedPassword(password))
      .catch(error => showError("Ошибка при попытке получить пароль: " + error));
  const uploadUsers = (jsonFile) => {
    const usersData = new FormData();
    usersData.append("userFile", jsonFile);
    uploadEmployees(history, usersData)
      .then(response => showSuccess(response))
      .catch(error => showError("Ошибка при попытке загрузки пользователей: " + error))
  };
  return (
    <SettingsView generatedPassword={generatedPassword} generatePassword={generatePassword} 
            uploadUsers={uploadUsers} />
  );
};

export default Settings;
