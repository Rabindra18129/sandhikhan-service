var dbReader = require('../Helper/dbReader');
var awsHelper = require('../Helper/awsHelper');
var fileReaderHelper = require('../Helper/filereader');

class ArticleClient {

    constructor(id) {
        this.articleId = id;
    }
    async getArticleDetails() {
        let query = 'call getArticleById(?)';
        try {
            let dbResponse = await dbReader.getDBData(query, [this.articleId]);
            let fileStream = await fileReaderHelper.fileReader(dbResponse.dbData[0].file_name ? dbResponse.dbData[0].file_name : '');
            return fileStream;
        } catch (error) {
            console.log('Error occured while fetching artilce filename');
            throw error;
        }
    }

}

module.exports = ArticleClient;