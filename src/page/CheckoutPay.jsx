import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, FormGroup, Input } from "reactstrap";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { GetRequestApi, PostRequestApi } from "../services/ApiRequests";
import { IMAGE_BASE_URL } from "../services/base_url";
import { NotificationManager } from "react-notifications";
const CheckoutPay = () => {
  const [formDataState, setFormDataState] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [allAddress, setallAddress] = useState([]);
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [editPrevious, setEditPrevious] = useState(false);
  const [NewBilling, setNewBilling] = useState("1");
  const [code, setCode] = useState();
  const [subTotal, setSubTotal] = useState();
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormDataState({ ...formDataState, [name]: value });
  };
  useEffect(() => {
    GetRequestApi("countries").then((res) => {
      setCountryList(res.data.data);
    });
    GetRequestApi("my-billing-address").then((res) => {
      setallAddress(res.data.data);
      setBillingAddress(res.data.data[0]);
    });
  }, []);

  useEffect(() => {
    if (country) {
      GetRequestApi(`states/${country}`).then((res) => {
        setStateList(res.data.data);
      });
    }
  }, [country]);
  useEffect(() => {
    if (state) {
      GetRequestApi(`cities/${state}`).then((res) => {
        setCityList(res.data.data);
      });
    }
  }, [state]);

  const handleSubmit = () => {
    const formData = new FormData();
    if (NewBilling == "1") {
      formData.append("old_billing", billingAddress?.id);
    }

    formData.append("billing_address", NewBilling == 1 ? "old" : "new");
    if (NewBilling == "2" || editPrevious) {
      formData.append("first_name", formDataState?.first_name);
      formData.append("last_name", formDataState?.last_name);
      formData.append("company_name", formDataState?.company_name);
      formData.append("address1", formDataState?.address1);
      formData.append("details", formDataState?.details);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("zip_code", zipCode);
    }
    if (editPrevious) {
      formData.append("previous_address_edit", 1);
    }
    PostRequestApi("place_order", formData).then((res) => {
      if (res.status === 200) {
        navigate("/payment");
      }
      console.log(res.data);
    });
  };
  const storeData = useSelector((state) => state.cart);
  const total = storeData
    .reduce((accum, item) => accum + item.price, 0)
    .toFixed(2);
  const handleCoupon = () => {
    PostRequestApi("apply-coupon", {
      code,
      total,
    }).then((res) => {
      if (res.status == 200) {
        localStorage.setItem("discount_amount", res.data.total);
        setSubTotal(res.data.total);
      }
      else{
        NotificationManager.error(
          res.data.message,
          "Error!",
          3000,
          null,
          null,
          ""
        );
      }
    });
  };

  return (
    <>
      <Header />
      <PageHeader title={"Archives: Checkout"} curPage={"Checkout"} />
      <div className="course-single-section py-5 section-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-6 ">
              <div
                className=" cart-course-wrapper box-shadow-5 my-3"
                style={{ display: "block" }}
              >
                <div className=" pl-1 align-self-center pr-4 my-2">
                  <div className="checkgroup">
                    <input
                      type="radio"
                      name="address"
                      id="address1"
                      value="1"
                      defaultChecked={billingAddress && NewBilling == "1"}
                      onChange={(e) => setNewBilling(e.target.value)}
                    />
                    <label htmlFor="address1">Previous Billing Address</label>
                  </div>
                </div>
                <div className=" pl-1 align-self-center pr-4 my-2">
                  <div className="checkgroup">
                    <input
                      type="radio"
                      name="address"
                      id="address2"
                      value="2"
                      defaultChecked={NewBilling == "2"}
                      onChange={(e) => {
                        setNewBilling(e.target.value);
                        setFormDataState({});
                      }}
                    />
                    <label htmlFor="address2">New Billing Address</label>
                  </div>
                </div>
                {NewBilling !== "2" && (
                  <div className="form-group my-3">
                    <label htmlFor="Billing Address">Billing Address *</label>
                    <select
                      name="billing"
                      id="billing"
                      onChange={(e) => {
                        const dress =
                          allAddress &&
                          allAddress.find((f) => f.id == e.target.value);
                        console.log(dress);
                        setBillingAddress(dress);
                      }}
                      className="form-control my-2"
                    >
                      {allAddress &&
                        allAddress.map((m) => (
                          <option value={m.id}>{m?.address1}</option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
              <Card>
                <CardBody>
                  <h3>
                    {/* {NewBilling !== "2" && "Edit"} */}
                    Billing Details
                  </h3>
                </CardBody>
                {!editPrevious && billingAddress && NewBilling !== "2" ? (
                  <table className="table table-bordered billing_info mb-0">
                    <tbody>
                      <tr>
                        <td colspan="2">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              setEditPrevious(true);
                              setFormDataState(billingAddress);
                              setCountry(billingAddress?.country?.id);
                              setState(billingAddress?.state?.id);
                              setCity(billingAddress?.city?.id);
                              setzipCode(billingAddress?.zip_code);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>Name</td>
                        <td>
                          {billingAddress?.first_name +
                            " " +
                            billingAddress?.last_name}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{billingAddress?.email}</td>
                      </tr>
                      <tr className="d-none">
                        <td>Phone</td>
                        <td>{billingAddress?.phone}</td>
                      </tr>
                      <tr>
                        <td>Company Name</td>
                        <td>{billingAddress?.company_name}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{billingAddress?.country?.name}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{billingAddress?.state?.name}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{billingAddress?.city?.name}</td>
                      </tr>
                      <tr>
                        <td>Zip Code</td>
                        <td>{billingAddress?.zip_code}</td>
                      </tr>
                      <tr>
                        <td>Street Address</td>
                        <td>{billingAddress?.address1}</td>
                      </tr>
                      <tr>
                        <td>Order Details</td>
                        <td>{billingAddress?.details}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="firstname "
                          value={formDataState?.first_name}
                          onChange={handleForm}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name *</label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Last name "
                          value={formDataState?.last_name}
                          onChange={handleForm}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="last_name">
                          Company Name (Optional )
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Company Name "
                          value={formDataState?.company_name}
                          onChange={handleForm}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <select
                          className="form-control"
                          placeholder="Contact Number"
                          value={countryList && country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          {countryList &&
                            countryList.map((contry) => (
                              <option value={contry.id}>{contry?.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">State</label>
                        <select
                          className="form-control"
                          placeholder="Contact Number"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          {stateList &&
                            stateList.map((contry) => (
                              <option value={contry.id}>{contry?.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <select
                          className="form-control"
                          placeholder="Contact Number"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          {cityList &&
                            cityList.map((contry) => (
                              <option value={contry.id}>{contry?.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="last_name">Street Address</label>
                        <input
                          type="text"
                          name="address1"
                          placeholder="address "
                          value={formDataState?.address1}
                          onChange={handleForm}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">ZipCode</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ZipCode"
                          value={zipCode}
                          onChange={(e) => setzipCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <h3>Additional Information</h3>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">
                          Information details
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="details"
                          name="details"
                          value={formDataState?.details}
                          onChange={handleForm}
                          cols="30"
                          rows="7"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            <div className="col-md-5 offset-md-1">
              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <h3 className="my-3">Your order</h3>
                {storeData &&
                  storeData.map((list) => {
                    return (
                      <div class="single_ordered_product">
                        <div class="product_name d-flex align-items-center">
                          <div
                            class="thumb"
                            style={{
                              backgroundImage: `url(${IMAGE_BASE_URL}${list?.course?.image})`,
                            }}
                          ></div>

                          <span>{list?.course?.title?.en}</span>
                        </div>
                        <span class="order_prise f_w_500 font_16 text-nowrap">
                          £ {list?.price}
                        </span>
                      </div>
                    );
                  })}
              </div>

              {!subTotal && (
                <div
                  className=" cart-course-wrapper box-shadow-5"
                  style={{ flexDirection: "column" }}
                >
                  <div className="cart-text my-3 ">
                    <h1>Coupon</h1>
                    <p>Enter your coupon code if you have one.</p>
                    <div className="input-fields  my-3">
                      <input
                        type="text"
                        placeholder="Enter Coupone Code"
                        className="form-control"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 offset-md-2 my-4 py-2">
                    <button
                      type="button"
                      id="applyCoupon"
                      class="theme_btn small_btn2 btn btn-success "
                      onClick={handleCoupon}
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              )}

              <div
                class="cart-course-wrapper box-shadow-5 my-3"
                style={{ flexDirection: "column" }}
              >
                <div class="single_lists">
                  <span>
                    <strong> Subtotal</strong>
                  </span>
                  <span>£ {total}</span>
                </div>
                {subTotal && (
                  <div class="single_lists">
                    <span>
                      <strong> Discount</strong>
                    </span>
                    <span>£ {(total - subTotal).toFixed(2)}</span>
                  </div>
                )}
                <div class="single_lists">
                  <span>
                    <strong>Payable Amount </strong>{" "}
                  </span>
                  <span>£ {subTotal ? subTotal : total}</span>
                </div>
              </div>

              <div class="bank_transfer">
                <p class="my-5">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy .
                </p>
                <button class="btn btn-success w-100" onClick={handleSubmit}>
                  Place An Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPay;
