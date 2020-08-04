var editorialRouter = require('express').Router();
var EditorialClient = require('../Controller/editorialController');

editorialRouter.get('/get/:id', async(req, res, next) => {
    let editorialId = req.params.id;
    let editorialClient = new EditorialClient(editorialId);
    try {
        let editorialFileStream = await editorialClient.getEditorialDetails();
        res.setHeader('Content-Type', 'application/json');
        editorialFileStream.pipe(res);
    } catch (error) {
        next(error);
    }
});
module.exports = editorialRouter;