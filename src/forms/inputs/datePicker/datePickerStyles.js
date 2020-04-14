import {fade, makeStyles} from "@material-ui/core/styles";
import {animation} from "../../../styles/commonStyles";

const datePickerStyles = theme => ({
  ...animation(theme),
  dialog: {
    "& .MuiTypography-root": {
      margin: 0,
    },
    // *HACK* to customize picker dialog buttons
    // sadly no customization available at the moment: https://material-ui-pickers.dev/api/KeyboardDatePicker
    // using dialog inner class to patch thru
    // https://github.com/mui-org/material-ui-pickers/blob/master/lib/src/_shared/ModalDialog.tsx#L46
    "&>div:last-child button": {
      fontSize: "1rem",
      "&:not(:last-child)": {
        color: theme.palette.secondary.main,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.palette.secondary.light,
        "&:hover": {
          backgroundColor: fade(theme.palette.secondary.main, 0.08),
          borderColor: theme.palette.secondary.main,
        },
      },
      "&:last-child": {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  },
});

export const useDatePickerStyles = makeStyles(datePickerStyles, {name: "DatePicker"});

