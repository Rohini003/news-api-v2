const AnnounceRepo = require('../repositorie/announceRepo');
const fs = require('fs');

class AnnouncementService {
    constructor() {
        this.announceRepo = new AnnounceRepo();
    }

    async uploadAnnouncement(fileDetails, username, email) {
        try {
            const buffer = fs.readFileSync(fileDetails.path).toString('base64');
            const fileArray = fileDetails.filename.split(".");
            const fileType = fileArray[1].trim();
            const announcementRecord = {
                is_active: true,
                image_url: fileDetails.path,
                file: {
                    name: fileDetails.filename,
                    type: fileType,
                    size: fileDetails.size,
                    buffer: buffer,
                },
                created_by: {
                    name: username,
                    email: email,
                },
                updated_by: {
                    name: username,
                    email: email
                }
            };

            return await this.announceRepo.uploadNewAnnouncement(announcementRecord);
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    async getAllAnnouncement() {
        try {
            const response = { message: "No Announcement Found", total_announcement: 0, announcement: [] };
            const announcementResponse = await this.announceRepo.getActiveAnnouncement();

            console.log(announcementResponse);

            if (announcementResponse.is_success == true) {
                response.message = 'Announcement Found';
                response.total_announcement = announcementResponse?.records?.length;
                response.announcement = announcementResponse?.records;
            }
            return response;
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    async deleteAnnouncement(announcementId) {
        try {
            const deletedAnnouncement = await this.announceRepo.deleteAnnouncementById(announcementId);

            if (!deletedAnnouncement) {
                throw { status: 404, msg: "announcement not found" };
            }

            return { status: 200, msg: "Deleted Successfully" };
        } catch (error) {
            throw error;
        }
    }

    async updateAnnouncement(announcementId, data) {
        try {
            const updateResult = await this.announceRepo.updateAnnouncementById(announcementId, data);
            return updateResult;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AnnouncementService;
