import {makeStyles} from "@material-ui/core/styles";

export const processInfoStyles = theme => ({
  processInfo: {
    marginLeft: theme.spacing(2),
  },
});

export const useProcessInfoStyles = makeStyles(processInfoStyles, {name: "ProcessInfo"});
