const Rating = ({rat}) => {
  return (
    <span className="ratting">
      {Array(5)
        .fill()
        .map((r,i) => {
            console.log( rat)
          return (
            <i
              className="icofont-ui-rating"
              style={{ color:i >= rat && "gray" }}
            ></i>
          );
        })}

      {/* <i className="icofont-ui-rating"></i>
      <i className="icofont-ui-rating"></i>
      <i className="icofont-ui-rating"></i>
      <i className="icofont-ui-rating"></i> */}
    </span>
  );
};

export default Rating;
