const { default: mongoose } = require("mongoose");

const announceSchema = mongoose.Schema({
  
    is_active: {
        type: Boolean,
        default: true
    },
    image_url : {
        type: String,
        required: true
    },

    file : {
        name : {
            type: String,
            required: true
        },
        type : {
            type: String,
            required: true,
        },
        size : {
            type: Number,
            required: true,
        }
    },
    created_by:{
        name: {
            type: String,
        },
        email: {
            type: String,
        }
    },
    
});

const announcementModel = mongoose.model('announcements', announceSchema)
module.exports =  announcementModel; 