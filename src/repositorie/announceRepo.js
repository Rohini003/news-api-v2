const AnnouncementModel = require("../models/announcementModel");

class AnnounceRepo {
    async uploadNewAnnouncement(announcementRecord) {
        try {
            return await AnnouncementModel.create(announcementRecord);
        } catch (error) {
            throw new Error("Error saving announcement: " + error.message);
        }
    }

    async getActiveAnnouncement() {
        try {
            const response = { is_success: false, records: [] };
            const queryResponse = await AnnouncementModel.find({}).lean();

            if (queryResponse.length > 0) {
                response.is_success = true;
                response.records = queryResponse;
            }

            return response;
        } catch (err) {
            console.log("err", err);
            throw err;
        }
    }

    async deleteAnnouncementById(announcementId) {
        try {
            return await AnnouncementModel.findOneAndDelete({ _id: announcementId });
        } catch (error) {
            throw error;
        }
    }

    async updateAnnouncementById(announcementId, data) {
        try {
            return await AnnouncementModel.findByIdAndUpdate(announcementId, data);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AnnounceRepo;
