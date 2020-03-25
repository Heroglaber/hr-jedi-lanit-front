function ServerValidationError(violations) {
  this.message = "Server validation error(s)";
  this.violations = violations;
}

ServerValidationError.prototype = Object.create(Error.prototype);
ServerValidationError.prototype.name = ServerValidationError.name;
ServerValidationError.prototype.constructor = ServerValidationError;

export default ServerValidationError;
