const { newsModel } = require("../models/newsModels");
const newsServices = require("../service/newsServices");

class newsController {
    constructor() {
        this.newsServices = new newsServices();
        this.create = this.create.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }
    async fetchAll(req, res,next) {
        try {
            const news = await this.newsServices.getAllNews();
            res.status(200).json({ news });
        } catch (error) {
            console.log("error", error);
            res.status(500).json(error);
        }
    }
    async create(req, res) {
        try {
            const requestBody = req?.body || {};
            const news = await this.newsServices.addNewNews(requestBody);
            res.status(201).json({ news });
        } catch (error) {
            console.log("error", error);
            res.status(500).json(error);
        }
    }
    async delete(req, res) { // Changed from Delete to delete
        const newsId = req?.params?.newsId;
        try {
            const result = await this.newsServices.deleteNews(newsId);
            res.status(result.status).json({ msg: result.msg });
        } catch (error) {
            console.log(error, error);
            res.status(error.status || 500).json({ msg: error.msg || "Internal Server Error" });
        }
    }
    async update(req, res) {
        const newsId = req.params.newsId;
        const { heading, author, newsContent } = req.body;
        const updateFields = {};
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
            const result = await this.newsServices.updateNews(newsId, updateFields);
            res.status(200).json(result);
        } catch (error) {
            const msg = error.message;
            res.status(500).json({ msg });
        }
    }
}

module.exports = newsController;
