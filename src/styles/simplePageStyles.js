import {allCommonStyles} from "./commonStyles";
import {makeStyles} from "@material-ui/core/styles";

const simplePageStyles = theme => ({
  ...allCommonStyles(theme),
  largeMessage: {
    marginTop: theme.spacing(2),
  },
  progress: {
    fontSize: 50,
    fontWeight: 900,
  },
  systemLabel: {
    color: "rgba(1, 1, 1, 1)",
    fontSize: 15,
    width: 300,
    textAlign: "left",
    marginLeft: 16,
    marginTop: 10,
  },
  gridContainer: {
    marginTop: 20,
  },
  pageSubTitle: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.dark,
    "&$preview": {
      width: theme.spacing(24),
    },
  },
  pageText: {
    marginTop: theme.spacing(2),
    marginLeft: 16,
  },
  redirectButton: {
    textAlign: "left",
    marginLeft: 4,
    "& svg": {
      marginLeft: 90,
    },
    "&$preview": {
      border: 0
    },
  },
  tableHeadCell: {
    fontSize: "0.875rem",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  tablePagination: {
    marginRight: "auto",
    fontSize: "12px",
    "&$preview": {
      height: theme.spacing(5) * 7,
    },
  },
  customTileButtonImage: {
    height: 33,
    width: 33,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 3.5,
    marginTop: 3.5,
    "&$disabled": {
      opacity: 0.3,
    },
  },
});

export const useSimplePageStyles = makeStyles(simplePageStyles, {name: "SimplePage"});
