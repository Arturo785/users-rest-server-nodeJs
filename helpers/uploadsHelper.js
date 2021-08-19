const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFileHelper = (files, validExtensions = [
    'jpg',
    'png',
    'jpeg',
    'gif',
], folder = '') => {
    return new Promise((resolve, reject) => {

        const { myFile } = files; // is called like that in the postman body
        const shortNameFile = myFile.name.split('.');

        const extension = shortNameFile[shortNameFile.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`No valid files selected, only this files are allowed ${validExtensions}`);
        }


        const tempFile = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempFile);

        myFile.mv(uploadPath, (err) => { // move file
            if (err) {
                return reject(err);
            }

            resolve(tempFile);
        });

    });

}



module.exports = {
    uploadFileHelper,
}