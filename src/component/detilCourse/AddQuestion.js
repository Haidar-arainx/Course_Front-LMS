import { useState } from "react";
import { PostRequestApi } from "../../services/ApiRequests";
const btnText = "send comment";

const AddQuestion = ({ id, reFetch, cid }) => {
  const [title, settitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cid) {
      PostRequestApi("comment-reply", {
        reply: title,
        comment_id: cid,
      }).then((res) => {
        if (res.data.success === true) {
          settitle("");
          reFetch();
        }
      });
    } else {
      PostRequestApi("comment", {
        comment: title,
        course_id: id,
      }).then((res) => {
        if (res.data.success === true) {
          settitle("");
          reFetch();
        }
      });
    }
  };

  return (
    <>
      <div id="respond" className="comment-respond mb-lg-0">
        <div className="add-comment">
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <h4>Ask A Question</h4>
            </div>
            <br />
            <input
              type="text"
              name="message"
              value={title}
              placeholder="Your Message"
              onChange={(e) => settitle(e.target.value)}
            />
            <button className="lab-btn">
              <span>{btnText}</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;
