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
        const deletedNews = await newsModel.findOneAndDelete({_id : newsId});
        
        if (!deletedNews) {
            return res.status(404).json({
                msg: "News not found"
            });
        }
        
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

async function updateNews(req, res) {
    const newsId = req.params.newsId;
    const { heading, author, newsContent } = req.body;

    try {
        const updatedNews = await newsModel.findByIdAndUpdate(
            newsId,
            {
                $set: {
                    heading,
                    author,
                    newsContent
                }
            },
            { new: true }
        );

        if (!updatedNews) {
            return res.status(404).json({
                msg: "News not found"
            });
        }

        res.status(200).json({
            updatedNews,
            msg: "Updated Successfully"
        });
    } catch (error) {
        const msg = error.message;
        res.status(500).json({
            msg
        });
    }
}

module.exports = {addNews,getAllNews,updateNews,deleteNews}