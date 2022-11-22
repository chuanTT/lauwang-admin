import { NavLink } from "react-router-dom";

const DefaultItem = ({
  children,
  title,
  textButton,
  pathButton,
  isVisible = true,
}) => {
  return (
    <>
      <div className="heading d-flex mb-3 justify-content-between">
        <h2 className="h4 mb-0">{title}</h2>

        {isVisible && (
          <NavLink
            to={pathButton}
            className="text-white btn btn-primary mb-0 mr-0"
          >
            {textButton}
          </NavLink>
        )}
      </div>
      {children}
    </>
  );
};

export default DefaultItem;
