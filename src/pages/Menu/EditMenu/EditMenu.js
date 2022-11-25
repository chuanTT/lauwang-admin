import { useNavigate } from "react-router-dom";

import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import ShowToast from "~/context/ShowToast";
import FormEditMenu from "~/component/Form/FormEditMenu";

const EditMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <DefaultItem
        title={"Chỉnh sửa thực đơn"}
        pathButton={config.path.Menu}
        textButton="Hiển thị thực đơn"
      >
        <ShowToast CallBack={() => {
          navigate(config.path.Menu)
        }}>
          <FormEditMenu />
        </ShowToast>
      </DefaultItem>
    </>
  );
};

export default EditMenu;
