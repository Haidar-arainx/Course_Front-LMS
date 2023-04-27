import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { PostRequestApi } from "../services/ApiRequests";
import { useReactToPrint } from "react-to-print";
import ReactToPdf from "react-to-pdf";
const Invoice = () => {
  const [Detail, setDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    PostRequestApi("get_invoice_details", {
      id,
    }).then((res) => {
      setDetail(res.data.enroll);
    });
  }, [id]);

  const Settings = useSelector((state) => state.settinglist);
  const adress = Settings && Settings.find((f) => f.key == "address");
  const phone = Settings && Settings.find((f) => f.key == "phone");
  const email = Settings && Settings.find((f) => f.key == "email");

  const componentRef = React.useRef(null);
  const ref = React.createRef();
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
  });

  return (
    <>
      <Header />
      <PageHeader title={"Invoice"} curPage={"Invoice"} />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div class="d-flex justify-content-between align-content-center">
                <div class="main-title d-flex">
                  <h3 class="mb-0 me-3 text-uppercase">INV-{Detail?.id}</h3>
                </div>
                <div>
                  <ul className="d-flex align-content-center flex-wrap">
                    <li className="d-inline-block list-style-none me-3">
                      <button class="btn btn-primary" onClick={handlePrint}>
                        Print
                      </button>
                    </li>
                    <li className="d-inline-block list-style-none ">
                      <ReactToPdf
                        targetRef={ref}
                        filename="div-blue.pdf"
                        x={0.5}
                        y={0.5}
                        scale={0.8}
                      >
                        {({ toPdf }) => (
                          <button class="btn btn-success" onClick={toPdf}>
                            Download
                          </button>
                        )}
                      </ReactToPdf>
                    </li>
                  </ul>
                </div>
              </div>
              <div ref={ref}>
                <div class="invoice_part_iner" ref={componentRef}>
                  <table class="table mb-4">
                    <tbody>
                      <tr>
                        <td>
                          <img
                            style={{ width: "108px" }}
                            src="/zikarfikar-logo.png"
                            alt="DhikrFikr"
                          />
                        </td>
                        <td class="text-end">
                          <h3>INV-{Detail?.id}</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="table">
                    <tbody>
                      <tr>
                        <td class="w-50">
                          <p class="invoice_grid">
                            <strong>Date: </strong>
                            <span>{Detail?.dateFormat}</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Pay Method: </strong>
                            <span>{Detail?.payment_method}</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Status: </strong>
                            <span>
                              {Detail?.status == 1 ? "Paid " : "UnPaid"}
                            </span>
                          </p>
                        </td>
                        <td>
                          <p class="invoice_grid">
                            <strong>Company: </strong>
                            <span>Dhikrfikr Course App</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Phone: </strong>
                            <span>{phone?.value}</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Email: </strong>
                            <span>{email?.value}</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Address: </strong>
                            <span>{adress?.value}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: 0,
                      marginBottom: "3px",
                    }}
                  >
                    Billed To,
                  </h4>
                  <table class="table mb-5">
                    <tbody>
                      <tr>
                        <td>
                          <p class="invoice_grid">
                            <strong>Name: </strong>
                            <span>{Detail?.user?.name}</span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Phone: </strong>
                            <span> {Detail?.user?.phone} </span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Email: </strong>
                            <span> {Detail?.user?.email} </span>
                          </p>
                          <p class="invoice_grid">
                            <strong>Address: </strong>
                            <span>{Detail?.user?.address} </span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: "70px",
                      marginBottom: "33px",
                    }}
                  >
                    Order List
                  </h4>
                  <table class="table custom_table3 mb-0">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span class="pl-3">SL</span>
                        </th>
                        <th colspan="2" scope="col" class="black_color">
                          Course name
                        </th>

                        <th scope="col" class="black_color">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Detail?.courses &&
                        Detail?.courses.map((course) => {
                          return (
                            <tr>
                              <td class="black_color">
                                <span class="pl-3">1</span>
                              </td>
                              <td colspan="2">
                                <h5 class="black_color">
                                  {course?.course?.title?.en}
                                </h5>
                              </td>

                              <td class="black_color">
                                £ {course?.course?.price}
                              </td>
                            </tr>
                          );
                        })}

                      <tr>
                        <td></td>
                        <td></td>
                        <td class="text-end">Sub Total</td>
                        <td>£ {Detail?.price}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td class="text-end">Discount</td>
                        <td>£ {Detail?.discount}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td class="text-end">Total</td>
                        <td>£ {Detail?.purchase_price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
