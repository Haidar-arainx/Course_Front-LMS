import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import About from "../component/section/about";
import Achievement from "../component/section/achievement";

import Blog from "../component/section/blog";

import Student from "../component/section/student";




const AboutPage = () => {
    const [formDataState, setFormDataState] = useState({});
    const Content = useSelector((state) => state.content);
  
    useEffect(() => {
      if (Content?.home_content) {
        const result = Content?.home_content;

        const atitle = result.find((f) => f.key == 'about_page_title');
        const astitle = result.find((f) => f.key == 'about_sub_title');
        const ades = result.find((f) => f.key == 'about_description');
        const aimage = result.find((f) => f.key == 'about_page_banner');
        const ttitle1 = result.find((f) => f.key == 'about_thumbnail_title1');
        const timage1 = result.find((f) => f.key == 'about_thumbnail_icon1');
        const tstitle1 = result.find(
          (f) => f.key == 'about_thumbnail_subtitle1'
        );
        const ttitle2 = result.find((f) => f.key == 'about_thumbnail_title2');
        const timage2 = result.find((f) => f.key == 'about_thumbnail_icon2');
        const tstitle2 = result.find(
          (f) => f.key == 'about_thumbnail_subtitle2'
        );
        const ttitle3 = result.find((f) => f.key == 'about_thumbnail_title3');
        const timage3 = result.find((f) => f.key == 'about_thumbnail_icon3');
        const tstitle3 = result.find(
          (f) => f.key == 'about_thumbnail_subtitle3'
        );
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
          about_page_title: atitle?.value?.en,
          about_sub_title: astitle?.value?.en,
          about_image: aimage?.value?.en,
          about_description: ades?.value?.en,

          about_thumbnail_title1: ttitle1?.value?.en,
          about_icon1: timage1?.value?.en,
          about_thumbnail_subtitle1: tstitle1?.value?.en,

          about_thumbnail_title2: ttitle2?.value?.en,
          about_icon2: timage2?.value?.en,
          about_thumbnail_subtitle2: tstitle2?.value?.en,
          about_thumbnail_title3: ttitle3?.value?.en,
          about_icon3: timage3?.value?.en,
          about_thumbnail_subtitle3: tstitle3?.value?.en,
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
            <PageHeader title={'About Us'} curPage={'About'} />
            {/* <div className="about-section style-3 padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="about-left">
                                <div className="about-thumb">
                                    <img src="assets/images/about/01.jpg" alt="about" />
                                </div>
                                <div className="abs-thumb">
                                    <img src="assets/images/about/02.jpg" alt="about" />
                                </div>
                                <div className="about-left-content">
                                    <h3>{year}</h3>
                                    <p>{expareance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="about-right">
                                <div className="section-header">
                                    <span className="subtitle">{subTitle}</span>
                                    <h2 className="title">{title}</h2>
                                    <p>{desc}</p>
                                </div>
                                <div className="section-wrapper">
                                    <ul className="lab-ul">
                                        {aboutList.map((val, i) => (
                                            <li key={i}>
                                                <div className="sr-left">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                                <div className="sr-right">
                                                    <h5>{val.title}</h5>
                                                    <p>{val.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
          <About formDataState={formDataState} />
            <Student formDataState={formDataState} />
            <Achievement formDataState={formDataState} />
            <Blog formDataState={formDataState} />
            <Footer />
        </Fragment>
    );
}

export default AboutPage;
 