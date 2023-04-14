import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import MediaUI from "../Media";

const CourseView = ({ listingData, l, i, sind, ind }) => {
  const [modalVideo, setModalVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [type, setType] = useState("video");

  const handleVideo = (d) => {
    if (d?.is_free == 1) {
      setVideo(d?.video_file);
      setVideoTitle(d?.video_name);
      setModalVideo(true);
      setType("video");
    }
    console.log(d?.is_free);
  };

  return (
    <div className="accordion-item ">
      <div className="accordion-header" id={`accordian${l?.id}`}>
        <button
          className="d-flex flex-wrap justify-content-between accordion-button collapsed "
          data-bs-toggle="collapse"
          data-bs-target={`#videolist${l?.id}`}
          aria-expanded="true"
          aria-controls={`videolist${l?.id}`}
        >
          <span>{l.lession_name}</span>
        </button>
      </div>
      <div
        id={`videolist${l?.id}`}
        className={`accordion-collapse collapse  ${
          i == 0 && sind == 0 && ind == 0 && "show"
        }`}
        aria-labelledby={l?.id}
        data-bs-parent="#accordionExample"
      >
        <ul className="lab-ul video-item-list">
          {listingData?.video &&
            listingData?.video
              .filter((element) => element.lession_id === l.id)
              .map((d) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={d?.id}
                  >
                    <div className="video-item-title">{d.video_name}</div>
                    <div className="video-item-icon">
                      <Link to="#" className="popup">
                        <i
                          className="icofont-play-alt-2"
                          onClick={() => {
                            handleVideo(d);
                          }}
                        ></i>
                      </Link>
                    </div>
                  </li>
                );
              })}

          {listingData?.course_video &&
            listingData?.course_video
              .filter((element) => element.lession_id === l.id)
              .map((d, i) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={i}
                  >
                    <div className="video-item-title">{d?.video_title}</div>
                    <div className="video-item-icon">
                      <Link to="#" className="popup">
                        <i
                          className="icofont-play-alt-2"
                          onClick={() => {
                            setVideo(d?.video_url);
                            setVideoTitle(d?.video_title);
                            setModalVideo(d?.is_free == 1 ? true : false);
                            setType("video");
                          }}
                        ></i>
                      </Link>
                    </div>
                  </li>
                );
              })}

          {listingData?.lecture_other_video &&
            listingData?.lecture_other_video
              .filter((element) => element.lession_id === l.id)
              .map((d, i) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={i}
                  >
                    <div className="video-item-title">{d.video_title}</div>
                    <div className="video-item-icon">
                      <Link
                        to="#"
                        className="popup"
                        onClick={() => {
                          setVideo(d?.video_link);
                          setVideoTitle(d?.video_title);
                          setModalVideo(d?.is_free == 1 ? true : false);
                          setType("video");
                        }}
                      >
                        <i className="icofont-play-alt-2"></i>
                      </Link>
                    </div>
                  </li>
                );
              })}
          {listingData?.lecture_audio &&
            listingData?.lecture_audio
              .filter((element) => element.lession_id === l.id)
              .map((d, i) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={i}
                  >
                    <div className="video-item-title">{d.audio_title}</div>
                    <div className="video-item-icon">
                      <Link
                        to="#"
                        className="popup"
                        onClick={() => {
                          setVideo(d?.audio_file);
                          setVideoTitle(d?.audio_title);
                          setModalVideo(d?.is_free == 1 ? true : false);
                          setType("video");
                        }}
                      >
                        <i class="icofont-audio"></i>
                      </Link>
                    </div>
                  </li>
                );
              })}
          {listingData?.lecture_text &&
            listingData?.lecture_text
              .filter((element) => element.lession_id === l.id)
              .map((d, i) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={i}
                  >
                    <div className="video-item-title">{d.title}</div>
                    <div className="video-item-icon">
                      <Link
                        to="#"
                        className="popup"
                        onClick={() => {
                          setVideo(d?.description);
                          setVideoTitle(d?.title);
                          setModalVideo(d?.is_free == 1 ? true : false);
                          setType("text");
                        }}
                      >
                        <i class="icofont-file-text"></i>
                      </Link>
                    </div>
                  </li>
                );
              })}
          {listingData?.lecture_document &&
            listingData?.lecture_document
              .filter((element) => element.lession_id === l.id)
              .map((d, i) => {
                return (
                  <li
                    className=" d-flex flex-wrap justify-content-between"
                    key={i}
                  >
                    <div className="video-item-title">{d.document_title}</div>
                    <div className="video-item-icon">
                      {d.is_free == 1 ? (
                        <a
                          href={d?.document_file}
                          className="popup"
                          download={d?.is_free == 1}
                        >
                          <i class="icofont-law-document"></i>
                        </a>
                      ) : (
                        <Link to="#">
                          <i class="icofont-law-document"></i>
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
          {listingData?.lecture_image
            .filter((element) => element.lession_id === l.id)
            .map((d, i) => {
              return (
                <li
                  className=" d-flex flex-wrap justify-content-between"
                  key={i}
                >
                  <div className="video-item-title">{d.image_title}</div>
                  <div className="video-item-icon">
                    <Link
                      to="#"
                      className="popup"
                      onClick={() => {
                        setVideo(d?.is_free == 1 ? d?.image_file : "");
                        setVideoTitle(d?.image_title);
                        setModalVideo(d?.is_free == 1 ? true : false);
                        setType("image");
                      }}
                    >
                      <i class="icofont-image"></i>
                    </Link>
                  </div>
                </li>
              );
            })}
          {listingData?.video_homework
            .filter((element) => element.lession_id === l.id)
            .map((d, i) => {
              return (
                <li className=" d-flex flex-wrap justify-content-between">
                  <div className="video-item-title">
                    {d.video_title} (video)
                  </div>
                  <div className="video-item-icon">
                    <Link to="#" className="popup">
                      <i class="icofont-read-book"></i>
                    </Link>
                  </div>
                </li>
              );
            })}
          {listingData?.text_homework
            .filter((element) => element.lession_id === l.id)
            .map((d, i) => {
              return (
                <li className=" d-flex flex-wrap justify-content-between">
                  <div className="video-item-title">{d.title} (text)</div>
                  <div className="video-item-icon">
                    <Link to="#" className="popup">
                      <i class="icofont-read-book"></i>
                    </Link>
                  </div>
                </li>
              );
            })}
          {listingData?.add_homework
            .filter((element) => element.lession_id === l.id)
            .map((d, i) => {
              return (
                <li className=" d-flex flex-wrap justify-content-between">
                  <div className="video-item-title">
                    {d.document_title} (Document)
                  </div>
                  <div className="video-item-icon">
                    <Link to="#" className="popup">
                      <i class="icofont-read-book"></i>
                    </Link>
                  </div>
                </li>
              );
            })}
        </ul>

        <Modal
          size="lg"
          isOpen={modalVideo}
          toggle={() => {
            setModalVideo(!modalVideo);
          }}
        >
          <ModalHeader
            toggle={() => {
              setModalVideo(!modalVideo);
            }}
          >
            {videoTitle}
          </ModalHeader>
          <ModalBody>
            {type == "image" ? (
              <div className="lecture__image">
                <img src={video} alt="image" />{" "}
              </div>
            ) : type == "text" ? (
              <div dangerouslySetInnerHTML={{ __html: video }} />
            ) : (
              <MediaUI url={video} />
            )}
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default CourseView;
