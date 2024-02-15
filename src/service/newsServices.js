const { newsModel } = require("../models/newsModels");
const NewsRepository = require("../repositorie/newsrepo");

class NewsServices {
    constructor(){
        this.newsRepository = new NewsRepository();
    }
    
    async getAllNews() {
        try {
            const response = { message: "No News Found", total_news: 0, news: [] }
            const newsResponse = await this.newsRepository.getActiveNews();

            console.log(newsResponse)

            if (newsResponse.is_success == true) {
                response.message = 'News Found';
                response.total_news = newsResponse?.records?.length
                response.news = newsResponse?.records
            }
            return Promise.resolve(response);

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async addNewNews(requestData) {
        try {
            const response = requestData;
            const newsResponse = await this.newsRepository.addNews(requestData);

            if (newsResponse.is_success == true) {
                response.statuscode = 1;
                response.message = 'New News Added';
            }
            return Promise.resolve(response);

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async deleteNews(newsId) {
        try {
            const deletedNews = await this.newsRepository.deleteNewsById(newsId);

            if (!deletedNews) {
                throw { status: 404, msg: "News not found" };
            }

            return { status: 200, msg: "Deleted Successfully" };

        } catch (error) {
            throw error;
        }
    }

    async updateNews(newsId, updateFields) {
        try {
            // Check if there are any fields to update
            if (Object.keys(updateFields).length === 0) {
                throw new Error("No fields to update");
            }
            const updatedNews = await this.newsRepository.updateNewsById(newsId, updateFields);

            if (!updatedNews) {
                throw new Error("News not found");
            }

            return { updatedNews, msg: "Updated Successfully" };

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = NewsServices;
