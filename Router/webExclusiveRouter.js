var webExclusiveRouter = require('express').Router();
var WebExclusiveClient = require('../Controller/webExclusiveController');
webExclusiveRouter.get('/get/all', async(req, res, next) => {
    try {
        let webExclusiveClient = new WebExclusiveClient();
        let allWebExclusiveData = await webExclusiveClient.getAllWebExclusiveData();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allWebExclusiveData);
    } catch (error) {
        console.log('Not able to get WebExclusive data');
        next(error);
    }
});
webExclusiveRouter.get('/get/:id', async(req, res, next) => {
    try {
        let documentId = req.params.id;
        let webExclusiveClient = new WebExclusiveClient(documentId);
        let webExclusiveDataStream = await webExclusiveClient.getWebExclusiveData();
        res.setHeader('Content-Type', 'application/json');
        webExclusiveDataStream.pipe(res);
    } catch (error) {
        console.log('Not able to get WebExclusive data');
        next(error);
    }

});

module.exports = webExclusiveRouter;