import React from "react";
import { Button } from "react-bootstrap";

const Coupon = () => {
  return (
    <div className="col-md-6 text-center my-3 ">
      <div className="checkout ">
        <div className="cart-text my-3 ">
          <h1>Coupon</h1>
          <p>Enter your coupon code if you have one.</p>
          <div className="input-fields  my-3">
            <input type="text" placeholder="Enter Coupone Code" className="form-control"/>
          </div>
        </div>
        <div className="col-md-8 offset-md-2 my-4 py-2">
          <Button className="baskit-button text-center" type="submit">
            Apply Coupon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
