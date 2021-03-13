class HTTPException {
  static ERROR_400_BAD_REQUEST = "The server cannot or will not process the request due to an apparent client error.";
  static ERROR_401_UNAUTHORIZED = "Authentication is required and is failed or is not yet been provided.";
  static ERROR_402_PAYMENT_REQUIRED = "Daily limit on requests was exceeded.";
  static ERROR_403_FORBIDDEN = "The request contained valid data and was understood by the server, but the server is refusing action.";
  static ERROR_404_NOT_FOUND = "Resource not found.";
  static ERROR_405_METHOD_NOT_ALLOWED = "This request method is not supported for the requested resource.";
  static ERROR_415_UNSUPPORTED_FILE_TYPE = "The request entity has a file type which the server or resource does not support.";
  static ERROR_422_UNPROCESSABLE_ENTITY = "The request was well-formed but was unable to be followed due to semantic errors.";
}

module.exports = HTTPException;
