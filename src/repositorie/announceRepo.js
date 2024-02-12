const announcementModel = require("../models/announcementModel");

const uploadNewAnnouncement = async (announcementRecord) => {
    try {
        return await announcementModel.create(announcementRecord); 
    } catch (error) {
        throw new Error("Error saving announcement: " + error.message);
    }
};

module.exports = uploadNewAnnouncement;




