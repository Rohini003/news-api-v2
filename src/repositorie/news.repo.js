const { newsModel } = require('../models/news.models')

async function getActiveNews() {
    try {
        const response = { is_success: false, records: [] };
        const queryResponse = await newsModel.find({}).lean();
        //Using lean() can improve query performance.//

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
        const response = {is_success:true}
        console.log(queryResponse)

        return Promise.resolve(response)

    } catch (err){
        return Promise.reject(err);
    }
}
        ///** Difference between create() save() insertOne() */
        //save() method used to either insert a new document or update an existing document based on the presence of an _id field//
        //create() create method is used to insert a new document into mongodb collection//
        //insertone() is used to insert a single document into collection//

async function deleteNewsById(newsId) {
    try {
      return await newsModel.findOneAndDelete({ _id: newsId });
    } catch (error) {
      throw error; 
    }
  }

  async function updateNewsById(newsId, updateFields) {
    try {
        const updatedNews = await newsModel.findByIdAndUpdate(
            newsId,
            { $set: updateFields },
            { new: true }
        );

        return updatedNews;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {getActiveNews,addNews,deleteNewsById,updateNewsById}

