const {getActiveNews,addNews,deleteNewsById,updateNewsById} = require('../repositorie/news.repo.js')

 async function getAllNews(){
    try{
        const response = {message:"No News Found", total_news:0, news:[]}
        const newsResponse = await getActiveNews();

        console.log(newsResponse    )

        if(newsResponse.is_success == true){
            response.message = 'News Found';
            response.total_news = newsResponse?.records?.length
            response.news = newsResponse?.records
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}

 async function addNewNews(requestData){
    try{
        const response = requestData;
        const newsResponse = await addNews(requestData);

        if (newsResponse.is_success == true) {
            response.statuscode = 1;
            response.message = 'New News Added';
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}

 async function deleteNews(req, response){
    try{
        const newsId = req?.params?.newsId;
        const newsResponse = await deleteNewsById(newsId)
        if(newsResponse.is_success == true){
            response.statusCode = 1;
            response.message = 'Success'
            response.data = {
                newsId: newsId,
                message: " News deleted successfully."
            }
            response.status(200).send(response);
        }
        else{
            response.message = 'Not Found'
            response.status(200).send(response);
            }
            return Promise.resolve(response);
    } catch(error){
        return Promise.reject(error)
    }

}

 async function updateNews(req,res,next){
    try{
        const newsId = req.params.newsId;
        const { heading, author, newsContent } = req.body;
        const newsResponse = await updateNewsById
        const updateFields = {};
        if (heading) {
            updateFields.heading = heading;
        }
    
        if (author) {
            updateFields.author = author;
        }
    
        if (newsContent) {
            updateFields.newsContent = newsContent;
        }

    } catch(error){
        return Promise.reject(error)
    }

}

module.exports = {getAllNews,addNewNews,deleteNews,updateNews}