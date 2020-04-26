import React, {useContext, useEffect, useState} from "react";
import ProfileView from "./ProfileView";
import {AppContext} from "../../AppContext";
import {findUser, updateEmail} from "../../api/employeeApi";

const onSave = (history, location, currentUser, setCurrentUser) => (values) => {
  return updateEmail(history, values.email).then(() => {
    currentUser.email = values.email;
    setCurrentUser(currentUser);
  });
};

const Profile = (props) => {
  const [context] = useContext(AppContext);
  const {history, location} = props;
  const tokenUser = context.currentUser;
  const [currentUser, setCurrentUser] = useState();
  const save = onSave(history, location, currentUser, setCurrentUser);

  useEffect(() => {
    findUser(history, tokenUser.username).then(user => setCurrentUser(user));
  }, [tokenUser, history]);

  return (
    <ProfileView
      currentUser={currentUser}
      onSave={save}
    />
  );
};

export default Profile;
