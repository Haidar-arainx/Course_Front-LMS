import moment from "moment/moment";
import ReactStars from "react-rating-stars-component";
import { PostRequestApi } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DefaultImage, user } from "../../services/defaultValues";

const Comment = ({ course, reFetch }) => {
  const handleDelete = (id) => {
    PostRequestApi("delete-course-review", { id }).then((res) => {
      if (res.data.success == true) {
        reFetch();
      }
    });
  };
  return (
    <div className="comments">
      <h4 className="title-border">{course?.reviews?.length} Review</h4>
      <ul className="comment-list">
        {course?.reviews &&
          course?.reviews.map((val, i) => (
            <li className="comment position-relative" key={i}>
              {val?.userId == user?.id && (
                <div className="position-absolute bboy">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="com-thumb">
                <img
                  src={`${IMAGE_BASE_URL}${val?.userImage}` || DefaultImage}
                  alt={`${val.imgAlt}`}
                />
              </div>
              <div className="com-content">
                <div className="com-title">
                  <div className="com-title-meta p-0">
                    <h6>{val?.userName}</h6>

                    <div className="d-flex mt-1">
                      <ReactStars
                        value={val.star}
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#12a04a"
                      />
                      <span className="ms-3">
                        {" "}
                        {moment(val.created_at).fromNow(true)} ago{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <p>{val.comment}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Comment;
