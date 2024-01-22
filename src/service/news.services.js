const {getActiveNews,addNews,deleteNewsById} = require('../repositorie/news.repo.js');

 async function getAllNews(){
    try{
        const response = {message:"No News Found", total_news:0, news:[]}
        const newsResponse = await getActiveNews();

        if(newsResponse.is_success == true){
            response.message = 'News Found';
            response.total_news = newsResponse.records.length
            response.news = newsResponse.records
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}

 async function addNewNews(requestData){
    try{
        const response = {heading , author, newsContent } = requestData;
        const newsResponse = await addNews();

        if (newsResponse.is_success == true) {
            response.statuscode = 1;
            response.message = 'New News Added';
        }
        return Promise.resolve(response);

    } catch(error){
        return Promise.reject(error)
    }
}

 async function deleteNews(req,response,next){
    try{
        const newsId = req.params.newsId;
        const newsResponse = await deleteNewsById
        if(newsResponse.is_success == true){
            response.body.statusCode = 1;
            response.body.message = 'Success'
            response.body.data = {
                newsId: newsId,
                message: " News deleted successfully."
            }
            response.status(200).send(response.body);
        }
            else{
                response.body.message = 'Not Found'
                response.status(200).send(response.body);
            }
            return next();
    } catch(error){
        return Promise.reject(error)
    }

}

 async function updateNews(req,res,next){
    try{

    } catch(error){
        return Promise.reject(error)
    }

}

module.exports = {getAllNews,addNewNews,deleteNews,updateNews}