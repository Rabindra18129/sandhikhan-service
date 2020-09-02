var issueRouter = require('express').Router();
var IssueClient = require('../Controller/issueController');

issueRouter.get('/currentissue', async(req, res, next) => {
    var issueClient = new IssueClient();
    try {
        let currentIssue = await issueClient.getCurrentIssue();
        res.status(200).json(currentIssue);
    } catch (error) {
        next(error);
    }
});
issueRouter.get('/get/:id', async(req, res, next) => {
    let issueId = req.params['id'];
    var issueClient = new IssueClient();
    try {
        let issue = await issueClient.getIssueById(issueId);
        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
});

module.exports = issueRouter;