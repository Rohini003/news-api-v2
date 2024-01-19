const {newsModel}= require("../db/models");

async function fetchAll(req,res)
{
    try {
        const news = await getAllNews();
        res.status(200).json({news});
    } catch (error) {
        res.status(500).json(error);
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

    // Create an object to store the fields to be updated
    const updateFields = {};

    // Check which fields are provided in the request body and add them to the updateFields object
    if (heading) {
        updateFields.heading = heading;
    }

    if (author) {
        updateFields.author = author;
    }

    if (newsContent) {
        updateFields.newsContent = newsContent;
    }

    try {
        // Check if there are any fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                msg: "No fields to update"
            });
        }

        // Use $set to update only the specified fields
        const updatedNews = await newsModel.findByIdAndUpdate(
            newsId,
            {
                $set: updateFields
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

module.exports = {addNews,fetchAll,updateNews,deleteNews}