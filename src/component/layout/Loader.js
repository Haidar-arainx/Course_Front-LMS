import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className=" h-100  w-100">
       <div className=" d-flex justify-content-center align-content-center text-center ">
      <Spinner animation="border" variant="success" />
    </div>
    </div>
  );
};

export default Loader;
