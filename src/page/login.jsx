import { useState } from "react";
import { Component, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { PostRequestApi, postRequestFunc } from "../services/ApiRequests";
import { NotificationManager } from "react-notifications";
const title = "Login";

const btnText = "Submit Now";
//student@dhikrfikr.com  , pass:ayHbuxUV
const LoginPage = () => {
  const [email, setEmail] = useState("student@dhikrfikr.com");
  const [password, setPassword] = useState("1eamArainX@");
  const [showVerify, setShowVerify] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    PostRequestApi("login", { email: email, password: password })
      .then((res) => {
        if (res.data?.success == true) {
          const item = {
            token: res.data?.data?.access_token,
            user: res.data?.data?.user_info,
          };
          localStorage.setItem("gogo_current_user", JSON.stringify(item));
          NotificationManager.success(
            `${res.data.message}`,
            "User!",
            3000,
            null,
            null,
            ""
          );
          navigate(-1);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          NotificationManager.error(
            `${res.data.message}`,
            "User!",
            3000,
            null,
            null,
            ""
          );
        }
      })
      .catch((error) => {
        setShowVerify(true);
        localStorage.setItem("signup_email", email);

        NotificationManager.error(
          `${error.response.data.message}`,
          "Login Error!",
          3000,
          null,
          null,
          ""
        );
      });
  };
  return (
    <Fragment>
      <Header />
      <PageHeader title={"Login Page"} curPage={"Login"} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  placeholder="email "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="form-control"
                    />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <Link to="/forgetpass">Forget Password?</Link>
                </div>
              </div>
              <div className="form-group text-center">
                <button className="d-block lab-btn">
                  <span>{btnText}</span>
                </button>
                {showVerify && (
                  <button
                    className="d-block lab-btn mt-0"
                    type="button"
                    onClick={() => {
                      window.location.href = "/verifysignup";
                    }}
                  >
                    <span>Verify Email</span>
                  </button>
                )}
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Don’t Have any Account? <Link to="/signup">Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
