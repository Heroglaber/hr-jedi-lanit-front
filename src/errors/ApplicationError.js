function ApplicationError(message, details, title) {
  this.message = message;
  this.details = details;
  this.title = title;
}

ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.name = ApplicationError.name;
ApplicationError.prototype.constructor = ApplicationError;

export default ApplicationError;
