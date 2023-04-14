import moment from "moment/moment";
import React from "react";
import { useSelector } from "react-redux";

const PaymentList = () => {
  const Settings = useSelector((state) => state.settinglist);
  const payment = useSelector((state) => state.paymentList);

  const TimeConvert = (t) => {
    const new_date = new Date(t * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return new_date;
  };

  return (
    <div className="table-responsive mt-30">
      <table className="table table-striped">
        <thead>
          <tr className="bg-dark">
            <th>Invoice ID</th>

            <th>Invoice Total</th>
            <th>Status</th>

            <th className="text-end">Date</th>
          </tr>
        </thead>
        <tbody>
          {payment &&
            payment.map((p) => {
              return (
                <tr>
                  <td>{p?.id}</td>

                  <td>
                    {/* {Settings?.system_default_currency_symbol || "&#163;"}{" "} */}
                    {/* &#163; */}
                    {p.amount && p.amount / 100}
                  </td>
                  <td>{p.status}</td>
                  <td className="text-end">
                    {TimeConvert(p.created)}
                    {/* <a
                      className="btn btn-sm paypal-view-btn "
                      data-bs-toggle="tooltip"
                      data-original-title="View"
                      data-bs-original-title=""
                      title=""
                    >
                      <i className="fa fa-eye"></i>
                    </a> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
