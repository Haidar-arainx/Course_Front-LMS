import { useState } from "react";
import { Fragment } from "react";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { NotificationManager } from "react-notifications";
import VerifyModal from "../component/VerifyModal";
import { PostRequestApi } from "../services/ApiRequests";
import { Formik } from "formik";
import * as Yup from "yup";

const title = "Register Now";

const btnText = "Get Started Now";

const Instructorsign_up = () => {
  const [modal, setModal] = useState(false);
  const [mail, setMail] = useState("");
  const handleSubmit = (values) => {
    const { name, username, email, password, password_confirmation, gender } =
      values;
    setMail(email);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    // formData.append("phone", Phone);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("gender", gender);
    PostRequestApi("add_instructor", formData).then((res) => {
      if (res?.data?.success == true) {
        NotificationManager.success(
          `${res?.data?.message}`,
          "Success!",
          3000,
          null,
          null,
          ""
        );
        handleOtp();
        setModal(true);
      } else {
        NotificationManager.error(
          `${res?.data?.email} ${res?.data?.password}`,
          "Error!",
          3000,
          null,
          null,
          ""
        );
      }
    });
  };
  const handleOtp = () => {
    const formData = new FormData();
    formData.append("email", mail);
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
      <PageHeader title={"Register Now"} curPage={"Sign Up"} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <>
              <Formik
                initialValues={{
                  name: "",
                  username: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                  gender: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values);
                  console.log(values);
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("Please Enter Your Name"),
                  username: Yup.string().required(
                    "Please Enter Your User Name"
                  ),
                  email: Yup.string()
                    .email()
                    .required("Please Enter Your Email "),
                  password: Yup.string()
                    .required("Password Required")
                    .min(8, "Password is Too short")
                    .matches(/(?=.*[0-9])/, "Must Contain Number"),
                  password_confirmation: Yup.string().oneOf(
                    [Yup.ref("password"), null],
                    "Passwords must match"
                  ),
                  gender: Yup.string().required("Please Select Gender"),
                })}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props;
                  return (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <Input
                            type="text"
                            name="name"
                            id=" name"
                            placeholder="Full name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.name &&
                              touched.name &&
                              "border border-danger"
                            }`}
                          />
                          {errors.name && touched.name && (
                            <div className="text-danger mt-1  ">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <Input
                            type="email"
                            name="email"
                            id="forms.email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.email &&
                              touched.email &&
                              "border border-danger"
                            }`}
                          />
                          {errors.email && touched.email && (
                            <div className="text-danger mt-1">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="User Name"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.username &&
                              touched.username &&
                              "border border-danger"
                            }`}
                          />
                          {errors.username && touched.username && (
                            <div className="text-danger mt-1">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <Input
                            type="password"
                            name="password"
                            id="Password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.password &&
                              touched.password &&
                              "border border-danger"
                            }`}
                          />
                          {errors.password && touched.password && (
                            <div className="text-danger mt-1">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <Input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            placeholder="confirm password"
                            value={values.password_confirmation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.password_confirmation &&
                              touched.password_confirmation &&
                              "border border-danger"
                            }`}
                          />
                          {errors.password_confirmation &&
                            touched.password_confirmation && (
                              <div className="text-danger mt-1">
                                {errors.password_confirmation}
                              </div>
                            )}
                        </div>
                        <div className="form-group">
                          <select
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.gender &&
                              touched.gender &&
                              "border border-danger"
                            }`}
                          >
                            <option selected hidden>
                              Select Gender
                            </option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                          </select>
                          {errors.gender && touched.gender && (
                            <div className="text-danger mt-1">
                              {errors.gender}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <button
                            className="lab-btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            <span>{btnText}</span>
                          </button>
                        </div>
                      </form>
                    </>
                  );
                }}
              </Formik>
            </>
            {/* <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Last Name"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  placeholder="+44xxxxxxxxx"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <select
                  placeholder="Confirm Password"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option selected hidden>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">FeMale</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  rows="4"
                  className="form-control address-textarea"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setdocument_file(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form> */}
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member? <Link to="/login">Login</Link>
              </span>
            </div>
          </div>
        </div>
        <VerifyModal modal={modal} setModal={setModal} handleOtp={handleOtp} />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Instructorsign_up;
