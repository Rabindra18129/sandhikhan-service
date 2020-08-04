var dbReader = require('../Helper/dbReader');


class IssueClient {
    constructor() {
        this.issue = {};

    }

    async getCurrentIssue() {
        let issueQuery = 'SELECT * FROM ad_adce71ce2869f65.current_issue';
        try {
            let dbResponse = await dbReader.getDBData(issueQuery, null);
            this.issue = dbResponse.dbData;
            this.issue.articleDetails = await this.getArticleByIssueId(this.issue.issue_id);
            this.issue.editorialDetails = await this.getEditorialByIssueId(this.issue.issue_id);
            return this.issue;
        } catch (error) {
            console.log('Erorr occured while getting current issue');
            console.log(error.message);
            throw error;
        }

    }

    async getArticleByIssueId(issueId) {
        let articleQuery = 'call ad_adce71ce2869f65.getArticleDetailsByIssueID(?)';
        try {
            let dbResponse = await dbReader.getDBData(articleQuery, [issueId]);
            return dbResponse.dbData;
        } catch (error) {
            throw error;
        }

    }

    async getEditorialByIssueId(issueId) {
        let editorialQuery = 'call ad_adce71ce2869f65.getEditorialDetailsByIssueId(?)';
        try {
            let dbResponse = await dbReader.getDBData(editorialQuery, [issueId]);
            return dbResponse.dbData;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = IssueClient;