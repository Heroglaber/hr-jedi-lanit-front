import {fade} from "@material-ui/core/styles/colorManipulator";

export const animation = theme => ({
  preview: {
    animationName: "preview",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationTimingFunction: theme.transitions.easing.easeInOut,
    backgroundColor: theme.palette.grey["300"],
    color: theme.palette.grey["300"],
    borderRadius: 5,
  },
  highlight: {
    animationName: "highlight",
    animationDuration: "2s",
  },
  "@global": {
    "@keyframes preview": {
      "0%": {
        backgroundColor: theme.palette.grey["100"],
        color: theme.palette.grey["100"],
      },
      "50%": {
        backgroundColor: theme.palette.grey["300"],
        color: theme.palette.grey["300"],
      },
      "100%": {
        backgroundColor: theme.palette.grey["100"],
        color: theme.palette.grey["100"],
      },
    },
    "@keyframes highlight": {
      from: {
        backgroundColor: theme.palette.primary.light,
      },
      to: {
        backgroundColor: theme.palette.common.white,
      },
    },
  },
  labelPreview: {
    extend: "preview",
    width: 150,
    height: theme.typography.body1.lineHeight,
    display: "inline-block",
    verticalAlign: "text-bottom",
  },
  disabled: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

export const page = theme => ({
  pageTitle: {
    marginLeft: -2,
    marginBottom: theme.spacing(4),
    fontSize: "2.8125rem",
  },
  pageSubTitle: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.dark,
  },
  actionsGridContainer: {
    margin: "16px 0px 0px 6px",
    display: "inline-block",
  },
});

export const cardGrid = theme => ({
  card: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&$preview": {
      background: theme.palette.background.paper,
      animation: "none",
    },
  },
});

export const form = theme => ({
  formEditableTitleRoot: {
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
  },
  formEditableTitleInput: {
    extend: theme.typography.h3,
    padding: 0,
  },
  formInput: {
    width: 300,
  },
  formInputSum: {
    width: 175,
  },
  formInputSwitch: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.palette.grey["300"],
    borderRadius: 5,
  },
  formInputDate: {
    width: 160,
  },
  formGeneralError: {
    extend: theme.typography.body2,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.contrastText,
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
});

export const misc = theme => ({
  flatDangerousButton: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.light,
    borderStyle: "solid",
    borderWidth: 1,
    "&:hover": {
      backgroundColor: fade(theme.palette.error.main, 0.08),
      borderColor: theme.palette.error.main,
      // Reset on touch devices, it doesn"t add specificity
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&[disabled]": {
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabled,
    },
  },
});

export const allCommonStyles = theme => ({
  ...animation(theme),
  ...page(theme),
  ...cardGrid(theme),
  ...form(theme),
  ...misc(theme),
});
