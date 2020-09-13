var dbReader = require('../Helper/dbReader');
class ArchiveClient {
    constructor() {

    }
    async getIssueByPage(pageId) {
        pageId = parseInt(pageId) * 10 - 10;
        let issueArchive = {};
        let issueArchiveQuery = 'call u900846496_snadhikhan_db.getIssueByPage(?);';
        try {
            let dbResponse = await dbReader.getDBData(issueArchiveQuery, [pageId]);
            issueArchive.recordCount = await this.getRecordCount('issue');
            if (dbResponse.dbData.length >= 1) {
                issueArchive.issues = dbResponse.dbData;
                for (let i = 0; i < issueArchive.issues.length; i++) {
                    issueArchive.issues[i].articleDetails = await this.getArticleByIssueId(issueArchive.issues[i].issue_id);
                    issueArchive.issues[i].editorialDetails = await this.getEditorialByIssueId(issueArchive.issues[i].issue_id);
                }
                return issueArchive;
            } else {
                throw new Error('No record found');
            }

        } catch (error) {
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
    async getRecordCount(type) {
        let recordCountQuery = type == 'issue' ? 'call getTotalIssueCount();' : 'call getTotalWebExclusiveCount();';
        try {
            let dbResponse = await dbReader.getDBData(recordCountQuery, null);
            if (dbResponse.dbData.length >= 1) {
                return dbResponse.dbData[0];
            } else {
                throw new Error('Not able to found any records');
            }
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
    async getWebExclusiveByPage(pageId) {
        try {
            pageId = parseInt(pageId) * 10 - 10;
            let webExclusiveArchive = {};
            let webExclusiveArchiveQuery = 'call u900846496_snadhikhan_db.getWebExclusiveByPage(?);';
            let dbResponse = await dbReader.getDBData(webExclusiveArchiveQuery, [pageId]);
            webExclusiveArchive.recordCount = await this.getRecordCount('webExclusive');
            if (dbResponse.dbData.length >= 1) {
                webExclusiveArchive.webExclusives = dbResponse.dbData;
                return webExclusiveArchive;
            } else {
                throw new Error('No record Found!');
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }

    }
}

module.exports = ArchiveClient;