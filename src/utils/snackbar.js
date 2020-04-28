import React, {useMemo} from "react";
import {useSnackbar as useSnackBarNotistack} from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const ActionClose = ({id}) => {
  const {closeSnackbar} = useSnackBarNotistack();
  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      <CloseIcon/>
    </IconButton>
  );
};

const actionClose = key => <ActionClose id={key}/>;

export const snackbarProviderProps = {
  autoHideDuration: 6000,
  action: actionClose,
  anchorOrigin: { horizontal: "right", vertical: "bottom" },
};

export const useSnackbar = () => {
  const {enqueueSnackbar} = useSnackBarNotistack();

  const showSuccess = useMemo(() => (message, options = {}) => enqueueSnackbar(message, {...options, variant: "success"}), [enqueueSnackbar]);

  const showInfo = useMemo(() => (message, options = {}) => enqueueSnackbar(message, {...options, variant: "info"}), [enqueueSnackbar]);

  const showWarning = useMemo(() => (message, options = {}) => enqueueSnackbar(message, {...options, variant: "warning"}), [enqueueSnackbar]);

  const showError = useMemo(() => (message, options = {}) => enqueueSnackbar(message, {...options, variant: "error"}), [enqueueSnackbar]);

  return {
    showSuccess,
    showInfo,
    showWarning,
    showError,
  }
};
