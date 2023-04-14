import { Fragment, useState } from "react";
import { NotificationManager } from "react-notifications";

import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { PostRequestApi } from "../services/ApiRequests";
import OTPInput, { ResendOTP } from "otp-input-react";
import {  useNavigate } from "react-router-dom";
const VerifySignup = () => {
    const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const title = "Verify Email";
  const eamil = localStorage.getItem("signup_email");
  const handleChange = (value) => {
    setOTP(value);
    if (value.length > 5) {
      PostRequestApi("verify_email_with_otp", {
        email: eamil,
        otp: value,
      }).then((res) => {
        if (res?.data?.success == true) {
          NotificationManager.success(
            `${res?.data?.message}`,
            "Success!",
            3000,
            null,
            null,
            ""
          );
          navigate("/login");
        } else {
          NotificationManager.error(
            `${res?.data?.message}`,
            "Error!",
            3000,
            null,
            null,
            ""
          );
        }
      });
    }
  };
  const handleOtp = (mal) => {
    const formData = new FormData();
    formData.append("email", eamil);
    PostRequestApi("send-otp", formData).then((res) => {
      if (res?.data?.success == true) {
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
  };
  return (
    <Fragment>
      <Header />
      <PageHeader title={title} curPage={title} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <p>
              Thank you for signing up! A One Time Password (OTP) has been sent
              to your registered email address. Please check your inbox (and
              spam folder just in case) and enter the OTP in the required field
              to complete the verification process. If you have any trouble,
              please contact us for assistance.
            </p>
            <OTPInput
              value={OTP}
              onChange={handleChange}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
              style={{ justifyContent: "center" }}
            />
            <ResendOTP
              maxTime={300}
              
              style={{ flexDirection: "column" }}
              onResendClick={() => handleOtp()}
            />
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default VerifySignup;
