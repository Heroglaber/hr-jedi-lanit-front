import {useSimplePageStyles} from "../styles/simplePageStyles";

export default theme => ({
  ...useSimplePageStyles(),
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
