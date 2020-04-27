import {makeStyles} from "@material-ui/core/styles";
import {animation, page, form} from "../../styles/commonStyles";

export const taskStyles = theme => ({
  ...page(theme),
  ...animation(theme),
  ...form(theme),
  processCard: {
    position: "relative",
  },

  processInfo: {
    marginLeft: theme.spacing(2),
  },
  stubText: {
    backgroundColor: "lightgoldenrodyellow",
    padding: theme.spacing(1),
    width: "fit-content",
  },
  selectAction: {
    width: "fit-content",
    marginLeft: 1,
  },
  actionContent: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  actionButtons: {
    marginTop: theme.spacing(4),
  },
});

export const useTaskStyles = makeStyles(taskStyles, {name: "Task"});


