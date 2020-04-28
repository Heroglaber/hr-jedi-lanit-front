import React, {useContext, useEffect, useState} from "react";
import ProfileView from "./ProfileView";
import {AppContext} from "../../AppContext";
import {findUser, loadAvatar, updateEmail} from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";

const onSave = (history, location, currentUser, setCurrentUser, showError) => (values) => {
  return updateEmail(history, values.email).then(() => {
      currentUser.email = values.email;
      setCurrentUser(currentUser);
    })
    .catch(() => showError("Произошла ошибка обновлении почтового ящика"));
};

const Profile = (props) => {
  const [context] = useContext(AppContext);
  const {history, location} = props;
  const tokenUser = context.currentUser;
  const [currentUser, setCurrentUser] = useState();
  const [avatar, setAvatar] = useState();
  const {showError} = useSnackbar();
  const save = onSave(history, location, currentUser, setCurrentUser, showError);

  useEffect(() => {
    findUser(history, tokenUser.username).then(user => setCurrentUser(user))
      .catch(() => showError("Произошла ошибка при загрузке информации о пользователе"));
  }, [tokenUser, history, showError]);

  useEffect(() => {
    loadAvatar(history).then(avatar => setAvatar(avatar))
      .catch(() => showError("Произошла ошибка при скачивании аватара"));
  }, [history, showError]);

  return (
    <ProfileView
      currentUser={currentUser}
      onSave={save}
      avatar={avatar}
    />
  );
};

export default Profile;
