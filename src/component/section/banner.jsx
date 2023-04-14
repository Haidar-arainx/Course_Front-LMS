import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/banner/Image-2.webp";
import { GetRequestApi } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";
const subTitle = "Online education";
const title = (
  <h2 className="title">
    <span className="d-lg-block">Learn The</span> Skills You Need{" "}
    <span className="d-lg-block">To Succeed</span>
  </h2>
);
const desc =
  "Free online courses from the world’s Leading experts. join 18+ million Learners today.";

const shapeList = [
  {
    name: "16M Students Happy",
    link: "#",
    className: "ccl-shape shape-1",
  },
  {
    name: "130K+ Total Courses",
    link: "#",
    className: "ccl-shape shape-2",
  },
  {
    name: "89% Successful Students",
    link: "#",
    className: "ccl-shape shape-3",
  },
  {
    name: "23M+ Learners",
    link: "#",
    className: "ccl-shape shape-4",
  },
  {
    name: "36+ Languages",
    link: "#",
    className: "ccl-shape shape-5",
  },
];

const Banner = ({formDataState}) => {
  const [catList, setCatList] = useState();
  useEffect(() => {
    GetRequestApi("top-categories").then((res) => setCatList(res.data.data));
  }, []);

  return (
    <section className="banner-section">
      <div className="container">
        <div className="section-wrapper">
          <div className="row align-items-center">
            <div className="col-xxl-5 col-xl-6 col-lg-10">
              <div className="banner-content">
                <h6 className="subtitle text-uppercase fw-medium">
               {formDataState?.slider_title}
                </h6>
                <h2 className="title">  {formDataState?.slider_text} </h2>
                <p className="desc"> {formDataState?.slider_sub_text}</p>
                <form action="/">
                  <div className="banner-icon">
                    <i className="icofont-search"></i>
                  </div>
                  <input type="text" placeholder="Keywords of your course" />
                  <button type="submit">Search Course</button>
                </form>
                <div className="banner-catagory d-flex flex-wrap">
                  <p>Most Popular : </p>
                  <ul className="lab-ul d-flex flex-wrap">
                    {catList &&
                      catList.slice(0, 5).map((val, i) => (
                        <li key={i}>
                          <Link to={`/course/${val.id}`}>{val?.name?.en}</Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-6">
              <div className="banner-thumb">
                <img src={`${IMAGE_BASE_URL}/${formDataState?.slider_image}`} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="all-shapes"></div>
      <div className="cbs-content-list d-none">
        <ul className="lab-ul">
          {shapeList.map((val, i) => (
            <li className={val.className} key={i}>
              <a href={val.link}>{val.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Banner;
