class RequestCache {
    constructor(){
        this.dataLimit=0;
        this.cacheResetTimer=process.env.CACHE_RESET_TIMER||3600000;
        this.cacheData=new Map();
        this.resetCache();
    }
    addData(key,value){
        this.cacheData.set(key,value);
    }
    getData(key){
        return this.cacheData.get(key);
    }
    checkData(key){
        return this.cacheData.has(key);
    }
    resetCache(){
        setInterval(()=>{
            console.log('Clearing cache');
            this.cacheData.clear();
        },this.cacheResetTimer)

    }
    clearCahche(){
        this.cacheData.clear();
    }

}
module.exports=new RequestCache();