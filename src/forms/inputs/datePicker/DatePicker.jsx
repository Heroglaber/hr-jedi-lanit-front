import React from "react";
import {DatePicker as MuiDatePicker, KeyboardDatePicker as MuiKeyboardDatePicker} from "@material-ui/pickers";
import {format as formatDate, isValid as isValidDate} from "date-fns";
import {useDatePickerStyles} from "./datePickerStyles";
import {isString} from "../../../common";

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
    deleteError(errors, name) && setErrors(errors);

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
      error={!!findError(errors, name)}
      helperText={findError(errors, name)}
      {...otherProps}
    />
  );
};

const findError = (errors, name) => {
  if (!isString(name) || name.length === 0 || !errors) {
    return null;
  }

  const nameParts = name.split(".");
  let foundError = errors;
  for (let namePart of nameParts) {
    foundError = foundError[namePart];
    if (!foundError) {
      return null;
    }
  }

  return isString(foundError) ? foundError : null;
};

const deleteError = (errors, name) => {
  if (!findError(errors, name)) {
    return;
  }

  const nameParts = name.split(".");
  let errorContainer = errors;

  nameParts.forEach((namePart, partIndex) => {
    if(partIndex === nameParts.length - 1){
      delete errorContainer[namePart];
      return;
    }
    errorContainer = errorContainer[namePart];
  });
};
