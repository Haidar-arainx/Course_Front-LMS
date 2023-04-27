import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PostRequestApi } from "../../services/ApiRequests";
import { user } from "../../services/defaultValues";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const Bank = ({ subtotal }) => {
  const [lgShow, setLgShow] = useState(false);
  const [formDataState, setFormDataState] = useState({});
  const storeData = useSelector((state) => state.cart);
  const navigat = useNavigate();
  const onToken = () => {
    const formData = new FormData();
    formData.append("bank_name", formDataState?.bank_name);
    formData.append("account_holder", formDataState?.account_holder);
    formData.append("reference_number", formDataState?.reference_number);
    formData.append("deposit_amount", subtotal);
    formData.append("tracking_id", storeData[0].tracking);
    formData.append("image", formDataState?.image);

    PostRequestApi("add_bank_payment", formData).then((res) => {
      if (res.status === 200) {
        NotificationManager.success(
          "We Have recevied your request we will notify you when approved",
          "Success!",
          3000,
          null,
          null,
          ""
        );
        window.location.href = `/verify?tracking_id=${storeData[0].tracking}&ref_number=${formDataState?.reference_number}&amount=${subtotal}&ac_holder=${formDataState?.account_holder}&bank_name=${formDataState?.bank_name}`;
        // navigat("/verify");
      }
    });
  };
  const handleForm = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormDataState({ ...formDataState, [name]: e.target.files[0] });
    } else {
      setFormDataState({ ...formDataState, [name]: value });
    }
  };
  return (
    <div class="payment_method_single">
      <div class="deposite_payment_wrapper customer_payment_wrapper">
        <button
          class="payment_btn_text btn-success"
          onClick={() => setLgShow(true)}
        >
          BankTransfer
        </button>
        <Modal
          size="md"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Bank Transfer Detail
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="row">
              <div class="col-xl-12 ">
                <label for="name" class="mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="bank_name"
                  value={formDataState?.bank_name}
                  onChange={handleForm}
                />
              </div>
              <div class="col-xl-12 ">
                <label for="account_holder" class="mb-2">
                  Account holder Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="account_holder"
                  value={formDataState?.account_holder}
                  onChange={handleForm}
                />
              </div>
              <div class="col-xl-12 ">
                <label for="reference_number" class="mb-2">
                  Reference Number
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="reference_number"
                  value={formDataState?.reference_number}
                  onChange={handleForm}
                />
              </div>
              <div class="col-xl-12 ">
                <label for="deposit_amount" class="mb-2">
                  Deposit Amount
                </label>
                <input
                  type="number"
                  class="form-control"
                  name="deposit_amount"
                  value={subtotal}
                  disabled
                  //   onChange={handleForm}
                />
              </div>
              <div class="col-xl-12 ">
                <label for="image" class="mb-2">
                  Recipet Image
                </label>
                <input
                  type="file"
                  class="form-control"
                  name="image"
                  onChange={handleForm}
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
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Bank;
