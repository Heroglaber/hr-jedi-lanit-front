import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const harnessStyles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.colorPrimary,
    boxShadow: "none",
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 6,
    marginRight: 12,
  },
  homeLink: {
    display: "flex",
    textDecoration: "none",
    color: "inherit",
  },
  appLogo: {
    width: 40,
    height: 40,
  },
  appTitle: {
    paddingLeft: 10,
    color: theme.palette.secondary.dark,
    fontWeight: 300,
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 52,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  collapseToolbarItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    minHeight: theme.mixins.toolbar.minHeight,
  },
  toolbarItem: {
    maxHeight: 52,
    paddingLeft: 12,
    "& svg": {
      width: 28,
      height: 28,
    },
    "& img": {
      width: 24,
      height: 24,
      margin: "0px 14px 0px 2px",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.mixins.toolbar.minHeight,
    paddingTop: (theme.spacing(3)),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    overflowY: "auto",
  },
  accountButton: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingRight: 10,
    "& button": {
      width: 48,
      height: 48,
      padding: 0,
    },
    "& svg": {
      extend: "appLogo",
    },
  },
  activeLink: {
    backgroundColor: "white",
    color: "slategray",
  },
  menuLink: {
    textDecoration: "none",
    color: "inherit",
  },
});

export const useHarnessStyles = makeStyles(harnessStyles, {name: "Harness"});
