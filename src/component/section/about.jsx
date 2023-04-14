import { IMAGE_BASE_URL } from "../../services/base_url";

const About = ({ formDataState }) => {
  const aboutList = [
    {
      imgUrl: formDataState?.about_icon1,
      imgAlt: "",
      title: formDataState?.about_thumbnail_title1,
      desc: formDataState?.about_thumbnail_subtitle1,
    },
    {
      imgUrl: formDataState?.about_icon2,
      imgAlt: "",
      title: formDataState?.about_thumbnail_title2,
      desc: formDataState?.about_thumbnail_subtitle2,
    },
    {
      imgUrl: formDataState?.about_icon3,
      imgAlt: "",
      title: formDataState?.about_thumbnail_title3,
      desc: formDataState?.about_thumbnail_subtitle3,
    },
  ];
  return (
    <div className="about-section">
      <div className="container">
        <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-end flex-row-reverse">
          <div className="col">
            <div className="about-right padding-tb">
              <div className="section-header">
                <span className="subtitle">
                  {formDataState?.about_page_title}
                </span>
                <h2 className="title">{formDataState?.about_page_title}</h2>
                <p>{formDataState?.about_description}</p>
              </div>
              <div className="section-wrapper">
                <ul className="lab-ul">
                  {aboutList.map((val, i) => (
                    <li key={i}>
                      <div className="sr-left">
                        <img
                          src={`${IMAGE_BASE_URL}/${val.imgUrl}`}
                          alt={`${val.imgAlt}`}
                        />
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
          <div className="col">
            <div className="about-left">
              <div className="about-thumb">
                <img
                  src={`${IMAGE_BASE_URL}/${formDataState?.about_image}`}
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
