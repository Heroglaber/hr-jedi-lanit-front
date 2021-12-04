import {isString} from "../../common";

export const findError = (errors, name) => {
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

export const deleteError = (errors, name) => {
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