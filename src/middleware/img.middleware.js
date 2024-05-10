import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const fileFilter = function (req, file, cb) {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error(" Jpeg/Png  File Are Allowed"), false);
//   }
// };
const upload = multer({ storage,
  //  fileFilter
   });

export { upload };
