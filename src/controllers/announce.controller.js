const {uploadAnnouncement,getAllAnnouncement,deleteAnnouncement,updateAnnouncement} = require("../service/announceService");

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

async function fetchAll(req, res) {
    try {
        console.log("announcement")
        const announcement = await getAllAnnouncement();
        res.status(200).json({ announcement });

    } catch (error) {
        console.log("error", error)
        res.status(500).json(error);
    }
}

async function Delete(req, res) {
    const announcementId = req?.params?.announcementId;

    try {
        const result = await deleteAnnouncement(announcementId);
        res.status(result.status).json({ msg: result.msg });

    } catch (error) {
        console.log(error, error)
        res.status(error.status || 500).json({ msg: error.msg || "Internal Server Error" });
    }
}

const update = async (req, res) => {
    try {
        
            const updateResult = await updateAnnouncement(req.params.id, req.body);

            if (updateResult) {
                res.status(200).json({
                    statusCode: 1,
                    message: 'Success',
                    data: updateResult
                });
            }
        }
    catch (err) {
        res.status(500).json({error:err.message});
    }
}

module.exports = {create,fetchAll,Delete,update};





