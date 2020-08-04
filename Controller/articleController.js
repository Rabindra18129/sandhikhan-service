var dbReader = require('../Helper/dbReader');
var awsHelper = require('../Helper/awsHelper');

class ArticleClient {

    constructor(id) {
        this.articleId = id;
    }
    async getArticleDetails() {
        let query = 'call ad_adce71ce2869f65.getArticleById(?)';
        try {
            let dbResponse = await dbReader.getDBData(query, [this.articleId]);
            let fileStream = await awsHelper.getFileStream(dbResponse.dbData[0].file_name ? dbResponse.dbData[0].file_name : '');
            return fileStream;
        } catch (error) {
            console.log('Error occured while fetching artilce filename');
            throw error;
        }
    }

}

module.exports = ArticleClient;