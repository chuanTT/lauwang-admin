import { FormNews } from "~/component/Form";
import config from "~/config";
import DefaultItem from "~/layout/DefaultItem";

const AddNews = () => {
  return (
    <>
      <DefaultItem
        title={"Thêm tin tức"}
        pathButton={config.path.News}
        textButton="Hiển thị tin tức"
      >
        <FormNews />
      </DefaultItem>

      {/* <Model /> */}
    </>
  );
};

export default AddNews;
