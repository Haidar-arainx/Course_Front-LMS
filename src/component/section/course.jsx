import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetAllCoursesAction } from "../../redux/actions";
import { getRequestFunc } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DEFAULT_COURSE_IAMGE } from "../../services/defaultValues";
import Rating from "../sidebar/rating";

const subTitle = "Featured Courses";
const title = "Pick A Course To Get Started";
const btnText = "Browse All Courses";
const Course = ({ formDataState }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllCoursesAction());
  }, []);
  const course = useSelector((state) => state.allCoursesList);
  const Settings = useSelector((state) => state.settinglist);

  return (
    <div className="course-section padding-tb section-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{formDataState?.course_sub_title}</span>
          <h2 className="title">{formDataState?.course_title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
            {course &&
              course.slice(0, 12).map((val, i) => (
                <div className="col" key={i}>
                  {console.log("valval", `${IMAGE_BASE_URL}/${val?.user?.image}` , val?.user)}
                  <div className="course-item">
                    <div className="course-inner">
                      <div className="course-thumb">
                        <img
                          src={
                            val?.image
                              ? `${IMAGE_BASE_URL}${val?.image}`
                              : DEFAULT_COURSE_IAMGE
                          }
                          alt={`${val.image}`}
                        />
                      </div>
                      <div className="course-content">
                        <div className="course-price">
                          {/* {Settings?.system_default_currency_symbol || &#163;}*/}
                          {val.price == 0 ? (
                            "Free"
                          ) : (
                            <span>&#163; {Number(val.price).toFixed(0)} </span>
                          )}
                        </div>
                        <div className="course-category">
                          <div className="course-cate">
                            <a href="#">{val?.category?.name?.en}</a>
                          </div>
                          <div className="course-reiew">
                            <Rating rat={val.total_rating} />
                            <span className="ratting-count">
                              {val.total_rating}
                            </span>
                          </div>
                        </div>
                        <Link to={`/course-single/${val.id}`}>
                          <h5>{val?.title?.en}</h5>
                        </Link>
                        <div className="course-details">
                          <div className="couse-count">
                            <i className="icofont-users-social"></i>{" "}
                            {val.enrollCount} x Students
                          </div>
                          <div className="couse-topic">
                            <i className="icofont-signal"></i>
                            {val?.mode_of_delivery == 1
                              ? "Online"
                              : val?.mode_of_delivery == 2
                              ? "Distance Learning"
                              : "Face to Face"}
                          </div>
                        </div>
                        <div className="course-footer">
                          <div className="course-author">
                            <div className="teacher_image">
                              <img
                                src={
                                  val?.image
                                    ? `${IMAGE_BASE_URL}/${val?.user?.image}`
                                    : DEFAULT_COURSE_IAMGE
                                }
                                alt="image"
                              />
                            </div>
                            <sapn className="ca-name">{val?.user?.name}</sapn>
                          </div>
                          <div className="course-btn">
                            <Link
                              to={`/course-single/${val.id}`}
                              className="lab-btn-text"
                            >
                              Detail
                              <i className="icofont-external-link"></i>
                            </Link>
                          </div>
                        </div>
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

export default Course;
