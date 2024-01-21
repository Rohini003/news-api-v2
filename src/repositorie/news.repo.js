import { response } from "express";

const newsModel = require("../db/models.js")

export async function getActiveNews() {
    try {
        const response = { is_success: false, record: [] };
        const queryResponse = await newsModel.find({}).lean();

        if (queryResponse.length > 0) {
            response.is_success = true;
            response.record = queryResponse;
        }
        return Promise.resolve(response)
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function addNews(heading, author, newsContent) {
    try {
        const newNews = new newsModel({
            heading,
            author,
            newsContent
        });
        const savedNews = await newNews.save();
        if(!isEmpty(newsModel)){
            response.is_success = true;
            const insertResult = await news.insertMany(newsArticles)
            const uploadedArticles = [];
            insertResult.forEach((insertResult) => {
                uploadedArticles.push({
                    newsId: insertResult._id,
                    heading: insertResult.heading,
                    createdBy: insertResult.created_by,
                    createdAt: insertResult.created_at,
                })
            });

        }
        return Promise.resolve(response)
    } catch (err){
        return Promise.reject = {err};
    }
}

export async function deleteNewsById() {
    try {
        
        if (!isEmpty(newsId)) {
            const deleteNews = await news.findByIdAndDelete(newsId);
        }
        return Promise.resolve(response)
    } catch (err) {
        return Promise.reject(err);
    }
}


