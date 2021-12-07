const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
    dest: path.resolve(__dirname,'..','..','public/imgs'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,'..','..','public/imgs'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) =>{
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename)
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    filter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if(allowedMimes.includes(files.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invalid file type"));
        }
    }
};