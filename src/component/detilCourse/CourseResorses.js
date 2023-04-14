import React from "react";
import { MdOutlineQuiz, MdVideoLibrary } from "react-icons/md";
import {
  BsCardImage,
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { FaFilePowerpoint } from "react-icons/fa";
import { AiFillFileExcel } from "react-icons/ai";
import { BiText } from "react-icons/bi";
import { Card, CardBody } from "reactstrap";
import { Separator } from "../Separator";

const CourseResorses = ({
  subjectList,
  moduleList,
  lessonList,
  clessonList,
}) => {
  return (
    <div className="mb-4" style={{ height: "auto", width: "auto" }}>
      <CardBody className="p-0">
        <div className="course-video ">
          <div className="course-video-content">
            <div className="accordion " id="accordionMain">
              {subjectList &&
                subjectList.map((s, sind) => {
                  return (
                    <div className="subject_detail p-0 m-0 accordion-item border mb-2">
                      <div
                        className="accordion-header subject_acordian"
                        id={`accordian${s?.id}`}
                      >
                        <span
                          className="d-flex flex-wrap justify-content-end align-items-center flex-row-reverse accordion-button collapsed m-0  p-2"
                          data-bs-toggle="collapse"
                          data-bs-target={`#subjectlist${s?.id}`}
                          aria-expanded="true"
                          aria-controls={`subjectlist${s?.id}`}
                        >
                          <div
                            key={sind}
                            className="subject_name ps-3 d-flex justify-content-between text-white"
                          >
                            {s.name}
                          </div>
                        </span>
                      </div>

                      <div
                        id={`subjectlist${s?.id}`}
                        className={`accordion-collapse collapse  mb-2 px-4 ${
                          sind == 0 && "show"
                        }`}
                        aria-labelledby={s?.id}
                        data-bs-parent="#accordionMain"
                      >
                        <div className="detail my-3 px-4 ">
                          <strong>Description :</strong>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: s.description,
                            }}
                          />

                          <Separator className="mb-3" />
                        </div>

                        <div className="accordion my-2 " id="accordionModule">
                          <>
                            <strong className=" px-4 ">modules :</strong>
                            {moduleList &&
                              moduleList
                                .filter((f) => f.chapter_id == s.id)
                                .map((m, ind) => {
                                  return (
                                    <div
                                      className="module_detail accordion-item my-2"
                                      key={ind}
                                    >
                                      <div
                                        className="accordion-header module_acordian"
                                        id={`accordian${m?.id}`}
                                      >
                                        <span
                                          className="d-flex flex-wrap justify-content-end align-items-center flex-row-reverse accordion-button collapsed m-0 border p-2"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#modulelist${m?.id}`}
                                          aria-expanded="true"
                                          aria-controls={`modulelist${m?.id}`}
                                        >
                                          <div className="module_name ps-3 d-flex justify-content-between">
                                            {m.name}
                                          </div>
                                        </span>
                                      </div>

                                      <div
                                        id={`modulelist${m?.id}`}
                                        className={`accordion-collapse collapse border ${
                                          sind == 0 && "show"
                                        }`}
                                        aria-labelledby={m?.id}
                                        data-bs-parent="#accordionModule"
                                      >
                                        <div className="detail my-3 px-5">
                                          <strong>Description :</strong>
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: m.description,
                                            }}
                                          />
                                          <Separator className="my-3" />
                                          <strong>Lessons :</strong>
                                          {clessonList &&
                                            clessonList
                                              .filter(
                                                (element) =>
                                                  element.module_id == m?.id
                                              )
                                              .map((c) => {
                                                return (
                                                  <div className="subject_detail p-0 m-0 accordion-item border mb-2">
                                                    <div
                                                      className="accordion-header subject_acordian"
                                                      id={`accordian${c?.id}`}
                                                    >
                                                      <span
                                                        className="d-flex flex-wrap justify-content-end align-items-center flex-row-reverse accordion-button collapsed m-0  p-2"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#clessonlist${c?.id}`}
                                                        aria-expanded="true"
                                                        aria-controls={`clessonlist${c?.id}`}
                                                      >
                                                        <div
                                                          key={sind}
                                                          className="subject_name ps-3 d-flex justify-content-between text-white"
                                                        >
                                                          {c.title}
                                                        </div>
                                                      </span>
                                                    </div>

                                                    <div
                                                      id={`clessonlist${c?.id}`}
                                                      className={`accordion-collapse collapse  mb-2 px-4 ${
                                                        sind == 0 && "show"
                                                      }`}
                                                      aria-labelledby={s?.id}
                                                      data-bs-parent="#LessonAccordian"
                                                    >
                                                      <>
                                                        {lessonList &&
                                                          lessonList
                                                            .filter(
                                                              (element) =>
                                                                element.c_lesson_id ==
                                                                c?.id
                                                            )
                                                            .map((d, i) => {
                                                              const { quiz } =
                                                                d;

                                                              return (
                                                                <>
                                                                  {d.is_quiz ==
                                                                  1 ? (
                                                                    quiz &&
                                                                    quiz.map(
                                                                      (q) => {
                                                                        return (
                                                                          <Card
                                                                            className="my-2"
                                                                            key={
                                                                              q.id
                                                                            }
                                                                          >
                                                                            <CardBody className="py-2">
                                                                              <div className="d-flex">
                                                                                <div className="mr-3">
                                                                                  <MdOutlineQuiz
                                                                                    color="#707070"
                                                                                    size="26"
                                                                                  />
                                                                                </div>
                                                                                <div className="flex-grow-1  justify-content-center">
                                                                                  <div className="main__title">
                                                                                    {
                                                                                      q
                                                                                        .title
                                                                                        ?.en
                                                                                    }
                                                                                  </div>
                                                                                  <span className="mr-2 d-back"></span>
                                                                                </div>
                                                                              </div>
                                                                            </CardBody>
                                                                          </Card>
                                                                        );
                                                                      }
                                                                    )
                                                                  ) : (
                                                                    <Card
                                                                      className="my-2"
                                                                      key={d.id}
                                                                    >
                                                                      <CardBody className="py-2 aaa">
                                                                        <div className="d-flex">
                                                                          {d.host ==
                                                                          "Self" ? (
                                                                            <div className="mr-3">
                                                                              <MdVideoLibrary
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "Word" ? (
                                                                            <div className="mr-3">
                                                                              <BsFillFileEarmarkWordFill
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "Text" ? (
                                                                            <div className="mr-3">
                                                                              <BiText
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "PowerPoint" ? (
                                                                            <div className="mr-3">
                                                                              <FaFilePowerpoint
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "Youtube" ? (
                                                                            <div className="mr-3">
                                                                              <MdVideoLibrary
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "Excel" ? (
                                                                            <div className="mr-3">
                                                                              <AiFillFileExcel
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "PDF" ? (
                                                                            <div className="mr-3">
                                                                              <BsFillFileEarmarkPdfFill
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : d.host ==
                                                                            "Image" ? (
                                                                            <div className="mr-3">
                                                                              <BsCardImage
                                                                                color="#707070"
                                                                                size="26"
                                                                              />
                                                                            </div>
                                                                          ) : (
                                                                            ""
                                                                          )}
                                                                          <div className="flex-grow-1  justify-content-center">
                                                                            <div className="main__title">
                                                                              {
                                                                                d.name
                                                                              }
                                                                            </div>
                                                                            <span className="mr-2 d-back"></span>
                                                                          </div>
                                                                        </div>
                                                                      </CardBody>
                                                                    </Card>
                                                                  )}
                                                                </>
                                                              );
                                                            })}
                                                      </>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                          </>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  );
};

export default CourseResorses;
