import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.RACT_APP_SECRET_KEY);

export default function Success() {
  return (
    <>
      <Elements stripe={stripePromise}>
      
      </Elements>
    </>
  );
}
