const { getActiveNews, addNews, deleteNewsById, updateNewsById } = require('../repositorie/news.repo.js')
const { newsModel } = require('../db/models')

async function getAllNews() {
    try {
        const response = { message: "No News Found", total_news: 0, news: [] }
        const newsResponse = await getActiveNews();

        console.log(newsResponse)

        if (newsResponse.is_success == true) {
            response.message = 'News Found';
            response.total_news = newsResponse?.records?.length
            response.news = newsResponse?.records
        }
        return Promise.resolve(response);

    } catch (error) {
        return Promise.reject(error)
    }
}

async function addNewNews(requestData) {
    try {
        const response = requestData;
        const newsResponse = await addNews(requestData);

        if (newsResponse.is_success == true) {
            response.statuscode = 1;
            response.message = 'New News Added';
        }
        return Promise.resolve(response);

    } catch (error) {
        return Promise.reject(error)
    }
}


async function deleteNews(newsId) {
  try {
    const deletedNews = await deleteNewsById(newsId);
    if (!deletedNews) {
      throw { status: 404, msg: "News not found" };
    }

    return { status: 200, msg: "Deleted Successfully" };
  } catch (error) {
    throw error;
  }
}



// async function deleteNews(req, res) {
//     const newsId = req?.params?.newsId;
//     try {

//         const deletedNews = await newsModel.findOneAndDelete({_id : newsId});
//         if (!deletedNews) {
//                        return res.status(404).json({
//                            msg: "News not found"
//                          });
//                  }
                    
//                      res.status(200).json({
//                          msg :"Deleted Succesfully"
//                     })

//         // if (newsResponse?.is_success == true) {
//         //     res.statusCode = 1;
//         //     res.message = 'Success'
//         //     res.data = {
//         //         newsId: newsId,
//         //         message: " News deleted successfully."
//         //     }

//         //     res.status(200).send(response);

//         // } else {
//         //     res.message = 'Not Found'
//         //     res.status(200).send(response);
//         // }
//         return Promise.resolve(response);
        
//     } catch (error) {
//         return Promise.reject(error)
//     }

// }

async function updateNews(req, res, next) {
    // const newsId = req.params.newsId;
    try {
     
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

    } catch (error) {
        return Promise.reject(error)
    }

}

module.exports = { getAllNews, addNewNews, updateNews,deleteNews }