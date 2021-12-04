import React from "react";
import {deleteError, findError} from "../utils";
import {FormControl, Input, InputLabel} from "@material-ui/core";
import {useTaskStyles} from "../../../pages/task/taskStyles";


export const TextInput = ({
  label,
  name,
  className,
  errors,
  setErrors,
  ...otherProps
}) => {
  const classes = useTaskStyles();

  const onChange = () => {
    deleteError(errors, name) && setErrors(errors);
  };

  return (
    <FormControl variant="standard" className={classes.formInputBudget}>
      <InputLabel error={!!findError(errors, name)}>{label}</InputLabel>
      <Input
        name={name}
        error={!!findError(errors, name)}
        helperText={findError(errors, name)}
        onChange={onChange}
        {...otherProps}
      />
    </FormControl>
  );
};

