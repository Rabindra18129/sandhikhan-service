var dbReader = require('../Helper/dbReader');
var fileReaderHelper = require('../Helper/filereader');
class BookClient{
    constructor(){

    }
    async getAllBooks(){
        let dbQuery='call getBookList();';
        try {
            let dbResponse=await dbReader.getDBData(dbQuery,null);
            return dbResponse;
        } catch (error) {
            console.log('Error occured while fetching data for all books',error);
            throw error;
        }
    }
    async getBookDetails(id){
        let dbQuery='call getBookDetails(?);';
        try {
            let dbResponse=await dbReader.getDBData(dbQuery,id);
            return dbResponse;
        } catch (error) {
            console.log('Error occured while fetching data for all books',error);
            throw error;
        }
    }
    async getChapter(fileName){
        try {
            console.log(fileName);
            let fileStream = await fileReaderHelper.fileReader(fileName);
            return fileStream;
        } catch (error) {
            console.log('Error occured while fetching chapter file',error);
            throw error;
        }

    }
}

module.exports=BookClient;