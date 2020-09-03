// var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./awsConfig.js');
// var s3 = new AWS.S3({ apiVersion: process.env.API_VERSION });


// function getFileStream(fileName) {
//     return new Promise((resolve, reject) => {
//         let params = { Bucket: process.env.BUCKET_NAME, Key: fileName };
//         s3.headObject(params, (err, data) => {
//             if (err) {
//                 console.log('Error occured while fetching aws file data');
//                 reject(err);
//             } else {
//                 let fileStream = s3.getObject(params).createReadStream();
//                 resolve(fileStream);
//             }
//         });
//     });

// }
// module.exports = { getFileStream: getFileStream };