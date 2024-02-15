const mongoose = require("mongoose");

class AnnouncementModel {
    constructor() {
        this.announceSchema = new mongoose.Schema({
            is_active: {
                type: Boolean,
                default: true
            },
            image_url: {
                type: String,
                required: true
            },
            file: {
                name: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true,
                },
                size: {
                    type: Number,
                    required: true,
                }
            },
            created_by: {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                }
            },
        });

        this.announcementModel = mongoose.model('announcements', this.announceSchema);
    }
}

module.exports = new AnnouncementModel().announcementModel;
