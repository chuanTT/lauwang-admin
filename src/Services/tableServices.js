import * as resquest from "../Unitis/request";

const folderName = "table";

export const TableListBook = async (limit, per_pages, token) => {
  let response = await resquest.get(
    `${folderName}/list_table_peding/${limit}/${per_pages}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

export const DeleteOrder = async (id, token) => {
  let response = await resquest.del(`${folderName}/cancel_order/${id}`, token);

  return response;
};

export const GetListPending = async (id, token) => {
  let response = await resquest.get(
    `${folderName}/list_one_table_pending/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};

export const SussesPending = async (data, token) => {
  let response = await resquest.post(
    `${folderName}/susses_table`,
    data,
    token,
    false
  );

  return response;
};

export const getBase = async () => {
  let response = await resquest.get(`${folderName}/list_base`);

  return response;
};

export const getTableStatus = async (id_base, type, limit, per_pages, token) => {
  let response = await resquest.get(
    `${folderName}/list_table_pay/${id_base}/${type}/${limit}/${per_pages}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};


export const payTable = async (id, token) => {
  let response = await resquest.del(`${folderName}/pay_table/${id}`,token);

  return response;
};


