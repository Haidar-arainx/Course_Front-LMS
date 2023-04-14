import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetRequestApi, getRequestFunc } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DEFAULT_COURSE_IAMGE } from "../../services/defaultValues";
const subTitle = "Popular Category";
const title = "Popular Category For Learn";
const btnText = "Browse All Categories";

// const categoryList = [
//   {
//     imgUrl: "assets/images/category/icon/01.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Computer Science",
//     count: "24 Course",
//   },
//   {
//     imgUrl: "assets/images/category/icon/02.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Civil Engineering",
//     count: "04 Course",
//   },
//   {
//     imgUrl: "assets/images/category/icon/03.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Business Analysis",
//     count: "27 Course",
//   },
//   {
//     imgUrl: "assets/images/category/icon/04.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Data Science Analytics",
//     count: "28 Course",
//   },
//   {
//     imgUrl: "assets/images/category/icon/05.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Learning Management",
//     count: "78 Course",
//   },
//   {
//     imgUrl: "assets/images/category/icon/06.jpg",
//     imgAlt: "category rajibraj91 rajibraj",
//     title: "Computer Engineering",
//     count: "38 Course",
//   },
// ];

const Category = ({formDataState}) => {
  const [cetogries, setCetogries] = useState([]);
  useEffect(() => {
    GetRequestApi("categories").then((response) => {
      setCetogries(response.data.data);
    });
  }, []);
  return (
    <div className="category-section padding-tb">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{formDataState?.category_sub_title}</span>
          <h2 className="title">{formDataState?.category_title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-2 justify-content-center row-cols-xl-6 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {cetogries &&
              cetogries.map((val, i) => (
                <div className="col" key={i}>
                  <div className="category-item text-center">
                    <div className="category-inner">
                      <div className="category-thumb">
                        <img
                          src={
                            val.image === "undefined"
                              ? `${IMAGE_BASE_URL}${val?.image}`
                              : `${DEFAULT_COURSE_IAMGE}`
                          }
                          alt={val?.image}
                        />
                      </div>
                      <div className="category-content">
                        <Link to={`/course/${val.id}`}>
                          <h6>{val?.name?.en}</h6>
                        </Link>
                        <span>{val?.courseCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/course" className="lab-btn">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
