import * as resquest from '../Unitis/request';

const folderName = 'shared';

export const searchResultNews = async (limit = 0, per_pages = 1, q) => {
    let response = await resquest.get(`${folderName}/search_news.php`, {
        params: {
            q,
            limit,
            per_pages
        }
    })

    return response;
}