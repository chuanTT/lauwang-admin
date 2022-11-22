import FormMenu from "~/component/Form/FormMenu";
import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";
import ShowToast from "~/context/ShowToast";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const navigate = useNavigate();

  return (
    <>
      <DefaultItem
        title={"Thêm thực đơn"}
        pathButton={config.path.Menu}
        textButton="Hiển thị thực đơn"
      >
        <ShowToast CallBack={() => {
          navigate(config.path.Menu)
        }}>
          <FormMenu />
        </ShowToast>
      </DefaultItem>
    </>
  );
};

export default AddMenu;
