import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GetRequestApi, getRequestFunc } from "../../services/ApiRequests";

const title = "Course Categories";

const CourseSideCetagory = () => {
  const [cetogries, setCetogries] = useState([]);
  useEffect(() => {
    GetRequestApi("categories").then((response) => {
      setCetogries(response.data.data);
    });
  }, []);
  return (
    <div className="course-side-cetagory">
      <div className="csc-title">
        <h5 className="mb-0">{title}</h5>
      </div>
      <div className="csc-content">
        <div className="csdc-lists">
          <ul className="lab-ul">
            {cetogries &&
              cetogries.map((val, i) => (
                <li key={i}>
                  <Link to={`/course/${val.id}`}>
                    <div className="csdc-left">
                      <span>{val?.name?.en}</span>
                    </div>
                  </Link>
                  <div className="csdc-right">{val?.courseCount}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseSideCetagory;
