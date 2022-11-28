var pdfArchiveRouter = require('express').Router();
var PDFArchiveClient = require('../Controller/pdfController');


function pdfMiddleware(cacheHandler){
    pdfArchiveRouter.get('/totalcount', async(req, res, next) => {

        try {
            if (cacheHandler.checkData(req.url)) {
                let roecordCount = cacheHandler.getData(req.url);
                res.status(200).json(roecordCount);
            } else {
                let pdfArchiveClient = new PDFArchiveClient();
                let roecordCount = await pdfArchiveClient.getTotalRecordCount();
                res.status(200).json(roecordCount);
                cacheHandler.addData(req.url,roecordCount);
            }
           
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    });
    pdfArchiveRouter.get('/pdflist/:pagenum', async(req, res, next) => {
    
        try {
            if (cacheHandler.checkData(req.url)) {
                let pdfList =cacheHandler.getData(req.url);
                res.status(200).json(pdfList);
            } else {
                let pdfArchiveClient = new PDFArchiveClient();
                let pdfList = await pdfArchiveClient.getPdfByPage(req.params['pagenum']);
                res.status(200).json(pdfList);
                cacheHandler.addData(req.url,pdfList);
            }
           
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    });
    pdfArchiveRouter.get('/view/pdfissue/:filename', async(req, res, next) => {
        try {
            let pdfArchiveClient = new PDFArchiveClient();
            let fileData = await pdfArchiveClient.downloadIssue(req.params['filename']);
            res.setHeader('Content-type', 'application/pdf');
            fileData.pipe(res);
        } catch (error) {
            console.log(error);
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
    return pdfArchiveRouter;
}


module.exports = pdfMiddleware;