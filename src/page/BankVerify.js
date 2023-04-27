import React from "react";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { useSearchParams } from 'react-router-dom';
const BankVerify = () => {
  const [searchParams] = useSearchParams();
  const param = Object.fromEntries([...searchParams])

  return (
    <>
      <Header />
      <PageHeader
        title={"Archives: Payment Request Received "}
        curPage={"Payment Request Received"}
      />
      <div className="course-single-section py-5 section-bg">
        <div className="container">
          <div class="row">
            {/* <h1>Payment Request Received</h1> */}
            <p>Thank you for choosing Dhikrfikr Course App!</p>
            <p>
              We have received your bank transfer payment request. Please note
              that your payment is pending verification by our admin team. Once
              the payment has been verified, your account will be activated, and
              you'll gain full access to the course(s) you purchased.
            </p>
            <p>Transaction Details:</p>
            <ul>
              <li>Bank Name: [{param?.bank_name}]</li>
              <li>Reference Number: [ {param?.ref_number}]</li>
              <li>Account Holder: [{param?.ac_holder}]</li>
              <li>Amount: [{param?.amount}]</li>
              <li>Tracking ID: [{param?.tracking_id}]</li>
            </ul>
            <p>
              Please allow some time for our admin team to review and verify
              your payment. You will receive a confirmation email once your
              payment has been approved and your course access has been granted.
              Should you have any questions or concerns, please don't hesitate
              to contact our support team.
            </p>
            <p>
              Thank you for your patience, and we look forward to helping you
              unlock your potential with Dhikrfikr Course App!
            </p>
            <p>Best regards,</p>
            <p>The Dhikrfikr Course App Team</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankVerify;
