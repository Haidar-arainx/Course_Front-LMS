import { useState } from "react";
import { Component, Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import Loader from "../component/layout/Loader";
import About from "../component/section/about";
import Achievement from "../component/section/achievement";
import Banner from "../component/section/banner";
import Blog from "../component/section/blog";
import Category from "../component/section/category";
import Course from "../component/section/course";

import Student from "../component/section/student";
import { GetRequestApi } from "../services/ApiRequests";

const Home = () => {
  const [formDataState, setFormDataState] = useState({});
  const Content = useSelector((state) => state.content);

  useEffect(() => {
    if (Content?.home_content) {
      const result = Content?.home_content;
      const stitle = result.find((f) => f.key == "slider_title");
      const stext = result.find((f) => f.key == "slider_text");
      const sstext = result.find((f) => f.key == "slider_sub_text");

      const simage = result.find((f) => f.key == "slider_banner");
      const ctitle = result.find((f) => f.key == "category_title");
      const cstitle = result.find((f) => f.key == "category_sub_title");
      const cotitle = result.find((f) => f.key == "course_title");
      const costitle = result.find((f) => f.key == "course_sub_title");
      const atitle = result.find((f) => f.key == "about_page_title");
      const astitle = result.find((f) => f.key == "about_sub_title");
      const aimage = result.find((f) => f.key == "about_page_banner");
      const ttitle = result.find((f) => f.key == "testimonial_title");
      const tstitle = result.find((f) => f.key == "testimonial_sub_title");
      const timage = result.find((f) => f.key == "testimonial_banner");
      const btitle = result.find((f) => f.key == "blog_page_title");
      const bstitle = result.find((f) => f.key == "blog_page_sub_title");
      const wctitle = result.find((f) => f.key == "why_choose_title");
      const wcstitle = result.find((f) => f.key == "why_choose_sub_title");
      const key1 = result.find((f) => f.key == "key_feature_title1");
      const skey1 = result.find((f) => f.key == "key_feature_subtitle1");
      const key2 = result.find((f) => f.key == "key_feature_title2");
      const skey2 = result.find((f) => f.key == "key_feature_subtitle2");
      const key3 = result.find((f) => f.key == "key_feature_title3");
      const skey3 = result.find((f) => f.key == "key_feature_subtitle3");
      const key4 = result.find((f) => f.key == "key_feature_title4");
      const skey4 = result.find((f) => f.key == "key_feature_subtitle4");

      setFormDataState({
        ...formDataState,
        slider_title: stitle?.value?.en,
        slider_text: stext?.value?.en,
        slider_sub_text: sstext?.value?.en,
        slider_image: simage?.value?.en,
        category_title: ctitle?.value?.en,
        category_sub_title: cstitle?.value?.en,
        course_title: cotitle?.value?.en,
        course_sub_title: costitle?.value?.en,
        about_page_title: atitle?.value?.en,
        about_sub_title: astitle?.value?.en,
        about_image: aimage?.value?.en,
        testimonial_title: ttitle?.value?.en,
        testimonial_sub_title: tstitle?.value?.en,
        testimonial_image: timage?.value?.en,
        blog_page_title: btitle?.value?.en,
        blog_page_sub_title: bstitle?.value?.en,
        why_choose_title: wctitle?.value?.en,
        why_choose_sub_title: wcstitle?.value?.en,
        key_feature_title1: key1?.value?.en,
        key_feature_subtitle1: skey1?.value?.en,
        key_feature_title2: key2?.value?.en,
        key_feature_subtitle2: skey2?.value?.en,
        key_feature_title3: key3?.value?.en,
        key_feature_subtitle3: skey3?.value?.en,
        key_feature_title4: key4?.value?.en,
        key_feature_subtitle4: skey4?.value?.en,
      });
    }
  }, [Content]);
  return (
    <Fragment>
      <Header />
      <Banner formDataState={formDataState} />
      <Category formDataState={formDataState} />
      <Course formDataState={formDataState} />
      <About formDataState={formDataState} />
      <Student formDataState={formDataState} />
      <Blog formDataState={formDataState} />
      <Achievement formDataState={formDataState} />
      <Footer />
    </Fragment>
  );
};

export default Home;
