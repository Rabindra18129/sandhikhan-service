var pdfArchiveRouter = require('express').Router();
var PDFArchiveClient = require('../Controller/pdfController');

pdfArchiveRouter.get('/totalcount', async(req, res, next) => {

    try {
        let pdfArchiveClient = new PDFArchiveClient();
        let roecordCount = await pdfArchiveClient.getTotalRecordCount();
        res.status(200).json(roecordCount);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});
pdfArchiveRouter.get('/pdflist/:pagenum', async(req, res, next) => {

    try {
        let pdfArchiveClient = new PDFArchiveClient();
        let pdfList = await pdfArchiveClient.getPdfByPage(req.params['pagenum']);
        res.status(200).json(pdfList);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});
pdfArchiveRouter.get('/download/pdfissue/:filename', async(req, res, next) => {
    try {
        let pdfArchiveClient = new PDFArchiveClient();
        let fileData = await pdfArchiveClient.downloadIssue(req.params['filename']);
        res.setHeader('Content-disposition', `attachment; filename=${req.params['filename']}`);
        res.setHeader('Content-type', 'application/pdf');
        fileData.pipe(res);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = pdfArchiveRouter;