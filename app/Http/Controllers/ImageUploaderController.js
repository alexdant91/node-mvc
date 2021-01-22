const fs = require('fs');
const path = require('path');

class ImageUploaderController {

  static getStaticPath = (filename) => {
    return path.join(__dirname, '../../../public/uploads', filename)
  }

  handleUpload = async (req, res) => {
    const { filename } = req.file;
    const url = `${process.env.APP_URL}:${process.env.APP_PORT}/public/uploads/${filename}`;

    return res.status(201).json({ message: "File successfully uploaded.", filename, url });
  }

  handleDelete = async (req, res) => {
    const filename = req.body.filename || req.params.filename || false;
    if (!filename) {
      return res.status(422).json({ error: "You must specify filename." });
    }
    const pathname = ImageUploaderController.getStaticPath(filename);
    if (fs.existsSync(pathname)) {
      fs.unlinkSync(pathname);
      return res.status(200).json({ message: "File successfully deleted." });
    }

    return res.status(404).json({ error: "File not found." });
  }

  getFile = (req, res) => {
    const filename = req.params.filename;

    return res.status(200).sendFile(ImageUploaderController.getStaticPath(filename));
  }

}

module.exports = new ImageUploaderController();
