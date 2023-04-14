import Stripe from "stripe";
// process.env.RACT_APP_SECRET_KEY
const stripe = new Stripe('sk_test_Kl5IqAW5eoTPRlnQ6mNTcSA600uvwwkdva');

export function createStripeCustomer(name, email) {
  return stripe.customers.create({
    name: name,
    email: email,
  });
}
export function CoutomerSecret(amount) {
  return stripe.paymentIntents.create({
    amount,
    currency: "gbp",
  });
}

export function ConfimrPayment(params) {
  return stripe.retrievePaymentIntent(params)
}