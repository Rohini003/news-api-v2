const AnnouncementService = require("../service/announceService");

class AnnounceController {
    constructor() {
        this.announcementService = new AnnouncementService();
        this.create = this.create.bind(this);
        this.fetchAll = this.fetchAll.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req, res, next) {
        try {
            const fileDetails = req.file; 
            const { username, email } = req.body;
            console.log(fileDetails);
            const result = await this.announcementService.uploadAnnouncement(fileDetails, username, email);

            res.status(200).json({
                statusCode: 1,
                message: "Image Uploaded",
            });
        } catch (error) {
            console.error("Error:", error);
            res.status(501).json({ error: error.message });
        }
    }
    
    async fetchAll(req, res) {
        try {
            console.log("announcement");
            const announcement = await this.announcementService.getAllAnnouncement();
            res.status(200).json({ announcement });
        } catch (error) {
            console.log("error", error);
            res.status(500).json(error);
        }
    }
    
    async delete(req, res) {
        const announcementId = req?.params?.id;
    
        try {
            const result = await this.announcementService.deleteAnnouncement(announcementId);
            res.status(result.status).json({ msg: result.msg });
        } catch (error) {
            console.log(error, error);
            res.status(error.status || 500).json({ msg: error.msg || "Internal Server Error" });
        }
    }
    
    async update(req, res) {
        try {
            const updateResult = await this.announcementService.updateAnnouncement(req.params.id, req.body);
    
            if (updateResult) {
                res.status(200).json({
                    statusCode: 1,
                    message: 'Success',
                    data: updateResult
                });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = AnnounceController;
