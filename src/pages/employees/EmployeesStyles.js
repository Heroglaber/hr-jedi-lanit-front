import {simplePageStyles} from "../../styles/simplePageStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const employeesStyles = theme => ({
  ...simplePageStyles(theme),
  table: {
    align: "left",
    marginLeft: theme.spacing(2),
    fontSize: "0.875rem",
    "&$preview": {
      height: theme.spacing(5) * 7,
    },
  },
  employeeCard: {
    marginLeft: theme.spacing(2),
  },
  userCountLine: {
    fontSize: "small",
    color: "textSecondary",
  },
  roleName: {
    textTransform: "capitalize",
  },
});

export const useEmployeesStyles = makeStyles(employeesStyles, {name: "Employees"});