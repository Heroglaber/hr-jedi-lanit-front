import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppVersionLabel from "./AppVersionLabel";
import {useSimplePageStyles} from "../../styles/simplePageStyles";
import * as employeeApi from "../../api/employeeApi";
import {useSnackbar} from "../../utils/snackbar";
import {Link} from '@material-ui/core';

const SystemInfo = ({preview = false, appVersion, history}) => {
  const [users, setUsers] = useState([]);
  const {showError} = useSnackbar();
  useEffect(() => {
    loadAllUsers(setUsers, history, showError);
  }, [setUsers, history, showError]);

  const classes = useSimplePageStyles();
  return (
    <div>
      <Helmet title="Система - HR Jedi"/>
      <Card>
        <CardContent>
          <Typography className={classes.pageTitle} variant="h3">Система HR Jedi</Typography>
          <AppVersionLabel appVersion={appVersion || "В разработке"} label="Версия" delimiter className={classes.systemLabel} preview={preview}/>
          <Link href="http://localhost:8888/app/">
            <Typography variant="subtitle1" className={classes.pageText}>Панель администратора</Typography>
          </Link>
          <Link href="http://localhost:8888/h2-console/">
            <Typography variant="subtitle1" className={classes.pageText}>Консоль базы данных</Typography>
          </Link>
          <Typography variant="h5" className={classes.pageSubTitle}>
            Пользователи
          </Typography>
          {users.map(
            user => <Typography key={user.login} variant="subtitle1" className={classes.pageText}>Логин: {user.login}, Email: {user.email}</Typography>)}
        </CardContent>
      </Card>
    </div>);
};

const loadAllUsers = (setUsers, history, showError) => {
  employeeApi.getAllUsers(history)
    .then(users => setUsers(users))
    .catch(() => showError("Ошибка при попытке загрузки списка пользователей"));
};

export default SystemInfo;
