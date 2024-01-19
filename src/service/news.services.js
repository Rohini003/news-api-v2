import { response } from 'express';

const {getActiveNews,addNews} = require('../repositorie/news.repo.js');

export async function getAllNews(){
    try{
        const response = {message:"No News Found", total_news:0, news:[]}
        const newsResponse = await getActiveNews();

        if(newsResponse.is_success == true){
            response.message = 'News Found';
            response.total_news = newsResponse.records.length
            response.news = newsResponse.records
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}

export async function addNewNews(requestData){
    try{
        const response = {heading , author, newsContent } = requestData;
        const newsResponse = await addNews();

        if (newsResponse.is_success == true) {
            response.message = 'New News Added';
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}