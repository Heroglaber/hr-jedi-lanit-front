/* eslint-disable react/jsx-filename-extension */
import "react-app-polyfill/ie9";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {StylesProvider, ThemeProvider} from "@material-ui/styles";
import {create} from "jss";
import preset from "jss-preset-default";
import App from "./app/App";
import theme from "./styles/theme";
import {SnackbarProvider} from "notistack";
import * as serviceWorker from "./serviceWorker";
import {snackbarProviderProps} from "./utils/snackbar";
import {AppContextProvider} from "./AppContext";

const jss = create(preset());

const Root = (
  <BrowserRouter basename="/">
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider {...snackbarProviderProps}>
          <AppContextProvider>
            <App/>
          </AppContextProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  </BrowserRouter>
);

ReactDOM.render(Root, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
