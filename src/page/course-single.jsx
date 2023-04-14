import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AddQuestion from "../component/detilCourse/AddQuestion";
import CourseResorses from "../component/detilCourse/CourseResorses";
import InstructorDetail from "../component/detilCourse/InstructorDetail";
import QuestionList from "../component/detilCourse/QuestionList";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeaderTwo from "../component/layout/pageheader-2";
import Comment from "../component/sidebar/comment";
import CourseSideCetagory from "../component/sidebar/course-cetagory";
import CourseSideDetail from "../component/sidebar/course-detail";
import Respond from "../component/sidebar/respond";
import StudentReview from "../component/StudentReview";
import { GetRequestApiWithouttoken } from "../services/ApiRequests";
import { user } from "../services/defaultValues";

const CourseSingle = () => {
  const { id } = useParams();

  console.log("idddddd", id);

  const [course, setCourse] = useState([]);
  const [fatchAgain, setfatchAgain] = useState();
  const [subjectList, setSubjectList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [clessonList, setcLessonList] = useState([]);
  const [OneStar, setOneStar] = useState([]);
  const [TwoStar, setTwoStar] = useState([]);
  const [ThreeStar, setThreeStar] = useState([]);
  const [FourStar, setFourStar] = useState([]);
  const [FiveStar, setFiveStar] = useState([]);

  const reFetch = () => {
    setfatchAgain(!fatchAgain);
  };
  useEffect(() => {
    GetRequestApiWithouttoken(`get-course-details/${id}`).then((res) => {
      setCourse(res.data.data);
      setSubjectList(res?.data?.data?.chapters);
      setModuleList(res?.data?.data?.module);
      setLessonList(res?.data?.data?.lessons);
      setcLessonList(res?.data?.data?.clessons);
    });
  }, [fatchAgain]);

  const Mycourses = useSelector((state) => state.courseList);
  const exist =
    Mycourses.length > 0 && Mycourses.find((c) => c?.id === user?.id);

  useEffect(() => {
    const start_1 =
      course?.reviews && course?.reviews.filter((star) => star?.star == 1);
    setOneStar(start_1);
    const start_2 =
      course?.reviews && course?.reviews.filter((star) => star?.star == 2);
    setTwoStar(start_2);
    const start_3 =
      course?.reviews && course?.reviews.filter((star) => star?.star == 3);
    setThreeStar(start_3);
    const start_4 =
      course?.reviews && course?.reviews.filter((star) => star?.star == 4);
    setFourStar(start_4);
    const start_5 =
      course?.reviews && course?.reviews.filter((star) => star?.star == 5);
    setFiveStar(start_5);
  }, [course?.reviews]);

  //lesson data
  const data = [
    {
      id: 1,
      rating: OneStar?.length,
      value: 15,
    },
    {
      id: 2,
      rating: TwoStar?.length,
      value: 35,
    },
    {
      id: 3,
      rating: ThreeStar?.length,
      value: 55,
    },
    {
      id: 4,
      rating: FourStar?.length,
      value: 85,
    },
    {
      id: 5,
      rating: FiveStar?.length,
      value: 100,
    },
  ];
  return (
    <Fragment>
      <Header />
      <PageHeaderTwo singleCourse={course} />
      <div className="course-single-section padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="main-part">
                <div className="course-item">
                  <div className="course-inner">
                    <div className="course-content my-2">
                      <Link to="#">
                        <h3>Course Description</h3>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: course?.about?.en,
                        }}
                      />
                    </div>
                    <div className="course-content my-2">
                      <Link to="#">
                        <h3>Course Requirements</h3>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: course?.requirements?.en,
                        }}
                      />
                    </div>
                    <div className="course-content my-2">
                      <Link to="#">
                        <h3>Course Outcomes</h3>
                      </Link>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: course?.outcomes?.en,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="course-video">
                  <div className="box-footer no-padding bg-white">
                    <ul
                      className="nav nav-stacked fs-16"
                      id="pills-tab23"
                      role="tablist"
                    >
                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link active"
                          id="pills-curriculum-tab"
                          data-bs-toggle="pill"
                          href="#pills-curriculum"
                          role="tab"
                          aria-controls="pills-curriculum"
                          aria-selected="true"
                        >
                          Curriculum
                        </a>
                      </li>
                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link "
                          id="pills-instructor-tab"
                          data-bs-toggle="pill"
                          href="#pills-instructor"
                          role="tab"
                          aria-controls="pills-instructor"
                          aria-selected="false"
                        >
                          Instructor
                        </a>
                      </li>

                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link "
                          id="pills-reviews-tab"
                          data-bs-toggle="pill"
                          href="#pills-reviews"
                          role="tab"
                          aria-controls="pills-reviews"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </li>
                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link "
                          id="pills-qa-tab"
                          data-bs-toggle="pill"
                          href="#pills-qa"
                          role="tab"
                          aria-controls="pills-qa"
                          aria-selected="false"
                        >
                          QA
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent23">
                    <div
                      className="tab-pane fade active show"
                      id="pills-curriculum"
                      role="tabpanel"
                      aria-labelledby="pills-curriculum-tab"
                    >
                      <CourseResorses
                        lessonList={lessonList}
                        moduleList={moduleList}
                        subjectList={subjectList}
                        clessonList={clessonList}
                      />
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-instructor"
                      role="tabpanel"
                      aria-labelledby="pills-instructor-tab"
                    >
                      <InstructorDetail course={course} />
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-reviews"
                      role="tabpanel"
                      aria-labelledby="pills-reviews-tab"
                    >
                      <StudentReview data={data} course={course} />
                      {user?.role_id == 3 ? (
                        exist ? (
                          <Respond id={id} reFetch={reFetch} />
                        ) : null
                      ) : (
                        <h5>
                          <Link to="/login">Sign In</Link> or{" "}
                          <Link to="/signup">Sign Up</Link> as student to post a
                          review
                        </h5>
                      )}
                      <Comment id={id} course={course} reFetch={reFetch} />
                    </div>
                    <div
                      className="tab-pane fade "
                      id="pills-qa"
                      role="tabpanel"
                      aria-labelledby="pills-qa-tab"
                    >
                      <QuestionList
                        id={id}
                        course={course}
                        reFetch={reFetch}
                        exist={exist}
                      />
                      {exist ? (
                        <AddQuestion id={id} reFetch={reFetch} />
                      ) : (
                        <h5>
                          <Link to="/login">Sign In</Link> or{" "}
                          <Link to="/signup">Sign Up</Link> as student to post a
                          review
                        </h5>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-part">
                <CourseSideDetail singleCourse={course} />
                <CourseSideCetagory />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default CourseSingle;
