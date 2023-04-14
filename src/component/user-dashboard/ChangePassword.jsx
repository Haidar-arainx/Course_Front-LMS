import React from "react";
import { postRequestFunc } from "../../services/ApiRequests";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import { user } from "../../services/defaultValues";
const ChangePassword = () => {
  const [current_password, setcurrent_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [confirm_new_password, setconfirm_new_password] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm_new_password === new_password) {
      postRequestFunc("password_reset", {
        id: user.id,
        current_password: current_password,
        new_password: new_password,
      }).then((res) => {
        if (res?.data?.status === true) {
          NotificationManager.success(
            `${res?.data?.message}`,
            "Success!",
            3000,
            null,
            null,
            ""
          );
          setcurrent_password("");
          setnew_password("");
          setconfirm_new_password("");
        }
      });
    } else {
      NotificationManager.success(
        `New Password & Confirm Are Not Same`,
        "Error!",
        3000,
        null,
        null,
        ""
      );
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <h4 className="box-title text-primary mt-30">
          <i className="ti-share me-15"></i> Change Password
        </h4>
        <hr className="my-15" />
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input
            className="form-control"
            type="text"
            placeholder="Current Password"
            value={current_password}
            onChange={(e) => setcurrent_password(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">New Password</label>
          <input
            className="form-control"
            type="text"
            placeholder="New Password "
            value={new_password}
            onChange={(e) => setnew_password(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Verify New Password</label>
          <input
            className="form-control"
            type="text"
            placeholder="Verify New Password"
            value={confirm_new_password}
            onChange={(e) => setconfirm_new_password(e.target.value)}
          />
        </div>

        <hr className="my-15" />
      </div>
      <div className="d-flex justify-content-end ">
        <button type="submit" className="btn btn-success">
         Save changes
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
