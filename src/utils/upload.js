const cloudinary = require("../config/cloudinary");

exports.uploadToCloudinary = (fileBuffer) => {
   return new Promise((resolve, reject) => {
      cloudinary.uploader
         .upload_stream(
            {
               folder: "comics",
               resource_type: "image",
            },
            (error, result) => {
               if (error) return reject(error);
               resolve(result.secure_url);
            },
         )
         .end(fileBuffer);
   });
};
