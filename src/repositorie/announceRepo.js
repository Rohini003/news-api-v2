const announcementModel = require("../models/announcementModel");

const uploadNewAnnouncement = async (announcementRecord) => {
    try {
       

        return await announcementModel.create(announcementRecord); 
    } catch (error) {
        throw new Error("Error saving announcement: " + error.message);
    }
};

module.exports = uploadNewAnnouncement;


// async function uploadNewAnnounce(requestData) {
//     try {
//         const queryResponse = await announcements.create(requestData);
//         const response = {is_success:true}
//         console.log(queryResponse)   

//         return Promise.resolve(response)
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }



