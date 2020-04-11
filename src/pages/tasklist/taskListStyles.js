import {simplePageStyles} from "../../styles/simplePageStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const taskListStyles = theme => ({
  ...simplePageStyles(theme),
  taskListCard: {
    overflow: "auto",
  },
  table: {
    align: "left",
    marginLeft: theme.spacing(2),
    fontSize: "0.875rem",
    "&$preview": {
      height: theme.spacing(5) * 7,
    },
  },
  tableCell: {
    width: "33%",
  },
  tableIShortCell: {
    width: "16%",
  },
});

export const useTaskListStyles = makeStyles(taskListStyles, {name: "TaskList"});
