import * as resquest from '../Unitis/request';

const folderName = 'news';


export const listNews = async (limit = 0, per_pages = 1, type = 0) => {
    let response = await resquest.get(`${folderName}/list_news/${type}/${limit}/${per_pages}`)

    return response;
}

export const detailsNews = async (id_news) => {
    let response = await resquest.get(`${folderName}/detals_news.php`, {
        params: {
            id_news
        }
    })

    return response;
}

export const DeleteNews = async (id, token) => {
    let response = await resquest.del(`${folderName}/delete_news/${id}`, token)

    return response;
}
