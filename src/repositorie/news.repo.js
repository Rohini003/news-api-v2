const { newsModel } = require('../db/models')

async function getActiveNews() {
    try {
        const response = { is_success: false, records: [] };
        const queryResponse = await newsModel.find({}).lean();
        if (queryResponse.length > 0) {
            response.is_success = true;
            response.records = queryResponse;
        }
        return Promise.resolve(response)
    } catch (err) {
        return Promise.reject(err);
    }
}

async function addNews(requestData) {
    try {
       
        const queryResponse = await newsModel.create(requestData);
        //** Difference between create() save() insertOne() */
        const response = {is_success:true}
        console.log(queryResponse)
        /*if(!isEmpty(savedNews)){
            response.is_success = true;
            const insertResult = await News.insertMany(newsArticles)
            const uploadedArticles = [];
            insertResult.forEach((insertResult) => {
                uploadedArticles.push({
                    newsId: insertResult._id,
                    heading: insertResult.heading,
                    createdBy: insertResult.created_by,
                    createdAt: insertResult.created_at,
                })
            });

        }*/
        return Promise.resolve(response)
    } catch (err){
        return Promise.reject(err);
    }
}

 async function deleteNewsById(req,response) {
    try {
        const newsId = req.params.newsId;
        const queryResponse = await newsModel.findByIdAndDelete({_id : newsId});
        const response = {is_success:true}
        console.log(queryResponse)
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateNewsById() {
    try {
        const updatedNews = await newsModel.findByIdAndUpdate(
            newsId,
            {
                $set: updateFields
            },
            { new: true } //Learn this flag
        );
        return (updatedNews)
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {getActiveNews,addNews,deleteNewsById,updateNewsById}

