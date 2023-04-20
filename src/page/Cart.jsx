import React from "react";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { GetCart, RemoveAction } from "../redux/actions";
import Checkout from "../component/section/Checkout";
import Coupon from "../component/section/Coupon";
import { IMAGE_BASE_URL } from "../services/base_url";
import { GetRequestApi } from "../services/ApiRequests";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
const Cart = () => {
  const storeData = useSelector((state) => state.cart);
  const dispach = useDispatch();
  const Settings = useSelector((state) => state.settinglist);

  const removeFromCart = (id) => {
    GetRequestApi(`remove-to-cart/${id}`)
      .then((res) => {
        if (res.data.success == true) {
          NotificationManager.success(
            `${res?.data?.message}`,
            "Course!",
            3000,
            null,
            null,
            ""
          );
          dispach(GetCart());
        } else {
          NotificationManager.error(
            `${res?.data?.message}`,
            "Course!",
            3000,
            null,
            null,
            ""
          );
        }
      })
      .catch((err) => {
        NotificationManager.error(`${err}`, "Course!", 3000, null, null, "");
      });
  };
  return (
    <>
      <Header />
      <PageHeader title={"Archives: Cart"} curPage={"Cart"} />
      <div className="course-single-section py-5 section-bg">
        <div className="container">
          <div class="title_cart">{storeData?.length} Courses in cart</div>
          <div className="row">
            {storeData?.length ? (
              storeData.map((c) => {
                return (
                  <div class="cart-course-wrapper box-shadow-5 my-3">
                    <div class="image d-none d-md-block">
                      <div className="cart_image">
                        <img
                          src={`${IMAGE_BASE_URL}${c?.course?.image}`}
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    <div class="details">
                      <div class="name">{c?.course?.title?.en}</div>

                      <div
                        class="course-subtitle  mt-2"
                        dangerouslySetInnerHTML={{
                          __html: c?.course?.about?.en,
                        }}
                      />
                      <div className="course-author">
                        <div className="teacher_image">
                          <img
                            src={`${IMAGE_BASE_URL}${c?.course?.user?.image}`}
                            alt={"imgAlt"}
                          />
                        </div>
                        <span className="ca-name">{c?.course?.user?.name}</span>
                      </div>
                    </div>
                    <div class="move-remove text-center">
                      <div id="2" onClick={() => removeFromCart(c.id)}>
                        <CancelIcon /> Remove
                      </div>
                    </div>
                    <div class="price">
                      <div class="current-price">
                        {c.price == 0 ? (
                          "Free"
                        ) : (
                          <>
                            &#163;
                            {c.price}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center">No Items In The Cart</h1>
            )}
            <div className="text-end">
            <Link to="/checkout">
              <button className="btn btn-success">Proceed to Checkout</button>
            </Link>
            </div>
            {/* <Coupon />

            <Checkout removeFromCart={removeFromCart} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
