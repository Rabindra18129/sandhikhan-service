var http = require('http');

function readFileStream(fileName) {
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

module.exports = { fileReader: readFileStream };