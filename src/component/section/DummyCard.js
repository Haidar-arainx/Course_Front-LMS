import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ price }) {

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [pageLoader, setpageLoader] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setpageLoader(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }
    const {paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://newcourseapp.dhikrfikr.com/cart",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setpageLoader(false);
    } else {
      console.log("Redirect.");
      setpageLoader(false);
    }
  };

  return (
    <>
      <div className="paymentpage">
        <div className="container">
          
                <form id="payment-form" onSubmit={handleSubmit}>
                  <PaymentElement />
                  {pageLoader ? (
                    <>
                  Loading
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="btn btn-success mx-5 my-3 p-2 w-75"
                        disabled={!stripe}
                        
                      >
                        Confirm
                      </button>
                    </>
                  )}

                  {errorMessage && <div className="err">{errorMessage}</div>}
                </form>
             
        </div>
      </div>
      {/* <style jsx>{`
        .trustpilot {
          width: 100%;
          margin: 30px 0 0 0;
          padding: 0px 0;
          float: left;
          text-align: center;
        }
        .total_due {
          width: 100%;
          margin: 0 0 0 0;
          padding: 50px 0;
          float: left;
        }
        .total_due h3 {
          font-family: "SegoeUI";
          color: #000;
          font-size: 27px;
          margin: 0 0 0 0;
          padding: 0 0 15px 0;
          float: left;
          width: 100%;
          line-height: 48px;
          font-weight: 600;
          text-align: left;
          border-bottom: 1px solid #cacdd2;
        }
        .total_due h4 {
          font-family: "SegoeUI";
          color: #000;
          font-size: 27px;
          margin: 0 auto;
          padding: 0 0 15px 0;
          float: none;
          width: 70%;
          line-height: 48px;
          font-weight: 600;
          text-align: center;
          border-bottom: 1px solid #cacdd2;
        }
        .total_due h3 span {
          color: #2153cc;
          margin: 0 0 0 6px;
        }
        .total_due ul {
          width: 100%;
          margin: 20px 0 20px 0;
          padding: 0px;
          float: left;
        }
        .total_due ul li {
          width: 100%;
          margin: 10px 0 10px 0;
          padding: 0px;
          float: left;
          font-family: "SegoeUI";
          color: #000;
          font-size: 16px;
          list-style: none;
        }
        .total_due ul li img {
          float: left;
          margin: 4px 15px 0px 0;
        }
        .paymentpage {
          width: 100%;
          margin: 0 0 0 0;
          padding: 50px;
          float: left;
          border-top: 4px solid #e9eefa;
        }
        .paymentbox {
          width: 100%;
          margin: 0 0 0 0;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
          padding: 30px;
          background-color: #fff;
          float: left;
        }
        .paymentbox h3 {
          font-family: "SegoeUI";
          color: #000;
          font-size: 27px;
          margin: 0 0 0 0;
          padding: 0;
          float: left;
          width: 100%;
          line-height: 48px;
          font-weight: 600;
          text-align: left;
        }
        .paymentbox h3 span {
          color: #2153cc;
        }
        .paymentbox p {
          font-family: "SegoeUI";
          font-size: 16px;
          line-height: 24px;
          margin: 0 0 30px 0;
          padding: 0 0 15px 0;
          font-weight: 400;
          text-align: left;
          color: #536376;
          float: left;
          width: 100%;
          border-bottom: 1px solid #cacdd2;
        }
        .paymentbox .paymentdec {
          font-family: "SegoeUI";
          font-size: 12px;
          line-height: 20px;
          margin: 30px 0 30px 0;
          padding: 0 0 0px 0;
          font-weight: 400;
          text-align: left;
          color: #536376;
          float: left;
          width: 100%;
        }
        #payment-form {
          width: 100%;
          margin: 0 0 0 0;
          padding: 0px;
          float: left;
        }
        .btnconfirmpayment {
          font-size: 16px;
          font-family: "SegoeUI";
          background-color: #2153cc;
          border: none;
          color: #fff;
          padding: 10px 20px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          margin: 0 auto;
          width: 80%;
          display: block;
          margin-top: 20px;
          font-weight: 700;
          cursor: pointer;
        }
        .err {
          text-align: center;
          font-size: 18px;
          padding: 15px 0 0 0;
          color: red;
        }
        @media (max-width: 767px) {
          .paymentpage {
            padding: 10px;
          }
          .paymentbox {
            padding: 10px;
          }
        }
        .jazzcash_p {
          font-size: 16px;
          font-weight: bold;
          float: left;
          width: 100%;
          padding-top: 15px;
        }
        .jazzcash_text {
          font-size: 16px;
          float: left;
          width: 100%;
        }
        .jazzcash_text span {
          font-weight: bold;
        }
        .jazzcash-icon {
          float: right;
          position: relative;
          margin: -15px 0px 0px 0px;
        }
      `}</style> */}
    </>
  );
}
