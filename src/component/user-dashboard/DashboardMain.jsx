import React from "react";

import courseImg from "../../assets/images/banner/01.png";
import bgImg from "../../assets/images/author/bgimg.jpg";
import { LogoutAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../services/defaultValues";
import ProfileUpdate from "./ProfileUpdate";
import PaymentList from "./PaymentList";
import CourseList from "./CourseList";
import ChangePassword from "./ChangePassword";
import { IMAGE_BASE_URL } from "../../services/base_url";

const DashboardMain = () => {
  const dispatch = useDispatch();
  const Settings = useSelector((state) => state.settinglist);
  return (
    <div
      className="container-fluid"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <section className="bg-img pt-150 pb-20" dataOverlay="7">
        <div className="container d-none">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="page-title text-white">My Dashboard</h2>
                <ol className="breadcrumb bg-transparent justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-white-50">
                      <i className="mdi mdi-home-outline"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    My Dashboard
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12">
              <div className="position-sticky t-100">
                <div className="box box-widget widget-user-2">
                  <div className="widget-user-header bg-secondary-light">
                    <div className="widget-user-image">
                      <img
                        className="rounded-circle "
                        src={`${IMAGE_BASE_URL}/${user?.image}`}
                        alt="User Avatar"
                      />
                    </div>
                    <h3 className="widget-user-username">{user.name}</h3>
                    <h6 className="widget-user-desc">Active</h6>
                  </div>
                  <div className="box-footer no-padding">
                    <ul
                      className="nav d-block nav-stacked fs-16"
                      id="pills-tab23"
                      role="tablist"
                    >
                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link active"
                          id="pills-edit-tab"
                          data-bs-toggle="pill"
                          href="#pills-edit"
                          role="tab"
                          aria-controls="pills-edit"
                          aria-selected="true"
                        >
                          <span className="me-10 icon-Edit">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </span>
                          Edit Profile
                        </a>
                      </li>
                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link"
                          id="pills-courses-tab"
                          data-bs-toggle="pill"
                          href="#pills-courses"
                          role="tab"
                          aria-controls="pills-courses"
                          aria-selected="false"
                        >
                          <span className="me-10 icon-Book-open">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </span>
                          My Courses
                        </a>
                      </li>

                      <li className="nav-item bb-1">
                        <a
                          className="py-10 nav-link"
                          id="pills-payments-tab"
                          data-bs-toggle="pill"
                          href="#pills-payments"
                          role="tab"
                          aria-controls="pills-payments"
                          aria-selected="false"
                        >
                          <span className="me-10 icon-Money">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </span>
                          Payments
                        </a>
                      </li>

                      <li
                        className="nav-item"
                        onClick={() => {
                          dispatch(LogoutAction());
                          window.location.href = "/";
                        }}
                      >
                        <a className="py-10 nav-link" href="#">
                          <span className="me-10 icon-Unlock"></span>Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="p-15 bt-1 bb-1">
                    <div className="row"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-8 col-12 dashboard-contents">
              <div className="box">
                <div className="box-body">
                  <div className="tab-content" id="pills-tabContent23">
                    <div
                      className="tab-pane fade active show"
                      id="pills-edit"
                      role="tabpanel"
                      aria-labelledby="pills-edit-tab"
                    >
                      <div className="row">
                        <div className="col-12">
                          <ProfileUpdate />
                          <ChangePassword />
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-courses"
                      role="tabpanel"
                      aria-labelledby="pills-courses-tab"
                    >
                      <h4 className="box-title mb-0">My Courses</h4>
                      <hr />
                      <CourseList />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-favorite"
                      role="tabpanel"
                      aria-labelledby="pills-favorite-tab"
                    >
                      <div className="row">
                        <div className="col-12">
                          <h4 className="box-title mb-0">
                            My Favorite Courses
                          </h4>
                          <hr />
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="card">
                            <div className="course-img-wrapper">
                              <img
                                // className="card-img-top"
                                src={courseImg}
                                // alt="Card image cap"
                                style={{ heigth: "140px", width: "auto" }}
                              />
                            </div>
                            <div className="card-body">
                              <span className="badge badge-success">
                                Online
                              </span>
                              <span className="badge badge-primary-light">
                                English
                              </span>
                              <span className="badge badge-primary-light">
                                Spanish
                              </span>
                              <div className="cour-stac d-flex align-items-center text-fade mt-20">
                                <p>Start Date 4th Nov..</p>
                                <p className="lt-sp">|</p>
                                <p>Johen doe</p>
                              </div>
                              <h4 className="card-title justify-content-between d-flex align-items-center">
                                Manegement
                              </h4>
                              <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                              </p>
                            </div>
                            <div className="card-footer justify-content-between d-flex align-items-center">
                              <div className="d-flex fs-18 fw-600">
                                {" "}
                                <span className="text-dark me-10">
                                  {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                                  &#163; 83
                                </span>{" "}
                                <del className="text-muted">
                                  {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                                  &#163; 195
                                </del>{" "}
                              </div>
                              <span>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star-half text-warning"></i>
                                <span className="text-muted ms-2">(42)</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-12">
                          <div className="card">
                            <div className="course-img-wrapper">
                              <img
                                // className="card-img-top"
                                src={courseImg}
                                // alt="Card image cap"
                                style={{ heigth: "140px", width: "auto" }}
                              />
                            </div>
                            <div className="card-body">
                              <span className="badge badge-success">
                                Online
                              </span>
                              <span className="badge badge-primary-light">
                                English
                              </span>
                              <span className="badge badge-primary-light">
                                Spanish
                              </span>
                              <div className="cour-stac d-flex align-items-center text-fade mt-20">
                                <p>Start Date 4th Nov..</p>
                                <p className="lt-sp">|</p>
                                <p>Johen doe</p>
                              </div>
                              <h4 className="card-title justify-content-between d-flex align-items-center">
                                Manegement
                              </h4>
                              <p className="card-text">
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content. This
                                content is a little bit longer.
                              </p>
                            </div>
                            <div className="card-footer justify-content-between d-flex align-items-center">
                              <div className="d-flex fs-18 fw-600">
                                {" "}
                                <span className="text-dark me-10">
                                  {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                                  &#163; 83
                                </span>{" "}
                                <del className="text-muted">
                                  {/* {Settings?.system_default_currency_symbol || "&#163;"} */}
                                  195
                                </del>
                              </div>
                              <span>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star text-warning"></i>
                                <i className="fa fa-star-half text-warning"></i>
                                <span className="text-muted ms-2">(42)</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="pills-payments"
                      role="tabpanel"
                      aria-labelledby="pills-payments-tab"
                    >
                      <h4 className="box-title mb-0">Payment Method</h4>
                      <hr />

                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item me-3">
                          <a
                            className="payment-nav-link active"
                            data-bs-toggle="tab"
                            href="#debit-card"
                            role="tab"
                          >
                            <span className="hidden-sm-up">
                              <i className="fa fa-cc"></i>
                            </span>
                            <span className="hidden-xs-down">Debit Card</span>
                          </a>{" "}
                        </li>
                        <li className="nav-item">
                          {" "}
                          <a
                            className="payment-nav-link"
                            data-bs-toggle="tab"
                            href="#paypal"
                            role="tab"
                          >
                            <span className="hidden-sm-up">
                              <i className="fa fa-paypal"></i>
                            </span>{" "}
                            <span className="hidden-xs-down">Paypal</span>
                          </a>{" "}
                        </li>
                      </ul>

                      <div className="tab-content tabcontent-border">
                        <div
                          className="tab-pane active"
                          id="debit-card"
                          role="tabpanel"
                        >
                          <div className="p-30">
                            <div className="row">
                              <div className="col-lg-7 col-md-6 col-12">
                                <form>
                                  <div className="form-group">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      CARD NUMBER
                                    </label>
                                    <div className="input-group">
                                      <div className="input-group-addon">
                                        <i className="fa fa-credit-card"></i>
                                      </div>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputuname"
                                        placeholder="Card Number"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-7">
                                      <div className="form-group">
                                        <label className="form-label">
                                          EXPIRATION DATE
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="Expiry"
                                          placeholder="MM / YY"
                                          required=""
                                        />
                                      </div>
                                    </div>
                                    <div className="col-5 pull-right">
                                      <div className="form-group">
                                        <label className="form-label">
                                          CV CODE
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="CVC"
                                          placeholder="CVC"
                                          required=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-12">
                                      <div className="form-group">
                                        <label className="form-label">
                                          NAME OF CARD
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="nameCard"
                                          placeholder="NAME AND SURNAME"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    className="btn btn-primary"
                                    style={{ color: "white" }}
                                  >
                                    Make Payment
                                  </button>
                                </form>
                              </div>
                              <div className="col-lg-5 col-md-6 col-12">
                                <h3 className="box-title mt-10">
                                  General Info
                                </h3>
                                <h2>
                                  <i className="fa fa-cc-visa text-info"></i>
                                  <i className="fa fa-cc-mastercard text-danger"></i>
                                  <i className="fa fa-cc-discover text-success"></i>
                                  <i className="fa fa-cc-amex text-warning"></i>
                                </h2>
                                <p>
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text. It has roots in a piece of
                                  classical Latin literature from 45 BC, making
                                  it over 2000 years old. Richard McClintock.
                                </p>
                                <p>
                                  It is a long established fact that a reader
                                  will be distracted by the readable content of
                                  a page when looking at its layout.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="paypal" role="tabpanel">
                          <div className="p-30">
                            You can pay your money through paypal, for more info{" "}
                            <a href="">click here</a>
                            <br />
                            <br />
                            <button
                              className="btn btn-primary"
                              style={{ color: "white" }}
                            >
                              <i className="fa fa-cc-paypal"></i> Pay with
                              Paypal
                            </button>
                          </div>
                        </div>
                      </div>
                      <PaymentList />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardMain;
