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

export async function addNews() {
    try {
        const newNews = new newsModel({
            heading,
            author,
            newsContent
        })
        newNews.save();
        if(newNews.length>0){
            response.is_success = true;
        }
        return Promise.resolve(response)
    } catch (err){
        return Promise.reject = {err};
    }
}



