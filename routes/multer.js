const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

// uploads folder nahi hai to khud bana do (git khali folder save nahi karta)
const uploadDir = path.join(__dirname, "..", "public", "images", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fn =
      crypto.randomBytes(16).toString("hex") + path.extname(file.originalname);
    cb(null, fn);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
