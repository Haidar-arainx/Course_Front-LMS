import React from "react";
import { IMAGE_BASE_URL } from "../../services/base_url";

const InstructorDetail = ({course}) => {
  return (
    <div class="instractor_details_inner my-5">
      <div class="thumb">
        <img
          class="w-100"
          src={`${IMAGE_BASE_URL}${course?.user?.image}`}
          alt=""
        />
      </div>
      <div class="instractor_details_info">
        <a href="https://course.dhikrfikr.com/instructorDetails/1/Super%20admin">
          <h4 class="font_22 f_w_700">{course?.user?.name}</h4>
        </a>
        <h5> {course?.user?.email}</h5>
        <div class="ins_details">
          <p>
          {course?.user?.short_details}
        
          </p>
        </div>
        {/* <div class="intractor_qualification">
          <div class="single_qualification">
            <i class="ti-star"></i> 5 Rating
          </div>
          <div class="single_qualification">
            <i class="ti-comments"></i> 1 Reviews
          </div>
          <div class="single_qualification">
            <i class="ti-user"></i> 1 Students
          </div>
          <div class="single_qualification">
            <i class="ti-layout-media-center-alt"></i> 2 Courses
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default InstructorDetail;
