const newsModel = require ("../db/models.js")

export async function queryActiveNews(){
    try{
        const response = {is_success:false, record: [] };
        const queryResponse = await newsModel.find({}).lean();

        if(queryResponse.length>0) {
            response.is_success = true;
            response.record = queryResponse;
        }
        return Promise.resolve(response)
    } catch (err){
        return Promise.reject(err);
    }
}



