import React from "react";


import { PostRequestApi } from "../../services/ApiRequests";

import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import {  Button } from "react-bootstrap";
import { useState } from "react";
import {  GetCart } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import {  user } from "../../services/defaultValues";
import CheckoutForm from "./DummyCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { get_cookie, set_cookie } from "../../services/helper";
import {
  CoutomerSecret,
  createStripeCustomer,
} from "../../paymentmthod/StripFunction";

import { useSearchParams } from "react-router-dom";
import ConfirmPayment from "../../paymentmthod/ConfirmPayment";

const PaymentFoorm = ({
  name,
  setshowPayment,
  showPayment,
  handleCheckout,
  total,
  user_id,
}) => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("payment_intent_client_secret");

  const storeData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let course_id = storeData.map((c) => c.id);
  const [loader, setLoader] = useState(true);
  const [namee, setname] = useState("");
  const [email, setemail] = useState("");

  const [customerID, setcustomerID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [elemet, setelemet] = useState([]);
  const publishableKey = process.env.REACT_APP_API_KEY;
  const stripePromise = loadStripe(publishableKey);


  const handleToken = async (token) => {
    PostRequestApi("checkout", {
      course_id: storeData[0]?.course_id,
      purchase_price: storeData[0].price,
      discount_amount: storeData[0].course.discount_price
        ? storeData[0].course.discount_price
        : 0,
      tracking_id: storeData[0].tracking,
      user_id: user_id,
      response: token,
    }).then((res) => {
      if (res.data.status == "true") {
        dispatch(GetCart());
        navigate("/");
        NotificationManager.success(
          `${res?.data?.message}`,
          "Success!",
          3000,
          null,
          null,
          ""
        );
      }
    });

    // PostRequestApi("enroll-iap", {
    //   id: storeData[0]?.course_id,
    //   response: token,
    // }).then((res) => {
    //   if (res.data.success == true) {
    //     NotificationManager.success(
    //       res?.data?.message,
    //       "Course!",
    //       3000,
    //       null,
    //       null,
    //       ""
    //     );
    //     // dispatch(GetCart());
    //     // navigate('/')
    //   }
    // });
  };

  useEffect(() => {
    CoutomerSecret(total).then((client) => {
      set_cookie("client_secret", client.client_secret);
      setClientSecret(client.client_secret);
    });
  }, []);

  const get_customer = async () => {
    const { data } = await PostRequestApi("get_creat_strip_user", {
      user_id: user?.id,
    });
   
    if (data.status == "true") {
      setcustomerID(data.data.id);
    } else if (data.status == "false") {
      // Create new customer ID
      createStripeCustomer(user?.name, user?.email).then((customer) => {
        set_cookie("customer_id", customer.id);
        setcustomerID(customer.id);
        // save customer
        PostRequestApi("creat_strip_user", {
          user_id: user?.id,
          response: customer,
        }).then((res) => {
          console.log(res);
        });
      });
    }
  };
  useEffect(() => {
    const fuv = async () => {
      if (get_cookie("customer_id")) {
        setcustomerID(get_cookie("customer_id"));
      } else {
        await get_customer();
      }
      setLoader(false);
    };
    fuv();
  }, []);

  const options = {
    clientSecret: get_cookie("client_secret"),
  };

  return (
    <>
      <Button className="btn btn-primary text-center" onClick={handleCheckout}>
        Proceed To Payment
      </Button>
      <Elements stripe={stripePromise}>
        <ConfirmPayment
          params={params}
          stripePromise={stripePromise}
          handleToken={handleToken}
        />
      </Elements>
      {/* sjkdsj gsdjgjsd/ */}
      {showPayment && (
        <div
          className="payment-form-main "
          onClick={() => {
            setshowPayment(false);
          }}
        >
          <div
            className="col-md-5"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="payment-form">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm price={total} />
              </Elements>
            </div>
          </div>
        </div>
      )}

      {/* <PaymentForm
              applicationId="sandbox-sq0idb-tBv9J7IS7gx7w_EcJfcT4g"
              cardTokenizeResponseReceived={async (token, buyer) => {
                setloading(true);
                axios
                  .post(
                    "https://ivy.premiumblindsuk.com/api/sendsquarepayment",
                    {
                      source_id: token.token,
                      payment: total,
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      PostRequestApi("payment_store", {
                        course_id: course_id,
                        invoice_total: total,
                        status: "success",
                        user_id: user?.id
                      }).then((response) => {
                        if (response.data.status === true) {
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
                      postRequestFunc("course_enroll", {
                        user_id: user_id,
                        course_id: course_id,
                      }).then((response) => {
                        if (response.data.status === true) {
                          setloading(false);
                          dispatch(CartEmpty());
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
                  });

                // postRequestFunc('payment_store ',)
                // Payment(token.token, totalPrice).then((res) => {
                //   if (res.status === 200) {
                //     handleSubmit();
                //   }
                // });

                // alert(JSON.stringify(token, null, 2));
                console.info({ token, buyer });
              }}
              createVerificationDetails={() => ({
                amount: ` ${total}`,

                billingContact: {
                  familyName: `${name}`,
                  givenName: `${name}`,
                  countryCode: `${s_country}`,
                  city: `${City}`,
                  addressLines: [`${address}`],
                },
                currencyCode: "GBP",
                intent: "CHARGE",
              })}
              locationId="LPBNTGDZZYB3M"
            >
              <CreditCard text={"Pay now"} />
            </PaymentForm>
            <div className="square-pay mt-4">
              <div className="square_text">
                <LockIcon />
                <span>
                  Secure Checkout - Shopping with us is always safe and secure
                </span>
              </div>
            </div> */}
    </>
  );
};

export default PaymentFoorm;
