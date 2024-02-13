const announcementModel = require("../models/announcementModel");

const uploadNewAnnouncement = async (announcementRecord) => {
    try {
        return await announcementModel.create(announcementRecord); 
    } catch (error) {
        throw new Error("Error saving announcement: " + error.message);
    }
};

async function getActiveAnnouncement() {
    try {
        const response = { is_success: false, records: [] };
        const queryResponse = await announcementModel.find({}).lean();
        //Using lean() can improve query performance.//

        if (queryResponse.length > 0) {
            response.is_success = true;
            response.records = queryResponse;
        }

        return Promise.resolve(response)

    } catch (err) {
        console.log("err",err)
        return Promise.reject(err);
    }
}

async function deleteAnnouncementById(announcementId) {
    try {
      return await announcementModel.findOneAndDelete({ _id: announcementId });
    } catch (error) {
      throw error; 
    }
  }

  async function updateAnnouncementById(announcementId, data) {
    try {
        return await announcementModel.findByIdAndUpdate(announcementId,data);
 
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {uploadNewAnnouncement,getActiveAnnouncement,deleteAnnouncementById,updateAnnouncementById};




