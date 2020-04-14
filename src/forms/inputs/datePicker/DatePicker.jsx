import React from "react";
import {DatePicker as MuiDatePicker, KeyboardDatePicker as MuiKeyboardDatePicker} from "@material-ui/pickers";
import {format as formatDate, isValid as isValidDate} from "date-fns";
import {useDatePickerStyles} from "./datePickerStyles";

const ISO_FORMAT = 'yyyy-MM-dd';
const DAY_MONTH_YEAR_FORMAT = 'dd.MM.yyyy';

export const DatePicker = ({
  label,
  name,
  setFieldValue,
  isKeyboard,
  format = DAY_MONTH_YEAR_FORMAT,
  preview,
  className,
  errors,
  setErrors,
  ...otherProps
}) => {
  const classes = useDatePickerStyles();

  const Component = isKeyboard ? MuiKeyboardDatePicker : MuiDatePicker;

  if (preview) {
    return <Component disabled className={className} InputProps={{className: classes.preview}}/>;
  }

  const placeholder = format.replace(/d/g, 'д').replace(/M/g, 'м').replace(/y/g, 'г').replace(/L/g, 'М');

  const onChange = value => {
    errors[name] && delete errors[name] && setErrors(errors);

    setFieldValue(name, isValidDate(value) ? formatDate(value, ISO_FORMAT) : null);
  };

  return (
    <Component
      label={label}
      name={name}
      format={format}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      autoOk
      okLabel='Выбрать'
      cancelLabel='Отмена'
      DialogProps={{
        classes: {
          dialogRoot: classes.dialog,
        },
      }}
      error={!!errors[name]}
      helperText={errors[name]}
      {...otherProps}
    />
  );
};
