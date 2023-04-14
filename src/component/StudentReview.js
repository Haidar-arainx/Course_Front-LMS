import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Progress } from 'reactstrap';

const StudentReview = ({data ,course}) => {
  return (
    <div class="row mt-5">
    <h3 class="py-3">Student feedback </h3>
    <div className="col-md-3">
      <div class="average-rating  mb-sm-4  me-3">
        <div class="num">{course?.total_rating} </div>
        <div className=" d-flex  justify-content-center">
          <ReactStars
            count={5}
            edit={false}
            size={18}
            value={course?.total_rating}
            activeColor="#12a04a"
          />
        </div>
        <div class="title text-15px fw-700">
          {course?.reviews?.length} Reviews
        </div>
      </div>
    </div>
    <div className="col-md-9">
      <div class="individual-rating w-100">
        <ul className="d-block">
          {data &&
            data.map((r) => {
              return (
                <div className="row my-2" key={r.id}>
                  <div className="col-xxl-2  col-xl-3 col-3">
                    <ReactStars
                      count={5}
                      edit={false}
                      size={18}
                      value={r.id}
                      activeColor="#12a04a"
                    />
                  </div>
                  <div className="col-xl-8  col-xxl-9 col-8">
                    <div class="progress m-0 mt-1">
                      <Progress
                        value={r.value}
                        color="dark"
                        className="w-100"
                      />
                    </div>
                  </div>
                  <div class="col-1">({r.rating})</div>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  </div>
  )
}

export default StudentReview