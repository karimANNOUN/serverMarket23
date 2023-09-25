var cloudinary = require('cloudinary').v2;
var CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage;
cloudinary.config({
    cloud_name: "".concat(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: "".concat(process.env.CLOUDINARY_KEY),
    api_secret: "".concat(process.env.CLOUDINARY_SECRET)
});
var storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'yelp-camp',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});
module.exports = {
    cloudinary: cloudinary,
    storage: storage
};
//# sourceMappingURL=Cloudinary.js.map