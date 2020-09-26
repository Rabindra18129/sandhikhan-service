var dbReader = require('../Helper/dbReader');
var fileReader = require('../Helper/filereader');
class PDFArchiveController {
    constructor() {

    }
    async getTotalRecordCount() {
        let query = 'CALL getTotalPDFCount();'
        try {
            let dbResponse = await dbReader.getDBData(query, null);
            if (dbResponse.dbData.length >= 1) {
                return dbResponse.dbData[0];
            } else {
                throw new Error('Not able to found any records');
            }
        } catch (error) {
            throw error;
        }
    }
    async getPdfByPage(pageid) {

        try {
            let pageId = parseInt(pageid);
            let query = 'call getPDFByPage(?);';
            let pdfList = {};
            let dbResponse = await dbReader.getDBData(query, [pageId]);
            if (dbResponse.dbData.length >= 1) {
                pdfList.isRecordFound = true;
                pdfList.pdfsInfo = dbResponse.dbData;
            } else {
                pdfList.isRecordFound = false;

            }
            return pdfList;
        } catch (error) {
            console.log('Not able to fetch pdf list from db');
            throw error;
        }
    }
    async downloadIssue(fileName) {
        try {
            let fileStream = await fileReader.fileReader(fileName);
            return fileStream;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = PDFArchiveController;