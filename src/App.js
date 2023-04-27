import { BrowserRouter, Routes, Route } from "react-router-dom";
import "swiper/css";
import "./assets/sass/style.css";

import "./component/user-dashboard/css/skin_color.css";
import "./component/user-dashboard/css/style.css";
import ScrollToTop from "./component/layout/ScrollToTop";

import ForgetPass from "./page/forgetpass";

import Instructorsign_up from "./page/Instructorsign_up";

import NotificationContainer from "react-notifications/lib/NotificationContainer";

import { useDispatch, useSelector } from "react-redux";
import React, { Suspense, useEffect, useState } from "react";
import {
  GetCart,
  GetCategoriesAction,
  GetContent,
  GetCoursesAction,
  GetGeneralAction,
  GetPaymentAction,
} from "./redux/actions";
import { user } from "./services/defaultValues";
import { Helmet } from "react-helmet";

const Home = React.lazy(() => import("./page/home"));
const Quiz = React.lazy(() => import("./page/Quiz"));
const AllQuiz = React.lazy(() => import("./page/AllQuiz"));
const CoursePage = React.lazy(() => import("./page/course"));
const VerifySignup = React.lazy(() => import("./page/VerifySignup"));
const Payment = React.lazy(() => import("./page/Payment"));
const BankVerify = React.lazy(() => import("./page/BankVerify"));
const ErrorPage = React.lazy(() => import("./page/404"));
const AboutPage = React.lazy(() => import("./page/about"));
const BlogPage = React.lazy(() => import("./page/blog"));
const BlogSingle = React.lazy(() => import("./page/blog-single"));
const Cart = React.lazy(() => import("./page/Cart"));
const ContactPage = React.lazy(() => import("./page/contact"));
const CourseSingle = React.lazy(() => import("./page/course-single"));
const UserDashboard = React.lazy(() => import("./page/UserDashboard"));
const InstructorPage = React.lazy(() => import("./page/instructor"));
const SignupPage = React.lazy(() => import("./page/signup"));
const LoginPage = React.lazy(() => import("./page/login"));
const CheckoutPay = React.lazy(() => import("./page/CheckoutPay"));
const Invoice = React.lazy(() => import("./page/Invoice"));

function App() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.id) {
      dispatch(GetCoursesAction(user?.id));
      dispatch(GetPaymentAction(user?.id));
      dispatch(GetCart());
    }
    dispatch(GetCategoriesAction());
    dispatch(GetGeneralAction());

    dispatch(GetContent());
  }, []);
  const Settings = useSelector((state) => state.settinglist);
  // effect to update favicon
  useEffect(() => {
    if (Settings?.length > 0) {
      const fav = Settings.find((f) => f.key == "favicon");
      const tile = Settings.find((f) => f.key == "site_title");

      setTitle(tile?.value);
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = fav?.value;
    }
  }, [Settings]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NotificationContainer />
      <Helmet>
        <title>{title}</title>
        {/* <meta name="description" content="Helmet application" /> */}
      </Helmet>
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user-dashboard" element={<UserDashboard />} />
          <Route path="/singlequiz/:id" element={<Quiz />} />
          <Route path="/quiz" element={<AllQuiz />} />
          <Route path="course" element={<CoursePage />} />
          <Route path="course/:id" element={<CoursePage />} />
          <Route path="course-single/:id" element={<CourseSingle />} />
          <Route path="cart" element={<Cart />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog-single/:id" element={<BlogSingle />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="instructor" element={<InstructorPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/instructor-signup" element={<Instructorsign_up />} />
          <Route path="/verify" element={<BankVerify />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/verifysignup" element={<VerifySignup />} />
          <Route path="forgetpass" element={<ForgetPass />} />
          <Route path="checkout" element={<CheckoutPay />} />
          <Route path="payment" element={<Payment />} />
          <Route path="/invoice/:id" element={<Invoice />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
