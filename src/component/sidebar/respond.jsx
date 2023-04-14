import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostRequestApi, postRequestFunc } from "../../services/ApiRequests";

import ReactStars from "react-rating-stars-component";

const btnText = "send comment";

const Respond = ({ id, reFetch }) => {

  const [title, settitle] = useState("");
  const [rating, setrating] = useState(0);

  const Navigate = useNavigate();

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setrating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      PostRequestApi("submit-review", {
        review: title,
        rating: rating,
        course_id: id,
      }).then((res) => {
        if (res.data.success === true) {
          setrating(0);
          settitle("");
          reFetch();
        }
      });
   
  };

  return (
    <>
      
        <div id="respond" className="comment-respond mb-lg-0">
          <div className="add-comment">
            <form className="comment-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <h4>Rating</h4>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  value={rating}
                  activeColor="#12a04a"
                />
              </div>
              <textarea
                rows="7"
                type="text"
                name="message"
                value={title}
                placeholder="Your Message"
                onChange={(e) => settitle(e.target.value)}
              ></textarea>
              <button className="lab-btn">
                <span>{btnText}</span>
              </button>
            </form>
          </div>
        </div>
    
    </>
  );
};

export default Respond;
