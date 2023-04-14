import moment from "moment/moment";
import { useState } from "react";
import { PostRequestApi } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DefaultImage, user } from "../../services/defaultValues";
import AddQuestion from "./AddQuestion";

const QuestionList = ({ id, course, reFetch, exist }) => {

  const [showReply, setShowReply] = useState({});
  const handleDelete = (name, id) => {
    PostRequestApi(name, { id }).then((res) => {
      if (res.data.success == true) {
        reFetch();
      }
    });
  };
  return (
    <div className="comments">
      <ul className="comment-list w-100 ">
        {course?.comments &&
          course?.comments.map((val, i) => (
            <>
              <li className="comment position-relative" key={i}>
                <div className="position-absolute bboy">
                  {exist ? (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        setShowReply({ [val?.id]: !showReply[val?.id] })
                      }
                    >
                      Reply
                    </button>
                  ) : null}
                  {val?.user?.id == user?.id && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete("delete-comment", val?.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="com-thumb">
                  <img
                    src={`${IMAGE_BASE_URL}${val?.user?.image}` || DefaultImage}
                    alt={`${val.imgAlt}`}
                  />
                </div>
                <div className="com-content ">
                  <div className="com-title" style={{ whiteSapce: "nowrap" }}>
                    <div className="com-title-meta p-0 ">
                      <h6>{val?.user?.name}</h6>
                      <span> {moment(val.created_at).fromNow(true)} ago </span>
                    </div>
                  </div>
                  <p>{val.comment}</p>
                </div>
                </li>
                {showReply[val?.id] && (
                  <AddQuestion cid={val?.id} id={id} reFetch={reFetch} />
                )}
                <ul>
                  {val?.replies?.length > 0 &&
                    val?.replies.map((com, i) => {
                      return (
                        <li className="comment position-relative mx-2" key={i}>
                          <div className="position-absolute bboy">
                            {com?.user?.id == user?.id && (
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  handleDelete("delete-comment-reply", com.id)
                                }
                              >
                                Delete
                              </button>
                            )}
                          </div>

                          <div className="com-thumb">
                            <img
                              src={
                                `${IMAGE_BASE_URL}${com?.user?.image}` ||
                                DefaultImage
                              }
                              alt={`${com.imgAlt}`}
                            />
                          </div>
                          <div className="com-content ">
                            <div
                              className="com-title"
                              style={{ whiteSapce: "nowrap" }}
                            >
                              <div className="com-title-meta p-0 ">
                                <h6>{com?.user?.name}</h6>
                                <span>
                                  {" "}
                                  {moment(com.created_at).fromNow(
                                    true
                                  )} ago{" "}
                                </span>
                              </div>
                            </div>
                            <p>{val.comment}</p>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              
            </>
          ))}
      </ul>
    </div>
  );
};

export default QuestionList;
