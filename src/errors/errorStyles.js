import {simplePageStyles} from "../styles/simplePageStyles";
import {makeStyles} from "@material-ui/core/styles";

const errorStyles = theme => ({
  ...simplePageStyles(theme),
  errorNavHome: {
    textDecoration: "none",
    alignSelf: "flex-start",
    marginTop: theme.spacing(8),
    "& *": {
      textDecoration: "none",
    },
  },
  errorDetails: {
    marginTop: theme.spacing(4),
    "& pre": {
      wordBreak: "break-a ll",
      whiteSpace: "pre-wrap",
    },
  },
  errorDetailsSummary: {
    backgroundColor: theme.palette.secondary.light,
  },
});

export const useErrorStyles = makeStyles(errorStyles, {name: "Error"});
