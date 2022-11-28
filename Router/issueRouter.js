var issueRouter = require('express').Router();
var IssueClient = require('../Controller/issueController');
function issueMiddleware(cacheHandler){
    issueRouter.get('/currentissue', async(req, res, next) => {
        var issueClient = new IssueClient();
        try {
            if(cacheHandler.checkData(req.url)){
                let currentIssue=cacheHandler.getData(req.url);
                res.status(200).json(currentIssue);
            }
            else{
                let currentIssue = await issueClient.getCurrentIssue();
                res.status(200).json(currentIssue);
                cacheHandler.addData(req.url,currentIssue);
            }
            
        } catch (error) {
            next(error);
        }
    });
    issueRouter.get('/get/:id', async(req, res, next) => {
        let issueId = req.params['id'];
        var issueClient = new IssueClient();
        try {
            if(cacheHandler.checkData(req.url)){
                let issue=cacheHandler.getData(req.url);
                res.status(200).json(issue);
                console.log('Respnose returned from cache');
            }
            else{
                let issue = await issueClient.getIssueById(issueId);
                res.status(200).json(issue);
                cacheHandler.addData(req.url,issue);
            }
           
        } catch (error) {
            next(error);
        }
    });
    return issueRouter;
}



module.exports = issueMiddleware;