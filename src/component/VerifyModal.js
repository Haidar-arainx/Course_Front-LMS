import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

const VerifyModal = ({ handleOtp, modal, setModal }) => {
  const toggle = () => setModal(!modal);
  console.log(modal);
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Verify Your Email Address</ModalHeader>
      <ModalBody>
        <div>
          Before proceeding, please check your email for a verification link
          Login in Using that Link
        </div>
        <div className="d-flex justify-content-center my-2">
          <button className="btn btn-success" onClick={() => handleOtp()}>Resend Link</button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VerifyModal;
