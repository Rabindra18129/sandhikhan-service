var dbReader = require('../Helper/dbReader');
var awsHelper = require('../Helper/awsHelper');
class EditorialClient {
    constructor(id) {
        this.editorialId = id;
    }
    async getEditorialDetails() {
        let query = 'call ad_adce71ce2869f65.getEditorialById(?)';
        try {
            let dbResponse = await dbReader.getDBData(query, [this.editorialId]);
            let fileStream = await awsHelper.getFileStream(dbResponse.dbData[0].file_name ? dbResponse.dbData[0].file_name : '');
            return fileStream;
        } catch (error) {
            console.log('Error occured while fetching editorial file details');
            throw error;

        }
    }
}

module.exports = EditorialClient;