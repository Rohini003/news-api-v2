const announcements = require('../models/announcementModel.js');
const {uploadNewAnnouncement,getActiveAnnouncement} = require('../repositorie/announceRepo.js');
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

async function getAllAnnouncement() {
    try {
        const response = { message: "No Announcement Found", total_announcement: 0, announcement: [] }
        const announcementResponse = await getActiveAnnouncement();

        console.log(announcementResponse)

        if (announcementResponse.is_success == true) {
            response.message = 'Announcement Found';
            response.total_announcement = announcementResponse?.records?.length
            response.announcement = announcementResponse?.records
        }
        return Promise.resolve(announcementResponse);

    } catch (error) {
        console.log("error",error)
        return Promise.reject(error)
    }
}

module.exports = {uploadAnnouncement,getAllAnnouncement};
