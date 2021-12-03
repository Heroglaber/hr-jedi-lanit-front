import React from "react";
import EmployeesView from "./EmployeesView";
import { useEffect } from "react";
import * as employeeApi from "../../api/employeeApi";
import { useState } from "react";
import {useSnackbar} from "../../utils/snackbar";

const loadUsers = (setUsers, history, showError) => {
  employeeApi.getEmployeeWithRole(history)
    .then(users => setUsers(users))
    .catch(() => showError("Ошибка при попытке загрузки списка пользователей"));
};

const loadUsersCountByRoles = (setUsersCountByRoles, history, showError) => {
  employeeApi.getEmployeeCountByRole(history)
    .then(usersCount => setUsersCountByRoles(usersCount))
    .catch(() => showError("Ошибка при попытке загрузки количества пользователей"));
}

const Employees = (history) => {
  const [users, setUsers] = useState([]);
  const [usersCountByRoles, setUsersCountByRoles] = useState([]);
  const {showError} = useSnackbar();

  useEffect(() => {
    loadUsers(setUsers, history, showError);
  }, [setUsers, history, showError]);

  useEffect(() => {
    loadUsersCountByRoles(setUsersCountByRoles, history, showError);
  }, [setUsersCountByRoles, history, showError]);

  return (
    <EmployeesView usersWithRoles={users} userCountByRoles={usersCountByRoles}/>
  );
};

export default Employees;
