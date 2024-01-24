const { newsModel } = require("../db/models");
const { getAllNews, addNewNews, updateNews, deleteNews } = require("../service/news.services");

async function fetchAll(req, res) {
    try {
        const news = await getAllNews();

        res.status(200).json({ news });

    } catch (error) {
        console.log("error", error)
        res.status(500).json(error);
    }
}

async function create(req, res) {
    try {

        const requestBody = req?.body || {}
        const news = await addNewNews(requestBody);

        res.status(201).json({ news });

    } catch (error) {
        console.log("error", error)
        res.status(501).json(error);
    }
}

async function Delete(req, res) {
    const newsId = req?.params?.newsId;

    try {
        const result = await deleteNews(newsId);
        res.status(result.status).json({ msg: result.msg });

    } catch (error) {
        console.log(error, error)
        res.status(error.status || 500).json({ msg: error.msg || "Internal Server Error" });
    }
}

async function update(req, res) {
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
        const result = await updateNews(newsId, updateFields);

        res.status(200).json(result);

    } catch (error) {
        const msg = error.message;
        res.status(500).json({ msg });
    }
}


module.exports = { fetchAll, create, update, Delete }