var dbReader = require('../Helper/dbReader');
var getDayDiff = require('../Helper/dateHelper');
class ArchiveClient {
    constructor() {
        this.dayDiffCount = process.env.DAY_DIFF;
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
                    const dayDiff = issueArchive.issues[i].issue_date ? getDayDiff(issueArchive.issues[i].issue_date) : 121;
                    issueArchive.issues[i].isNew = this.dayDiffCount - dayDiff >= 0 ? true : false;
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
            pageId = parseInt(pageId);
            let webExclusiveArchive = {};
            let webExclusiveArchiveQuery = 'call u900846496_snadhikhan_db.getWebExclusiveByPage(?);';
            let dbResponse = await dbReader.getDBData(webExclusiveArchiveQuery, [pageId]);
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