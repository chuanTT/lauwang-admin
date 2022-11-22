import "./Loading.scss";

const Loading = ({classCustom = '', styleContainer={}, size = 1}) => {
  return (
    <div className={`${classCustom ? classCustom : 'loading'}`}>
      <div className="loadingio-spinner-dual-ring-9yu5xdxb2f4" style={styleContainer}>
        <div className="ldio-2fc69c8z6e6" style={{transform: `translateZ(0) scale(${size})`}}>
          <div></div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
