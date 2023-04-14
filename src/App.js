import { BrowserRouter, Routes, Route } from "react-router-dom";
import "swiper/css";
// import '../src/assets/css/style1.css'
// import '../src/assets/sass/style.css'
// import "./assets/sass/style.css"
// import "./assets/sass/style.css"
import "./assets/sass/style.css";

import ScrollToTop from "./component/layout/ScrollToTop";
import ErrorPage from "./page/404";
import AboutPage from "./page/about";
import BlogPage from "./page/blog";
import BlogPageTwo from "./page/blog-2";
import BlogPageThree from "./page/blog-3";
import BlogSingle from "./page/blog-single";
import CartPage from "./page/cart-page";
import ContactPage from "./page/contact";

import CourseSingle from "./page/course-single";

import ForgetPass from "./page/forgetpass";

import UserDashboard from "./page/UserDashboard";
import InstructorPage from "./page/instructor";
import LoginPage from "./page/login";
import SearchNone from "./page/search-none";
import SearchPage from "./page/search-page";
import ShopPage from "./page/shop";
import ShopDetails from "./page/shop-single";
import Instructorsign_up from "./page/Instructorsign_up";
import TeamPage from "./page/team";
import TeamSingle from "./page/team-single";

import SignupPage from "./page/signup";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import Cart from "./page/Cart";
import CheckoutPay from "./page/CheckoutPay";
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
// const Success = React.lazy(() => import("./page/success"));

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
      <Suspense fallback={<div className="loading">Loading</div>}>
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
          <Route path="blog-2" element={<BlogPageTwo />} />
          <Route path="blog-3" element={<BlogPageThree />} />
          <Route path="blog-single/:id" element={<BlogSingle />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="team-single" element={<TeamSingle />} />
          <Route path="instructor" element={<InstructorPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop-single" element={<ShopDetails />} />
          <Route path="cart-page" element={<CartPage />} />
          <Route path="search-page" element={<SearchPage />} />
          <Route path="search-none" element={<SearchNone />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/instructor-signup" element={<Instructorsign_up />} />
          {/* <Route path="/payments-success" element={<Success />} /> */}
          <Route path="signup" element={<SignupPage />} />
          
           <Route path="/verifysignup" element={<VerifySignup />} />
          <Route path="forgetpass" element={<ForgetPass />} />

          <Route path="/checkout" element={<CheckoutPay />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
