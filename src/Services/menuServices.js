import * as resquest from '../Unitis/request';

const folderName = 'menu';

export const listMenu = async (limit = 0, per_pages = 1) => {
    let response = await resquest.get(`${folderName}/list_menu/${limit}/${per_pages}`)

    return response;
}

export const addMenu = async (data, token) => {
    let response = await resquest.post(`${folderName}/add_menu`, data, token)

    return response;
}

export const DeleteMenu = async (id, token) => {
    let response = await resquest.del(`${folderName}/delete_menu/${id}`, token)

    return response;
}

export const detailsMenu = async (id) => {
    let response = await resquest.get(`${folderName}/details_menu/${id}`)

    return response;
}

export const EditMenu = async (data, token) => {
    let response = await resquest.put(`${folderName}/edit_menu`, data, token)

    return response;
}