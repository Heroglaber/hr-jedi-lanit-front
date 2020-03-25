import {createMuiTheme} from "@material-ui/core/styles";

const toolbarHeight = 48;

export default createMuiTheme({
  palette: {
    primary: {
      light: "#FFF099",
      main: "#ffe22e",
      dark: "#E6BB00",
    },
    secondary: {
      light: "#90A4AE",
      main: "#607D8B",
      dark: "#455A64",
      contrastText: "#fff",
    },
    highlight: {
      main: "lightyellow",
    },
    type: "light",
  },
  mixins: {
    toolbar: {
      minHeight: toolbarHeight,
    },
  },
  typography: {
    h3: {
      fontWeight: 100,
      color: "rgba(0, 0, 0, 0.54)",
    },
    h4: {
      fontWeight: 300,
      color: "rgba(0, 0, 0, 0.54)",
    },
    h6: {
      fontWeight: 300,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        margin: "0 10px 0 0",
        fontWeight: 300,
      },
      sizeLarge: {
        fontSize: "1.3125rem",
      },
    },
    MuiTypography: {
      root: {
        margin: "0 10px 0 0",
      },
    },
    MuiToolbar: {
      root: {
        "@media (min-width: 600px)": {
          minHeight: toolbarHeight,
        },
      },
    },
    MuiInput: {
      root: {
        fontSize: "1.2rem",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 10,
      },
    },
    MuiCardHeader: {
      root: {
        borderRadius: "10px 10px 0 0",
      },
    },
    MuiCardContent: {
      root: {
        display: "flex",
        flexDirection: "column",
        "@media (min-width: 600px)": {
          padding: "16px 24px",
        },
      },
    },
    MuiSnackbarContent: {
      message: {
        fontSize: "1.2rem",
      },
    },
    MuiDrawer: {
      root: {
        height: "100vh",
      },
    },
    MuiSlider: {
      root: {
        verticalAlign: "bottom",
        transform: "translateY(12px)",
      },
    },
  },
});
