var dbReader = require('../Helper/dbReader');
var fileReaderHelper = require('../Helper/filereader');
var getDayDiff = require('../Helper/dateHelper');
class WebExclusiveClient {
    constructor(id = 0) {
        this.id = id;
        this.query = '';
        this.dayDiffCount = process.env.DAY_DIFF_WE;
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
            let weData = dbResponse.dbData;
            weData.forEach(element => {
                let dayDiff = element.publish_date ? getDayDiff(element.publish_date) : 46;
                element.isNew = this.dayDiffCount - dayDiff >= 0 ? true : false;
            });
            return weData;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = WebExclusiveClient;