
export const validateRecursively = (validations, values) => {
  const errors = {};
  Object.keys(validations).forEach((field) => {
    const value = values[field];
    const fieldValidation = validations[field];
    if (Array.isArray(value)) {
      // value is an array -> recursing each array item
      const nestedErrors = value.map(item => validateRecursively(fieldValidation, item));
      errors[field] = nestedErrors.find(error => error) ? nestedErrors : null;
    } else if (Array.isArray(fieldValidation)) {
      // terminal validation reached -> starting actual validation
      errors[field] = fieldValidation.map(validation => validation(value, values)).find(error => error);
    } else {
      // recursing to nested validations
      errors[field] = validateRecursively(fieldValidation, value || {});
    }
  });
  Object.keys(errors).forEach(key => (errors[key] == null) && delete errors[key]);
  return Object.keys(errors).length === 0 ? null : errors;
};
