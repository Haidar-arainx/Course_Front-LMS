import { Component, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import GoogleMap from "../component/sidebar/googlemap";

const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send our Message";

const ContactPage = () => {
  const [formDataState, setFormDataState] = useState({});
  const Content = useSelector((state) => state.content);
  useEffect(() => {
    if (Content) {
      const result = Content.home_content;
      const atitle = result.find((f) => f.key == "contact_page_title");
      const astitle = result.find((f) => f.key == "contact_sub_title");
      const ades = result.find((f) => f.key == "contact_page_form_title");
      const aimage = result.find((f) => f.key == "contact_page_form_subtitle");
      const phone = result.find((f) => f.key == "contact_page_phone");
      const email = result.find((f) => f.key == "contact_page_mail_content");
      const address = result.find(
        (f) => f.key == "contact_page_address_content"
      );
      const ttitle3 = result.find((f) => f.key == "contact_page_map_content");
      const web = result.find((f) => f.key == 'contact_page_website_content');
      setFormDataState({
        ...formDataState,
        contact_page_title: atitle?.value?.en,
        contact_sub_title: astitle?.value?.en,
        about_image: aimage?.value?.en,
        contact_page_form_title: ades?.value?.en,
        contact_page_phone: phone?.value?.en,
        contact_page_mail_content: email?.value?.en,
        contact_page_address_content: address?.value?.en,
        contact_page_map_content: ttitle3?.value?.en,
        contact_page_website_content: web?.value?.en,
      });
    }
  }, [Content]);
  const contactList = [
    {
      imgUrl: "assets/images/icon/01.png",
      imgAlt: "contact icon",
      title: "Office Address",
      desc:formDataState?.contact_page_address_content,
    },
    {
      imgUrl: "assets/images/icon/02.png",
      imgAlt: "contact icon",
      title: "Phone number",
      desc: formDataState?.contact_page_phone,
    },
    {
      imgUrl: "assets/images/icon/03.png",
      imgAlt: "contact icon",
      title: "Send email",
      desc: formDataState?.contact_page_mail_content,
    },
    {
      imgUrl: "assets/images/icon/04.png",
      imgAlt: "contact icon",
      title: "Our website",
      desc: formDataState?.contact_page_website_content,
    },
  ];
  return (
    <Fragment>
      <Header />
      <PageHeader title={"Get In Touch With Us"} curPage={"Contact Us"} />
      <div className="map-address-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{formDataState?.contact_sub_title}</span>
            <h2 className="title">{formDataState?.contact_page_title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((val, i) => (
                    <div className="contact-item" key={i}>
                      <div className="contact-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{val.title}</h6>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-12">
                <GoogleMap src={formDataState?.contact_page_map_content}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{formDataState?.contact_page_form_subtitle}</span>
            <h2 className="title">{formDataState?.contact_page_form_title}</h2>
          </div>
          <div className="section-wrapper">
            <form className="contact-form">
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name *" />
              </div>
              <div className="form-group">
                <input type="text" name="email" placeholder="Your Email *" />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="number"
                  placeholder="Mobile Number *"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject *"
                />
              </div>
              <div className="form-group w-100">
                <textarea
                  rows="8"
                  type="text"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div className="form-group w-100 text-center">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ContactPage;
