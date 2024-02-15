const mongoose = require("mongoose");

class NewsModel {
    constructor() {
        this.userSchema = new mongoose.Schema({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        this.newsSchema = new mongoose.Schema({
            heading: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            newsContent: {
                type: String,
                required: true,
            }
        });

        this.News = mongoose.model("News", this.newsSchema);
        this.User = mongoose.model("User", this.userSchema);
    }
}

module.exports = new NewsModel();
