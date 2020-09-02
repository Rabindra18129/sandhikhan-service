var dbReader = require('../Helper/dbReader');
var awsHelper = require('../Helper/awsHelper');
var fileReaderHelper = require('../Helper/filereader');
class EditorialClient {
    constructor(id) {
        this.editorialId = id;
    }
    async getEditorialDetails() {
        let query = 'call getEditorialById(?)';
        try {
            let dbResponse = await dbReader.getDBData(query, [this.editorialId]);
            let fileStream = await fileReaderHelper.fileReader(dbResponse.dbData[0].file_name ? dbResponse.dbData[0].file_name : '');
            return fileStream;
        } catch (error) {
            console.log('Error occured while fetching editorial file details');
            throw error;

        }
    }
}

module.exports = EditorialClient;