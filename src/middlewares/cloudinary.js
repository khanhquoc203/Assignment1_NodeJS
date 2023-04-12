// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// export const uploadMulter = (req, res, next) => {
//     cloudinary.config({
//         cloud_name: "dplklfwqn",
//         api_key: "416656287396364",
//         api_secret: "C5-QNqKYECy8Eh3LZRwII5wtGsE",
//     });

//     const storage = new CloudinaryStorage({
//         cloudinary: cloudinary,
//         params: {
//             folder: "we17309",
//             format: "png",
//             public_id: "some_unique_id",
//         },
//     });

//     const upload = multer({ storage: storage });
//     req.files = upload.array("images", 10);
//     next();
// };
