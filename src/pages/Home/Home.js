import { useContext } from "react";

import CardTime from "~/component/CardTime";
import DailySales from "~/component/DailySales";
import Images from "~/assets/images";
import {userDataContext} from "~/context/GetDataUser";

const Home = () => {
  const data = useContext(userDataContext);
  return (
    <div className="main-body">
      <div className="page-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-xl-4">
                <DailySales title={"Bàn đã được đặt trong tuần"} />
              </div>

              <div className="col-md-6 col-xl-4">
                <DailySales title={"Bàn chờ duyệt trong tuần"} />
              </div>

              <div className="col-md-6 col-xl-4">
                <DailySales title={"Bàn chờ duyệt trong tuần"} />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <CardTime name={data?.full_name}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
