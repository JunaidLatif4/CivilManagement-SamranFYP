const localUploader = require("./localUploader")
const s3Uploader = require("./s3Uploader")



let Platform = process.env?.UPLOADER_PLATFORM || "local"
const uploadFile = (file, prevName) => {
    if (Platform == "aws_s3") {
        return s3Uploader.uploadFile
    } else {
        return localUploader.uploadFile
    }
}

const uploadArrayOfFiles = (file, prevName) => {
    if (Platform == "aws_s3") {
        return s3Uploader.uploadArrayOfFiles
    } else {
        return localUploader.uploadArrayOfFiles
    }
}

module.exports = { uploadFile, uploadArrayOfFiles }