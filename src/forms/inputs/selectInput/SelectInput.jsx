import React from "react";
import {deleteError, findError} from "../utils";
import {FormControl, Select, InputLabel} from "@material-ui/core";

export const SelectInput = ({
  label,
  name,
  items,
  errors,
  setErrors,
}) => {

  const onChange = () => {
    deleteError(errors, name) && setErrors(errors);
  };

  return (
    <FormControl variant="standard" error={!!findError(errors, name)}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map(item => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

