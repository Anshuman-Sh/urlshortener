const path = require("path");

exports.fileUpload = async (req, res, next) => {
  try {
    if (req.files) {
      const filename = `${Date.now()}-${req.files.file.name}`;
      const type = req.files.file.mimetype.split("/")[0];
      const newPath = path.join(process.cwd(), `public/uploads/${type}`, filename);

      await req.files.file.mv(newPath);
      req.filename = `/uploads/${type}/${filename}`
    }

    next();
  } catch (error) {
    next(error);
  }
};
