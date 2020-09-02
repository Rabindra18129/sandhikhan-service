var dbReader = require('../Helper/dbReader');


class IssueClient {
    constructor() {
        this.issue = {};

    }

    async getCurrentIssue() {
        let issueQuery = 'call getCurrentIssue();';
        try {
            let dbResponse = await dbReader.getDBData(issueQuery, null);
            this.issue = dbResponse.dbData[0];

            this.issue.articleDetails = await this.getArticleByIssueId(this.issue.issue_id);
            this.issue.editorialDetails = await this.getEditorialByIssueId(this.issue.issue_id);
            return this.issue;
        } catch (error) {
            console.log('Erorr occured while getting current issue');
            console.log(error.message);
            throw error;
        }

    }

    async getIssueById(issueId) {
        let issueQuery = 'call getIssueById(?);';
        try {
            let dbResponse = await dbReader.getDBData(issueQuery, [issueId]);
            if (dbResponse.dbData.length >= 1) {
                this.issue = dbResponse.dbData[0];
                this.issue.articleDetails = await this.getArticleByIssueId(this.issue.issue_id);
                this.issue.editorialDetails = await this.getEditorialByIssueId(this.issue.issue_id);
                return this.issue;
            } else {
                throw new Error('Issue not found');
            }
            return dbResponse;

        } catch (error) {
            console.log('Error Occured while fetching issue');
            console.log(error.message);
            throw error;
        }
    }

    async getArticleByIssueId(issueId) {
        let articleQuery = 'call getArticleDetailsByIssueID(?)';
        try {
            let dbResponse = await dbReader.getDBData(articleQuery, [issueId]);
            return dbResponse.dbData;
        } catch (error) {
            throw error;
        }

    }

    async getEditorialByIssueId(issueId) {
        let editorialQuery = 'call getEditorialDetailsByIssueId(?)';
        try {
            let dbResponse = await dbReader.getDBData(editorialQuery, [issueId]);
            return dbResponse.dbData;
        } catch (error) {
            throw error;
        }

    }
}

module.exports = IssueClient;