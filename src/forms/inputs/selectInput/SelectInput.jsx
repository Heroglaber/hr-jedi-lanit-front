import React from "react";
import {deleteError, findError} from "../utils";
import {FormControl, Select, InputLabel, MenuItem} from "@material-ui/core";

export const SelectInput = ({
  label,
  name,
  setFieldValue,
  value,
  showValue,
  items,
  errors,
  setErrors,
}) => {

  const onChange = (e) => {
    deleteError(errors, name) && setErrors(errors);
    setFieldValue(name, e.target.value);
  };

  return (
    <FormControl variant="standard" error={!!findError(errors, name)}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        defaultValue = ""
        onChange={onChange}
      >
        {items.map(item => (
          <MenuItem key={showValue(item)} value={item}>
            {showValue(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

