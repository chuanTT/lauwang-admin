import { createContext, useEffect, useRef, useState } from "react";
import Loading from "~/component/Loading";
import * as userServices from "~/Services/userServices";

export const userDataContext = createContext();

const GetDataUser = ({ children, token }) => {
  const [user, setUser] = useState();
  const oldToken = useRef();

  useEffect(() => {
    if (oldToken.current === token && user) {
      return;
    }
    const getData = async () => {
      const response = await userServices.getDataUser(token);

      if (response?.data) {
        setUser((pre) => {
          return {
            ...response.data,
            token,
          };
        });

        oldToken.current = token;
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      {!user && (
        <Loading />
      )}
      {user && (
        <userDataContext.Provider value={user}>
          {children}
        </userDataContext.Provider>
      )}
    </>
  );
};

export default GetDataUser;
