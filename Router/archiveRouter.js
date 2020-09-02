var archiveRouter = require('express').Router();
var ArchiveClient = require('../Controller/archiveController');

archiveRouter.get('/issue/:pageNum', async(req, res, next) => {
    try {
        let archiveClient = new ArchiveClient();
        let issueData = await archiveClient.getIssueByPage(req.params['pageNum']);
        res.status(200).json(issueData);
    } catch (error) {
        next(error);
    }
});
module.exports = archiveRouter;