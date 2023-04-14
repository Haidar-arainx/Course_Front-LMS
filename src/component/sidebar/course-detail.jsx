import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddAction, GetCart } from "../../redux/actions";
import { GetRequestApi, PostRequestApi } from "../../services/ApiRequests";
import { user } from "../../services/defaultValues";

// import NotificationManager from "../NotificationManager";

const excenge = "Limited time offer";
const paymentTitle = "Secure Payment:";
const btnText = "Enrolled Now";

const CourseSideDetail = ({ singleCourse, quiz }) => {
  const data = useSelector((state) => state.courseList);
  const quizDat = [
    {
      iconName: "icofont-ui-alarm",
      leftText: "Course level",
      rightText: singleCourse?.course_level?.title?.en,
    },
    {
      iconName: "icofont-signal",
      leftText: "Question",
      rightText: singleCourse?.quizcount,
    },
    {
      iconName: "icofont-users-social",
      leftText: "Students",
      rightText: singleCourse?.enrollCount,
    },
    {
      iconName: "icofont-globe",
      leftText: "Language",
      rightText: "English",
    },
  ];
  const csdcList = [
    {
      iconName: "icofont-ui-alarm",
      leftText: "Course level",
      rightText: singleCourse?.course_level?.title?.en,
    },
    // {
    //   iconName: "icofont-book-alt",
    //   leftText: "Course Privacy",
    //   rightText: singleCourse?.course_privacy,
    // },
    // {
    //   iconName: "icofont-hour-glass",
    //   leftText: "Featured Courses ",
    //   rightText: singleCourse?.featured_course === 1 ? "Yes" : "False",
    // },
    // {
    //   iconName: "icofont-signal",
    //   leftText: "Course Status",
    //   rightText: singleCourse?.status,
    // },
    {
      iconName: "icofont-video-alt",
      leftText: "Subject",
      rightText: singleCourse?.chapters?.length,
    },
    {
      iconName: "icofont-video-alt",
      leftText: "Module",
      rightText: singleCourse?.lessons?.length,
    },
    {
      iconName: "icofont-video-alt",
      leftText: "Lessions",
      rightText: singleCourse?.lessons?.length,
    },
    // {
    //   iconName: "icofont-abacus-alt",
    //   leftText: "Quizzes",
    //   rightText: singleCourse?.quizcount,
    // },

    {
      iconName: "icofont-users-social",
      leftText: "Students",
      rightText: singleCourse?.enrollCount,
    },
    {
      iconName: "icofont-globe",
      leftText: "Language",
      rightText: "English",
    },
  ];
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const Settings = useSelector((state) => state.settinglist);
  const ADDTOCART = (d) => {
    if (d?.price == 0) {
      PostRequestApi("enroll-iap", {
        id: d?.id,
      })
        .then((res) => {
          if (res.data.success == true) {
            NotificationManager.success(
              res?.data?.message,
              "Course!",
              3000,
              null,
              null,
              ""
            );
            dispatch(GetCart());
          } else {
            NotificationManager.error(
              `${res?.data?.message}`,
              "Course!",
              3000,
              null,
              null,
              ""
            );
          }
        })
        .catch((err) => {
          NotificationManager.error(
            `${err.response.data.message}`,
            "Course!",
            3000,
            null,
            null,
            ""
          );
        });
    } else {
      GetRequestApi(`add-to-cart/${d.id}`)
        .then((res) => {
          if (res.data.success == true) {
            NotificationManager.success(
              "Add To Baskit successfully",
              "Course!",
              3000,
              null,
              null,
              ""
            );
            dispatch(GetCart());
          } else {
            NotificationManager.error(
              `${res?.data?.message}`,
              "Course!",
              3000,
              null,
              null,
              ""
            );
          }
        })
        .catch((err) => {
          NotificationManager.error(
            `${err.response.data.message}`,
            "Course!",
            3000,
            null,
            null,
            ""
          );
        });
    }
  };
  const exist = data && data?.find((r) => r.id == singleCourse?.id);

  return (
    <div className="course-side-detail">
      <div className="csd-title">
        <div className="csdt-left">
          <h4 className="mb-0">
            <sup>
              {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
              &#163;
            </sup>
            {singleCourse?.price}
          </h4>
        </div>
        <div className="csdt-right">
          <p className="mb-0">
            <i className="icofont-clock-time"></i>
            {excenge}
          </p>
        </div>
      </div>
      <div className="csd-content">
        <div className="csdc-lists">
          <ul className="lab-ul">
            {quiz
              ? quizDat.map((val, i) => (
                  <li key={i}>
                    <div className="csdc-left">
                      <i className={val.iconName}></i>
                      {val.leftText}
                    </div>
                    <div className="csdc-right">{val.rightText}</div>
                  </li>
                ))
              : csdcList.map((val, i) => (
                  <li key={i}>
                    <div className="csdc-left">
                      <i className={val.iconName}></i>
                      {val.leftText}
                    </div>
                    <div className="csdc-right">{val.rightText}</div>
                  </li>
                ))}
          </ul>
        </div>
        <div className="sidebar-payment">
          <div className="sp-title">
            <h6>{paymentTitle}</h6>
          </div>
          <div className="sp-thumb">
            <img src="assets/images/pyment/01.jpg" alt="CodexCoder" />
          </div>
        </div>
      
        {user?.id ? 
         exist || user?.role_id == 1 ? (
          <div className="course-enroll">
            <a href={`https://coursebackend.dhikrfikr.com/app/studentcourses/physicalcourse/${singleCourse.id}`}>
            <button className="lab-btn">
              <span>Continue Watch</span>
            </button>
            </a>
          </div>
        ) : (
          <div className="course-enroll">
            <button className="lab-btn" onClick={() => ADDTOCART(singleCourse)}>
              <span>{btnText}</span>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <div className="course-enroll">
              <button className="lab-btn">
                <span>{btnText}</span>
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseSideDetail;
