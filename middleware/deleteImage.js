const path = require("path");
const fs = require("fs");

module.exports = async (filePath) => {
    const pathFile = path.join(__dirname, "../") + filePath;
    try {
        fs.unlink(pathFile, err => {
            if (err) {
                throw new Error("Image not found");
            }
        })
    }
    catch (error) {
        console.log("error path")
    }
}