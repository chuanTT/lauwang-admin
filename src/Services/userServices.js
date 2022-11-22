import * as resquest from '../Unitis/request';


const folderName = 'user';

export const getDataUser = async (token) => {
    let response = await resquest.post(`${folderName}/get_data`, {},token);

    return response;
}
