import * as resquest from '../Unitis/request';

const folderName = 'user';

export const LoginUser = async (data) => {
    let response = await resquest.post(`${folderName}/login`, data);

    return response;
}