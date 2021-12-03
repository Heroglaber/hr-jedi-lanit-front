import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { useEmployeesStyles } from "./EmployeesStyles";
import Person from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import { Settings } from "@material-ui/icons";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const RoleIcon = (props) => {
  const {keySelector} = props;
  switch (keySelector) {
    case "ROLE_ADMIN":
      return <Settings fontSize="large"/>
    case "ROLE_USER":
      return <PeopleIcon fontSize="large"/>
    case "ROLE_HR":
      return <Person fontSize="large"/>
    case "ROLE_OMNI":
      return <VerifiedUserIcon fontSize="large"/>
    default:
      return <PermIdentityIcon fontSize="large"/>
  }
}

const EmployeesByRole = (props) => {
  const classes = useEmployeesStyles();
  const {userCountByRoles} = props;

  return (
    <Grid container>
      {Object.keys(userCountByRoles).map( element => (
        <Grid item md={3}>
          <Card className={classes.employeeCard}>
            <CardContent>
              <Grid container>
                <Grid item md={11}>
                  <Typography
                    variant="h6"
                    className={classes.roleName}
                  >
                    {element.replace("ROLE_","").toLowerCase()}
                  </Typography>
                  <Typography
                    className={classes.userCountLine}
                    color="secondary"
                  >
                    Пользователей: {userCountByRoles[element]}
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  <RoleIcon keySelector={String(element)}/>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EmployeesByRole;