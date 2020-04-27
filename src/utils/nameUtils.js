
export const getLastNameWithInitialsFromFullName = employeeFullName => {
  return employeeFullName.split(" ")
    .map((fullNamePart, index) => index === 0 ? fullNamePart + " " : fullNamePart[0] + ".")
    .join("");
};
