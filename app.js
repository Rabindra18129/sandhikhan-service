require('dotenv').config();   
var app = require('express')();
var path = require('path');
var cors = require('cors');
var cacheHandler=require('./util/requestCache');
var port = process.env.PORT || 3000;
var webExclusiveRouter = require('./Router/webExclusiveRouter');
var issueRouter = require('./Router/issueRouter');
var articleRouter = require('./Router/articleRouter');
var editorialRouter = require('./Router/editorialRouter');
var archiveRouter = require('./Router/archiveRouter');
var pdfArchiveRouter = require('./Router/pdfRouter');
process.env.SANDHIKHAN_DATA_DIR = path.join(__dirname, process.env.SANDHIKHAN_DATA_PATH);
app.use(cors());
app.use(logger);

app.use('/webexclusive', webExclusiveRouter);
app.use('/issue', issueRouter(cacheHandler));
app.use('/article', articleRouter);
app.use('/editorial', editorialRouter);
app.use('/archive', archiveRouter);
app.use('/pdfarchive', pdfArchiveRouter(cacheHandler));
//wild route handler
app.use((req, res, next) => {
    res.status(404).send('Not Found!');
});
//error handler middleware
app.use((err, req, res, next) => {
    res.status(500).send('Internal Server error occured. Failed to process request');
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

function logger(req, res, next) {
    console.log('Request came for ', req.url);
    next();
}