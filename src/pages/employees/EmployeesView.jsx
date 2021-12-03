import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, Typography } from "@material-ui/core";
import { useEmployeesStyles } from "./EmployeesStyles";
import EmployeesTable from "./EmployeesTable";
import EmployeesByRole from "./EmployeesByRole";

const EmployeesView = (props) => {
  const classes = useEmployeesStyles();
  const {usersWithRoles, userCountByRoles} = props;
  return (
    <div>
      <Helmet title="Список сотрудников" />
      <Card>
        <CardContent>
          <Typography variant="h3" className={classes.pageTitle}>Список сотрудников</Typography>
          <EmployeesByRole userCountByRoles={userCountByRoles}/>
          <EmployeesTable employees={usersWithRoles}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeesView;