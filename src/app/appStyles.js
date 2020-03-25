/*pay attention to import makeStyles from /core package, makeStyles from @material-ui/styles
  doesn't have a default theme and it leads to tests failings*/
import {makeStyles} from "@material-ui/core/styles";

const appStyles = theme => ({
  body: {
    margin: 0,
    padding: 0,
  },
});

export const useAppStyles = makeStyles(appStyles, {name: "Login"});
