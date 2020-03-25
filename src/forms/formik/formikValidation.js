import {validateRecursively} from "../formsCommon";

export const validate = validations => (values) => {
  const errors = validateRecursively(validations, values);
  return errors || {};
};

