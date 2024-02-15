const { newsModel, News } = require("../models/newsModels");

class NewsRepository {
    async getActiveNews() {
        try {
            const response = { is_success: false, records: [] };
            const queryResponse = await News.find({}).lean();
            //Using lean() can improve query performance.//

            if (queryResponse.length > 0) {
                response.is_success = true;
                response.records = queryResponse;
            }

            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async addNews(requestData) {
        try {
            const queryResponse = await News.create(requestData);
            const response = { is_success: true };
            console.log(queryResponse);

            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async deleteNewsById(newsId) {
        try {
            return await News.findOneAndDelete({ _id: newsId });
        } catch (error) {
            throw error;
        }
    }

    async updateNewsById(newsId, updateFields) {
        try {
            const updatedNews = await News.findByIdAndUpdate(
                newsId,
                { $set: updateFields },
                { new: true }
            );

            return updatedNews;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = NewsRepository;
