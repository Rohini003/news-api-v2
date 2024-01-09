const {newsModel}= require("../db/models");

async function getAllNews(req,res)
{
    try {
        const news = await newsModel.find({});
        res.status(200).json({news});
    } catch (error) {
        const msg = error.message
        res.status(500).json({
            msg
        })
    }

}

async function addNews(req,res)
{
    const {heading , author, newsContent } = req.body;  
    try {
        const newNews = new newsModel({
            heading,
            author,
            newsContent
        })
        newNews.save();
        res.status(201).json({newNews});
    } catch (error) {
        const msg = error.message
        res.status(500).json({
            msg
        })
}}

async function deleteNews(req,res)
{
    const newsId = req.params.newsId;
    try {
        await newsModel.findOneAndDelete({_id : newsId});
        res.status(200).json({
            msg :"Deleted Succesfully"
        })
    } catch (error) {
        const msg = error.message
        res.status(500).json({
            msg
        })
    }
}

async function updateNews()
{
    
}

module.exports = {addNews,getAllNews,updateNews,deleteNews}