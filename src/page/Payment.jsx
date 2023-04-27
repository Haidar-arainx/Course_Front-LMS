import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Bank from "../component/paumentmethod/Bank";
import StripeChek from "../component/paumentmethod/StripeChek";
import Wallet from "../component/paumentmethod/Wallet";
import { GetRequestApi, PostRequestApi } from "../services/ApiRequests";
import { IMAGE_BASE_URL } from "../services/base_url";

const Payment = () => {
  const subtotal = localStorage.getItem("discount_amount");
  const storeData = useSelector((state) => state.cart);
  const [method, setMethod] = useState([]);
  const [detaitl, setDetaitl] = useState([]);
  const total = storeData
    .reduce((accum, item) => accum + item.price, 0)
    .toFixed(2);
  useEffect(() => {
    GetRequestApi("payment_methods").then((res) => setMethod(res.data.data));
    PostRequestApi("get_checkout_details", {
      tracking_id: storeData[0]?.tracking,
    }).then((res) => setDetaitl(res.data.data));
  }, []);

  const Stripe = useMemo(
    () => method && method.find((f) => f.id === 2),
    [method]
  );

  return (
    <>
      <Header />
      <PageHeader title={"Archives: Payment"} curPage={"Payment"} />
      <div className="course-single-section py-5 section-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">
              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <div class="biling_address gray-bg mb-5 ">
                  <div>
                    <h4>Billing Address</h4>
                  </div>
                  <div class="biling_body_content">
                    <p>
                      {detaitl?.billing?.first_name +
                        " " +
                        detaitl?.billing?.last_name}
                    </p>
                    <p></p>
                    <p>
                      {detaitl?.billing?.state?.name} ,{" "}
                      {detaitl?.billing?.city?.name} -{" "}
                      {detaitl?.billing?.address1}{" "}
                    </p>
                    <p> {detaitl?.billing?.country?.name} </p>
                  </div>
                </div>
              </div>
              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <h3> Choose your preferred payment method</h3>
                <div className="payment_method_wrapper my-3">
                  <StripeChek
                    method={Stripe}
                    subtotal={detaitl?.purchase_price}
                  />
                  <Wallet subtotal={detaitl?.purchase_price} />
                  {/* <Bank subtotal={detaitl?.purchase_price} /> */}
                </div>
              </div>
            </div>
            <div className="col-md-5 offset-md-1">
              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <h1 className="my-3">Your order</h1>
                {storeData &&
                  storeData.map((list) => {
                    return (
                      <div class="single_ordered_product">
                        <div class="product_name d-flex align-items-center">
                          <div
                            class="thumb"
                            style={{
                              backgroundImage: `url(${IMAGE_BASE_URL}${list?.course?.image})`,
                            }}
                          ></div>

                          <span>{list?.course?.title?.en}</span>
                        </div>
                        <span class="order_prise f_w_500 font_16 text-nowrap">
                          £ {list?.price}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <div class="single_lists">
                  <span>
                    <strong> Subtotal</strong>
                  </span>
                  <span>£ {detaitl?.price}</span>
                </div>
                <div class="single_lists">
                  <span>
                    <strong> Discount Amount</strong>
                  </span>
                  <span>£ {detaitl?.discount}</span>
                </div>
                <div class="single_lists">
                  <span>
                    <strong>Payable Amount </strong>{" "}
                  </span>
                  <span>£ {detaitl?.purchase_price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
