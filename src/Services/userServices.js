import * as resquest from "../Unitis/request";

const folderName = "user";

export const getDataUser = async (token) => {
  let response = await resquest.get(`${folderName}/get_data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getListUser = async (id, limit, per_pager, token) => {
  let response = await resquest.get(`${folderName}/list_user/${id}/${limit}/${per_pager}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

