const uploadAnnouncement = require("../service/announceService");

const create = async (req, res, next) => {
    try {
        const fileDetails = req.file; 
        const {username,email} = req.body;
        console.log(fileDetails)
        const result = await uploadAnnouncement( fileDetails,username,email);

        res.status(200).json({
            statusCode: 1,
            message: "Image Uploaded",
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(501).json({ error: error.message });
    }
};

module.exports = create;





