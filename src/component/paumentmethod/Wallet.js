import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PostRequestApi } from "../../services/ApiRequests";
import { user } from "../../services/defaultValues";
import { NotificationManager } from "react-notifications";

const Wallet = ({ subtotal }) => {
  console.log(user?.balance >= subtotal);
  const [lgShow, setLgShow] = useState(false);
  const storeData = useSelector((state) => state.cart);
  const onToken = () => {
    if (user?.balance >= subtotal) {
      PostRequestApi("payment_submit", {
        tracking_id: storeData[0].tracking,
        payment_method: "Wallet",
      }).then((res) => {
        if (res.data.success === true) {
          window.location.href = "/";
          localStorage.removeItem("discount_amount");
        }
      });
    } else {
      NotificationManager.error(
        "You Dont have Balence to purchase",
        "Error!",
        3000,
        null,
        null,
        ""
      );
    }
  };

  return (
    <div class="payment_method_single">
      <div class="deposite_payment_wrapper customer_payment_wrapper">
        <button class="payment_btn_text" onClick={() => setLgShow(true)}>
          Wallet
        </button>
        <Modal
          size="md"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              My Account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="row">
              <div class="col-xl-6 col-md-6">
                <label for="name" class="mb-2">
                  Balance
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={`£ ${user?.balance}`}
                  disabled
                  readonly
                />
              </div>
              <div class="col-xl-6 col-md-6">
                <label for="name" class="mb-2">
                  Purchase Price
                </label>
                <input
                  type="text"
                  name="amount"
                  class="form-control"
                  value={`£ ${subtotal}`}
                  disabled
                  readonly
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              class=" btn btn-danger"
              onClick={() => setLgShow(false)}
            >
              Cancel
            </button>
            <button type="button" class="btn btn-success" onClick={onToken}>
              Deposit
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Wallet;
