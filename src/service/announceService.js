const announcements = require('../models/announcementModel.js');
const uploadNewAnnouncement = require('../repositorie/announceRepo.js');
const fs = require('fs');

const uploadAnnouncement = async (fileDetails,username,email) => {
    try {
        const buffer = fs.readFileSync(fileDetails.path).toString('base64');
        const fileArray = fileDetails.filename.split(".");
        const fileType =  fileArray[1].trim();
        const announcementRecord = {
            is_active: true,
            image_url: fileDetails.path, 
            file: {
                name: fileDetails.filename,
                type: fileType,
                size: fileDetails.size,               
                buffer: (fs.readFileSync(fileDetails?.path)).toString('base64'),           
            },
            created_by: {
                name:username,
                email: email,
            },
            updated_by: {
                name: username,
                email: email
            }
        };

        return await uploadNewAnnouncement(announcementRecord);
    } catch (error) {
        console.log("error", error);
        throw error; 
    }
};

module.exports = uploadAnnouncement;