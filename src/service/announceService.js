const announcements = require('../models/announcementModel.js');
const uploadNewAnnouncement = require('../repositorie/announceRepo.js');
const fs = require('fs');

const uploadAnnouncement = async (widgetId, imageId, fileDetails, embeddedUrl,userInfo) => {
    try {
        // if (!fileDetails || fileDetails.length === 0) {
        //     throw new Error("No file details provided");
        // }

        const file = fileDetails; // Assuming only one file is uploaded
        console.log(file.path)
        const buffer = fs.readFileSync(file.path).toString('base64');

        const announcementRecord = {
            is_active: true,
            name: file.name,
            image_url: "", 
            redirect_url: embeddedUrl,
            file: {
                name: fileDetails.name,
                type: fileDetails.type,
                buffer: (fs.readFileSync(fileDetails?.path)).toString('base64'),
            
            },
            created_by: {
                name: userInfo.username,
                email: userInfo.email,
            },
            // updated_by: {
            //     name: userInfo.username,
            //     email: userInfo.email
            // }
        };

        return await uploadNewAnnouncement(announcementRecord);
    } catch (error) {
        console.log("error", error);
        throw error; // Rethrow the error to propagate it up
    }
};

module.exports = uploadAnnouncement;
