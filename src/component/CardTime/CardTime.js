import { useEffect, useRef, useState } from "react";
import Images from "~/assets/images";

const CardTime = ({name}) => {
  const timeRef = useRef();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  
  useEffect(() => {
    timeRef.current = setInterval(() => {
      const date = new Date();

      const t = date.getDay() === 0 ? "Chủ nhật" : `Thứ ${date.getDay() + 1}`;
      const d = `0${date.getDate()}`.slice(-2);
      const m = `0${date.getMonth() + 1}`.slice(-2);
      const y = date.getFullYear();

      const h = `0${date.getHours()}`.slice(-2);
      const mm = `0${date.getMinutes()}`.slice(-2);
      const s = `0${date.getSeconds()}`.slice(-2);

      setDate(`${t}, ${d}/${m}/${y}`);
      setTime(`${h}:${mm}:${s}`);
    });

    return () => {
      clearInterval(timeRef.current);
    }
  }, []);

  return (
    <div className="card">
      <div className="d-flex align-items-end row">
        <div className="col-sm-7">
          <div className="card-body">
            <h5 className="card-title text-primary">
              Xin chào, {name} 🎉
            </h5>
            <h3 className="mb-2">Hà Nội, Việt Nam</h3>
            <h6 className="mb-2">{date}</h6>
            <p className="mb-2">{time}</p>
            <p className="mb-4">Chúc bạn một ngày làm việc tốt lành!</p>
          </div>
        </div>
        <div className="col-sm-5 text-center text-sm-left">
          <div className="card-body pb-0 px-0 px-md-4">
            <img
              src={Images.peopleLaptop}
              height="140"
              alt="View Badge User"
              data-app-dark-img="illustrations/man-with-laptop-dark.png"
              data-app-light-img="illustrations/man-with-laptop-light.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTime;
