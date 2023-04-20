import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { PostRequestApi } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";

const StripeChek = ({ method, subtotal }) => {
  const storeData = useSelector((state) => state.cart);
  const onToken = (token) => {
    PostRequestApi("payment_submit", {
      tracking_id: storeData[0].tracking,
      payment_method: "Stripe",
      stripeToken: token?.id,
    }).then(res=>{
      if(res.status === 200){
        window.location.href = '/'
        localStorage.removeItem('discount_amount')
      }
    } );
  };
  return (
    <StripeCheckout
      name="Stripe Payment" // the pop-in header title
      stripeKey="pk_test_Sq2WsmlEJbVThpUE0nIcbDTV00keDGmtuP"
      // description="Big Data Stuff" // the pop-in header subtitle
      image="https://course.dhikrfikr.com/public/uploads/main/images/06-02-2023/63e1376eb565b.png" // the pop-in header image (default none)
      ComponentClass="div"
      panelLabel="Pay" // prepended to the amount in the bottom pay button
      amount={subtotal * 100} // cents
      currency="GBP"
      locale="en"
      email="dhikrfikr.com"
      // Note: Enabling either address option will give the user the ability to
      // fill out both. Addresses are sent as a second parameter in the token callback.
      // shippingAddress="abcdef"
      // billingAddress={false}
      // Note: enabling both zipCode checks and billing or shipping address will
      // cause zipCheck to be pulled from billing address (set to shipping if none provided).
      // zipCode={false}
      alipay // accept Alipay (default false)
      bitcoin // accept Bitcoins (default false)
      // allowRememberMe // "Remember Me" option (default true)
      token={onToken} // submit callback
      // opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
      // closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)
      // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
      // you are using multiple stripe keys
      // reconfigureOnUpdate={false}
      // Note: you can change the event to `onTouchTap`, `onClick`, `onTouchStart`
      // useful if you're using React-Tap-Event-Plugin
      // triggerEvent="onTouchTap"
    >
      <button className="Payment_btn">
        <img
          class=" w-100  "
          // style={{ padding: "4px", marginTop: "-1px" }}
          src={`${IMAGE_BASE_URL}/${method?.logo}`}
          alt=""
        />
      </button>
    </StripeCheckout>
  );
};

export default StripeChek;
