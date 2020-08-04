var articleRouter = require('express').Router();
var ArticleClient = require('../Controller/articleController');
articleRouter.get('/get/:id', async(req, res, next) => {
    let articleId = req.params.id;
    let articleClient = new ArticleClient(articleId);
    try {
        let articleFileStream = await articleClient.getArticleDetails();
        res.setHeader('Content-Type', 'application/json');
        articleFileStream.pipe(res);
    } catch (error) {
        next(error);
    }
});


module.exports = articleRouter;