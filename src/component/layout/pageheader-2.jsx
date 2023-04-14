import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DEFAULT_COURSE_IAMGE } from "../../services/defaultValues";
import Rating from "../sidebar/rating";

const title = "Advanced Adobe Photoshop For Everyone";
const desc =
  "The most impressive is collection of share me online college courses";

const PageHeaderTwo = ({ singleCourse }) => {
  const cetogriesList = useSelector((state) => state.catList);
  const catName = cetogriesList.find((f) => f.id == singleCourse?.category_id);
  console.log("catName", catName);
  const categoryList = [
    {
      link: "#",
      text: catName?.name?.en,
      className: "course-cate",
    },
  ];
  const comments = useSelector((state) => state.commentList);

  return (
    <div className="pageheader-section style-2">
      <div className="container">
        <div className="row justify-content-center justify-content-lg-between align-items-center flex-row-reverse">
          <div className="col-lg-7 col-12">
            <div className="pageheader-thumb">
              <img
                src={
                  singleCourse?.image
                    ? `${IMAGE_BASE_URL}${singleCourse?.image}`
                    : DEFAULT_COURSE_IAMGE
                }
                alt="image Loading ..."
                className="w-100"
              />
              {/* <a href="#" className="video-button popup" target="_blank"><i className="icofont-ui-play"></i></a> */}
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <div className="pageheader-content">
              <div className="course-category">
                {categoryList.map((val, i) => (
                  <a href={val.link} className={val.className} key={i}>
                    {val.text}
                  </a>
                ))}
              </div>
              <h2 className="phs-title">{singleCourse?.title?.en}</h2>
              {/* <p
                className="phs-desc"
                dangerouslySetInnerHTML={{
                  __html: singleCourse?.short_description,
                }}
              /> */}
              <div className="phs-thumb">
                <img
                  src={
                    singleCourse?.user?.image
                      ? `${IMAGE_BASE_URL}${singleCourse?.user?.image}`
                      : DEFAULT_COURSE_IAMGE
                  }
                  alt="image Loading ..."
                />
                <span>{singleCourse?.user?.name}</span>
                <div className="course-reiew d-flex">
                  <ReactStars
                    value={singleCourse?.total_rating}
                    count={5}
                    size={20}
                    activeColor="#12a04a"
                    edit={false}
                  />
                  <span className="ratting-count">
                    {singleCourse?.reviews?.length} reviews
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeaderTwo;
