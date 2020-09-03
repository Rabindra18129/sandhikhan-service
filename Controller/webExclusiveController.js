var dbReader = require('../Helper/dbReader');
var fileReaderHelper = require('../Helper/filereader');
class WebExclusiveClient {
    constructor(id = 0) {
        this.id = id;
        this.query = '';
    }

    async getWebExclusiveData() {
        try {
            this.query = 'call sp_getWebExclusiveById(?)';
            let dbResponse = await dbReader.getDBData(this.query, [this.id]);
            let fileStream = await fileReaderHelper.fileReader(dbResponse.dbData[0].filename ? dbResponse.dbData[0].filename : '');
            return fileStream;
        } catch (error) {
            throw error;
        }
    }

    async getAllWebExclusiveData() {
        try {
            this.query = 'call sp_getAllWebexclusive()';
            let dbResponse = await dbReader.getDBData(this.query, null);
            return dbResponse.dbData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WebExclusiveClient;