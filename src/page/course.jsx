import { Component, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import GroupSelect from "../component/sidebar/group-select";
import Pagination from "../component/sidebar/pagination";
import Rating from "../component/sidebar/rating";
import { IMAGE_BASE_URL } from "../services/base_url";
import { DEFAULT_COURSE_IAMGE } from "../services/defaultValues";
import { GetRequestApi } from "../services/ApiRequests";

const CoursePage = () => {
  const [course, setCourse] = useState([]);

  const { id } = useParams();
  const allCourse = useSelector((state) => state.allCoursesList);
  const Settings = useSelector((state) => state.settinglist);

  useEffect(() => {
    setCourse(allCourse);
  }, [allCourse]);
  //paginatin
  const [pageNumber, setPageNumber] = useState(0);
  const [userPerPage, setUserPerPage] = useState(12);
  const pageVisited = pageNumber * userPerPage;

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Archives: Courses"} curPage={"Course Page"} />
      <GroupSelect setCourse={setCourse} course={allCourse} id={id} />
      <div className="course-section padding-tb section-bg">
        <div className="container">
          <div className="section-wrapper">
            <div className="course-showing-part">
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="course-showing-part-left">
                  <p>
                    Showing {pageVisited + 1} to{" "}
                    {course?.length > pageVisited + userPerPage
                      ? pageVisited + userPerPage
                      : course?.length}{" "}
                    of {course?.length} results
                  </p>
                </div>
               
              </div>
            </div>
            <div className="row g-4 justify-content-center row-cols-xl-3 row-cols-md-2 row-cols-1">
              {course &&
                course
                  .slice(pageVisited, pageVisited + userPerPage)
                  .map((val, i) => (
                    <div className="col" key={i}>
                      <div className="course-item">
                        <div className="course-inner">
                          <div className="course-thumb">
                            <img
                              src={
                                val?.image
                                  ? `${IMAGE_BASE_URL}/${val?.image}`
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
                                <span>
                                  &#163; {Number(val.price).toFixed(0)}{" "}
                                </span>
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
                                <sapn className="ca-name">
                                  {val?.user?.name}
                                </sapn>
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
            <Pagination
              users={course}
              setPageNumber={setPageNumber}
              usersPerPage={userPerPage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CoursePage;
