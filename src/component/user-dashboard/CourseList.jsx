import React from "react";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../services/base_url";
import { DEFAULT_COURSE_IAMGE } from "../../services/defaultValues";

const CourseList = () => {
  const data = useSelector((state) => state.courseList);
  const Settings = useSelector((state) => state.settinglist);
  const cetogriesList = useSelector((state) => state.catList);
  const CategoryName = (id) => {
    const catName = cetogriesList.find((f) => f.id == id);
    return catName?.name?.en;
  };
  return (
    <div className="table-responsive">
      <table className="table no-border">
        <thead>
          <tr className="text-uppercase bg-lightest">
            <th>
              <span className="text-dark">Coursed</span>
            </th>
            <th>
              <span className="text-fade">Category</span>
            </th>
            <th>
              <span className="text-fade">Price</span>
            </th>
            <th className="text-end">
              <span className="text-fade ">action</span>
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((r) => {
              return (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="course-img-div flex-shrink-0 me-20">
                        <img
                          src={
                            r.image
                              ? `${IMAGE_BASE_URL}/${r.image} `
                              : DEFAULT_COURSE_IAMGE
                          }
                          alt=""
                        />
                      </div>

                      <div>
                        <a
                          href="#"
                          className="text-dark fw-600 hover-primary mb-1 fs-16"
                        >
                          {r?.title?.en}
                        </a>
                        <span className="text-fade d-block">
                          {r?.user?.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td> {CategoryName(r.category_id)}</td>
                  <td>
                    {/* {Settings?.system_default_currency_symbol} */}

                    {r.price < 1 ? "Free" : <>&#163; {r.price}</>}
                  </td>
                  <td className="text-end">
                    <a
                      href={`https://coursebackend.dhikrfikr.com/app/studentcourses/physicalcourse/${r.id}`}
                    >
                      <button className="btn btn-primary">detail</button>
                    </a>
                  </td>

                  {/*                 
                  <td>
                    <div className="d-flex justify-content-end gap-items-1">
                      <a
                        href="#"
                        className="waves-effect waves-light btn btn-primary btn-xs btn-circle"
                      >
                        <span className="icon-Bookmark"></span>
                      </a>
                      <a
                        href="#"
                        className="waves-effect waves-light btn btn-primary btn-xs btn-circle"
                      >
                        <span className="icon-Arrow-right">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </span>
                      </a>
                    </div>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
