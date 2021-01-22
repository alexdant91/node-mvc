const MultipartFormData = include("app.core.middleware.MultipartFormData");
const Authorization = include("app.http.middleware.Authorization");
const AuthorizeFileAccess = include("app.http.middleware.AuthorizeFileAccess");
const ImageUploaderController = include("app.http.controllers.ImageUploaderController");

/**
 * Malipulate filename on upload
 * @param {object} file Passed automatically by MultipartFormData core class
 * @returns {string} Must return the manipulated filename with extenction
 */
const manipulateOriginalName = (file) => {
  const { originalname, mimetype } = file;
  const nameArray = originalname.split('.'), ext = mimetype.split('/')[1];
  nameArray.pop();
  const name = `${nameArray.join('')}-${new Date().getTime()}.${ext}`;
  return name;
}

module.exports = (Route) => [
  Route.router.get('/files/:filename', AuthorizeFileAccess.auth, ImageUploaderController.getFile),
  Route.router.post('/upload/file', Authorization.auth, MultipartFormData.uploadSingle('/public/uploads', 'file', { manipulateOriginalName }), ImageUploaderController.handleUpload),
  Route.router.delete(['/files', '/files/:filename'], Authorization.auth, ImageUploaderController.handleDelete),
]
