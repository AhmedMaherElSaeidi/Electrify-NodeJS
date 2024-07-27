const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

class File {
  static uploadFile() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "public/");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + extension);
      },
    });

    return multer({ storage: storage });
  }

  static async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = File;
