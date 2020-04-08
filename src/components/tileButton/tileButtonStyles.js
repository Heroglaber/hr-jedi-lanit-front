import {makeStyles} from "@material-ui/core/styles";

const tileButtonStyles = theme => ({
  button: {
    width: 120,
    backgroundColor: "white",
    verticalAlign: "top",
    align: "left",
    textAlign: "center",
    padding: [8, 8],
    display: "inline-block",
    margin: [0, 10],
    fontSize: "0.875rem",
  },
  label: {
    fontSize: 13,
    flexDirection: "column",
    verticalAlign: "top",
    textAlign: "center",
    backgroundColor: theme.colorPrimary,
    margin: 0,
  },
  icon: {
    height: 40,
    width: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
export const useTileButtonStyles = makeStyles(tileButtonStyles, {name: "TileButton"});
