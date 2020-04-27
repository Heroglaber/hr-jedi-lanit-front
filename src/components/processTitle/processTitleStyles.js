import {animation, page} from "../../styles/commonStyles";
import {makeStyles} from "@material-ui/core/styles";

export const processTitleStyles = theme => ({
  ...page(theme),
  ...animation(theme),
  processTitle: {
    marginBottom: theme.spacing(2),
  },
  processTitleKey: {
    fontSize: "70%",
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    verticalAlign: "middle",
    fontWeight: 300,
    textDecoration: "none",
    "a&": {
      color: theme.typography.h3.color,
      backgroundColor: theme.palette.primary.light,
    },
    "span&": {
      color: theme.typography.h3.color,
      backgroundColor: theme.palette.grey["300"],
    },
  },
  processTitleStatus: {
    backgroundColor: theme.palette.grey["300"],
    fontSize: "35%",
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    verticalAlign: "super",
    fontWeight: 400,
  },
});

export const useProcessTitleStyles = makeStyles(processTitleStyles, {name: "ProcessTitle"});
