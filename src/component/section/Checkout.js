import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PaymentFoorm from "./PaymentFoorm";
import { user } from "../../services/defaultValues";
import { PostRequestApi, postRequestFunc } from "../../services/ApiRequests";
import { CartEmpty, GetCart } from "../../redux/actions";
import { NotificationManager } from "react-notifications";

const Checkout = () => {
  const [tax, setTax] = useState(0);
  const storeData = useSelector((state) => state.cart);
  const Settings = useSelector((state) => state.settinglist);
  const totalPrice = storeData.reduce((accumulator, { price }) => {
    return accumulator + Number(price);
  }, 0);

  const [showPayment, setshowPayment] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = totalPrice.toFixed(2);

  const handleCheckout = () => {
    if (user) {
      if (subtotal > 0) {
        setshowPayment(true);
      } else {
        let course_id = storeData.map((c) => c.id);
        PostRequestApi("enroll-iap", {
          id: course_id,
        }).then((response) => {
          if (response.data.status === true) {
            dispatch(GetCart());
            navigate("/");
            NotificationManager.success(
              `${response.data.message}`,
              "Success!",
              3000,
              null,
              null,
              ""
            );
          }
        });
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="col-md-6 my-3 text-center ">
        <div className="checkout card">
          <p className="text-center">
            You have {storeData?.length} item in your basket
          </p>
          <div className="mt-2 order-checkout">
            <div className="order-detail">
              <p>Order subtotal:</p>
              <div className="checkout-price">
                {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                &#163;
                {totalPrice.toFixed(2)}
              </div>
            </div>
            <div className="order-detail ">
              <p>Tax:</p>
              <div className="checkout-price">
                {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                &#163;
                {tax}
              </div>
            </div>
          </div>
          <div className="order-detail my-2">
            <b>Order total:</b>
            <div className="checkout-price"> &#163;{subtotal}</div>
          </div>
          <div className="col-md-8 offset-md-2 my-4">
          <PaymentFoorm
          name={user?.first_name + " " + user?.last_name}
          setshowPayment={setshowPayment}
          showPayment={showPayment}
          user_id={user?.id}
          handleCheckout={handleCheckout}
          total={Number(subtotal) * 100}
        
        />
          </div>
      
        </div>
      </div>
  
        {/* <PaymentFoorm
          name={user?.name}
          setshowPayment={setshowPayment}
          address={"united Kingdom"}
          user_id={user?.id}
          s_country={"GB"}
          City={"windsom Street"}
          total={subtotal}
          // handleSubmit={handleSubmit}
        /> */}
   
    </>
  );
};

export default Checkout;
