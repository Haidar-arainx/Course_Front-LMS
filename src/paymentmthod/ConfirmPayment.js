import { useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { NotificationManager } from "react-notifications";

const ConfirmPayment = ({ params, stripePromise,handleToken }) => {
  useEffect(() => {
    if (params) {
      const getPaymentIntent = async () => {
        const stripe = await stripePromise;
        const {paymentIntent} = await stripe.retrievePaymentIntent(params);
        if(paymentIntent.status == 'succeeded'){
            handleToken(paymentIntent)
        }else{
            NotificationManager.success(
                "Something Went Wrong",
                "Please Try Again",
                3000,
                null,
                null,
                ""
              );
        }
     
      };

      getPaymentIntent();
    }
  }, [params]);

  return <></>;
};

export default ConfirmPayment;
