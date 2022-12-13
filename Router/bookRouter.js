const bookRouter=require('express').Router();
const BookClient=require('../Controller/bookController');

function intialize(cacheHandler){
    bookRouter.get('/all',async (req,res,next)=>{
        var bookClient=new BookClient();
        if (cacheHandler.checkData(req.url)) {
            let bookList=cacheHandler.getData(req.url);
            res.status(200).json(bookList);
        } else {
            try {
                let bookList=await bookClient.getAllBooks();
                res.status(200).json(bookList?.dbData);
                if(bookList?.dbData.length>0)
                cacheHandler.addData(req.url,bookList?.dbData);
            } catch (error) {
                next(error);
            }
            
        }
    });
    bookRouter.get('/details/:id',async (req,res,next)=>{
        var bookClient=new BookClient();
        let bookID= +req.params['id'];
        if (cacheHandler.checkData(req.url)) {
            let bookDetails=cacheHandler.getData(req.url);
            res.status(200).json(bookDetails);
        } else {
            try {
                let bookDetails=await bookClient.getBookDetails(bookID);
                res.status(200).json(bookDetails?.dbData);
                if(bookDetails?.dbData.length>0)
                cacheHandler.addData(req.url,bookDetails?.dbData);
            } catch (error) {
                next(error);
            }
            
        }
    
    });
    bookRouter.post('/chapter',require('body-parser').json(), async (req,res,next)=>{
        var bookClient=new BookClient();
        let {chapterFilename}=req.body;
       try {
        let chapterFileStream=await bookClient.getChapter(chapterFilename);
        res.setHeader('Content-Type', 'application/json');
        chapterFileStream.pipe(res);
       } catch (error) {
        next(error);
       }
    
    });
    bookRouter.use((req,res,next)=>{
        res.status(404).send('Not Found!');
    });
    return bookRouter;
    
}


module.exports=intialize;