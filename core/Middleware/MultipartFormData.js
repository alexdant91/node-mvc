const multer = require('multer');
const { type } = require('os');
const path = require('path');

/**
 * @param {string} pathname Is already relative to root folder
 */

class MultipartFormData {

  static uploadDirectory = (pathname, options = { manipulateOriginalName: null, maxFileSize: null, types: null }) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, pathname);
      },
      filename: function (req, file, cb) {
        const filename = options.manipulateOriginalName != null && typeof options.manipulateOriginalName === "function" ? options.manipulateOriginalName(file) : file.originalname;
        cb(null, filename);
      },
      limits: {
        fileSize: options.maxFileSize != null && options.maxFileSize != undefined && typeof options.maxFileSize != null === "number" ? options.maxFileSize : (1024 * 1024)
      },
      onFileUploadStart: function (file) {
        if (typeof options.types === null || typeof options.types === undefined) return true; // Accept all files
        if (typeof options.types === "string") { // E.g. 'image/png'
          if (file.mimetype == options.types) return true;
          else return false;
        }
        if (Array.isArray(options.types)) { // E.g. ['image/png', 'image/jpg', 'image/jpeg']
          if (options.types.indexOf(file.mimetype) !== -1) return true;
          else return false;
        }
        return true;
      }
    })
    return multer({ storage: storage });
  }

  static uploadSingle = (pathname, fieldname, options = { manipulateOriginalName: null, maxFileSize: null, types: null }) => {
    if (!options.manipulateOriginalName) options.manipulateOriginalName = null;
    if (!options.maxFileSize) options.maxFileSize = null;
    if (!options.types) options.types = null;

    if (!pathname) {
      throw new Error("Path name is required.");
    }

    if (options.manipulateOriginalName != null && typeof options.manipulateOriginalName !== "function") {
      throw new Error("Parameter `manipulateOriginalName` must be a function passing the file specs object and it must return the manipulated file name: `manipulateOriginalName(file)`");
    }
    if (options.maxFileSize !== null && typeof options.maxFileSize !== "number") {
      throw new Error("Parameter `maxFileSize` must be a number with max file size in bytes");
    }
    if (options.types !== null && (typeof options.types !== "string" || !Array.isArray(options.types))) {
      throw new Error("Parameter `types` must be a string `'image/png'` or an array of strings `['image/png', 'image/jpg', 'image/jpeg']`");
    }

    if (!fieldname) fieldname = "file";

    pathname = path.join(__dirname, '../../', pathname);

    return MultipartFormData.uploadDirectory(pathname, { ...options }).single(fieldname);
  }

  static uploadMultiple = (pathname, fieldname, maxCount = 10, options = { manipulateOriginalName: null, maxFileSize: null, types: null }) => {
    if (!options.manipulateOriginalName) options.manipulateOriginalName = null;
    if (!options.maxFileSize) options.maxFileSize = null;
    if (!options.types) options.types = null;

    if (!pathname) {
      throw new Error("Path name is required.");
    }

    if (options.manipulateOriginalName != null && typeof options.manipulateOriginalName !== "function") {
      throw new Error("Parameter `manipulateOriginalName` must be a function passing the file specs object and it must return the manipulated file name: `manipulateOriginalName(file)`");
    }
    if (options.maxFileSize !== null && typeof options.maxFileSize !== "number") {
      throw new Error("Parameter `maxFileSize` must be a number with max file size in bytes");
    }
    if (options.types !== null && (typeof options.types !== "string" || !Array.isArray(options.types))) {
      throw new Error("Parameter `types` must be a string `'image/png'` or an array of strings `['image/png', 'image/jpg', 'image/jpeg']`");
    }

    if (!fieldname) fieldname = "file";

    pathname = path.join(__dirname, '../../', pathname);

    return MultipartFormData.uploadDirectory(pathname, { ...options }).array(fieldname, maxCount);
  }

  static uploadFields = (pathname, fields = [{ name: "", maxCount: 0 }], options = { manipulateOriginalName: null, maxFileSize: null, types: null }) => {
    if (!options.manipulateOriginalName) options.manipulateOriginalName = null;
    if (!options.maxFileSize) options.maxFileSize = null;
    if (!options.types) options.types = null;

    if (!pathname) {
      throw new Error("Path name is required.");
    }

    if (options.manipulateOriginalName != null && typeof options.manipulateOriginalName !== "function") {
      throw new Error("Parameter `manipulateOriginalName` must be a function passing the file specs object and it must return the manipulated file name: `manipulateOriginalName(file)`");
    }
    if (options.maxFileSize !== null && typeof options.maxFileSize !== "number") {
      throw new Error("Parameter `maxFileSize` must be a number with max file size in bytes");
    }
    if (options.types !== null && (typeof options.types !== "string" || !Array.isArray(options.types))) {
      throw new Error("Parameter `types` must be a string `'image/png'` or an array of strings `['image/png', 'image/jpg', 'image/jpeg']`");
    }

    if (fields[0].name == "" && fields[0].maxCount == 0) {
      throw new Error("Fields is required. It must be an array of objects formatted like `{ name: \"name\", maxCount: 10 }`.");
    }

    pathname = path.join(__dirname, '../../', pathname);

    return MultipartFormData.uploadDirectory(pathname, { ...options }).fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
  }

  static getMultipartBody = () => {
    return multer().none();
  }
}

module.exports = MultipartFormData;
