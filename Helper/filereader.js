var http = require('http');
const path = require('path');
const fs = require('fs');


function readFileStream(fileName) {
    if (process.env.NODE_ENV && process.env.NODE_ENV == 'DEV') {
        const filePath = process.env.LOCAL_FILE_PATH;
        return new Promise((resolve, reject) => {
            var stream = fs.createReadStream(path.join(filePath, fileName));
            console.log(`File fetched successfully from local system ${fileName}`)
            resolve(stream);
        });
    } else {
        return new Promise((resolve, reject) => {
            var request = http.request(`${process.env.FILE_URL}${fileName}`, (response) => {
                if (response.statusCode == 200) {
                    console.log(`File fetched successfully from server ${fileName}`)
                    resolve(response)
                } else {
                    reject('Not able to fetch file from server');
                }
            });
            request.on('error', (err) => {
                console.log(err);
                reject(err);
            });
            request.end();
        });
    }

}

module.exports = { fileReader: readFileStream };