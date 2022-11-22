import * as resquest from '../Unitis/request';

const folderName = 'table';

export const TableListBook = async (limit, per_pages, token) => {
    let response = await resquest.get(`${folderName}/list_table_peding/${limit}/${per_pages}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return response;
}

export const DeleteOrder = async (id, token) => {
  let response = await resquest.del(`${folderName}/cancel_order/${id}`, token)

  return response;
}