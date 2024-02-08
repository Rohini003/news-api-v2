const uploadAnnouncement = require("../service/announceService");

const create = async (req, res, next) => {
    try {
        const { widgetId, imageId } = req.body;
        const fileDetails = req.file; // Assuming files are uploaded using Multer middleware
        console.log(fileDetails)
        const embeddedUrl = req.body.embedded_url; 

        // if (!fileDetails || !fileDetails.length) {
        //     throw new Error("No file details provided");
        // }

        const result = await uploadAnnouncement(widgetId, imageId, fileDetails, embeddedUrl);

        res.status(200).json({
            statusCode: 1,
            message: "File Uploaded",
            data: {
                imageId: result.image_id,
                widgetId: result.widget_id,
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(501).json({ error: error.message });
    }
};

module.exports = create;



// async function create(req, res) {
//     try {

//         const requestBody = req?.body || {}
//         const news = await uploadAnnouncement(requestBody);

//         res.status(201).json({ news });

//     } catch (error) {
//         console.log("error", error)
//         res.status(501).json(error);
//     }
// }



