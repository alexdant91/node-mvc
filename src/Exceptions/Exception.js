const HTTPException = include("core.exceptions.HTTPException");

class Exception {
  constructor(res) {
    this.res = res;
  }

  static ERROR_400 = HTTPException.ERROR_400_BAD_REQUEST;
  static ERROR_401 = HTTPException.ERROR_401_UNAUTHORIZED;
  static ERROR_402 = HTTPException.ERROR_402_PAYMENT_REQUIRED;
  static ERROR_403 = HTTPException.ERROR_403_FORBIDDEN;
  static ERROR_404 = HTTPException.ERROR_404_NOT_FOUND;
  static ERROR_405 = HTTPException.ERROR_405_METHOD_NOT_ALLOWED;
  static ERROR_415 = HTTPException.ERROR_415_UNSUPPORTED_FILE_TYPE;
  static ERROR_422 = HTTPException.ERROR_422_UNPROCESSABLE_ENTITY;

  send = (code) => {
    if (typeof code !== "number" || !Exception[`ERROR_${code}`]) {
      throw new Error(`Error code ${code} not supported yet.`);
    }

    return this.res.status(code).json({ error: Exception[`ERROR_${code}`] });
  }
}

module.exports = Exception;
