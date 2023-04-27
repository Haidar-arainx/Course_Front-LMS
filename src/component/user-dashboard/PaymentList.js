import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetRequestApi } from "../../services/ApiRequests";
import Pagination from "../sidebar/pagination";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);

  //paginatin
  const [pageNumber, setPageNumber] = useState(0);
  const [userPerPage, setUserPerPage] = useState(8);
  const pageVisited = pageNumber * userPerPage;

  useEffect(() => {
    GetRequestApi("get_my_purchases").then((res) => {
      setPaymentList(res.data.normal_checkouts);
    });
  }, []);

  return (
    <>
      <div className="table-responsive mt-30">
        <table className="table table-striped">
          <thead>
            <tr className="bg-dark">
              <th>SL</th>
              <th>Date</th>
              <th>Total Courses</th>
              <th>Total Price </th>

              <th>Discount</th>
              <th> Payment Type</th>

              <th className="text-end">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {paymentList &&
              paymentList
                .slice(pageVisited, pageVisited + userPerPage)
                .map((p, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{p?.dateFormat}</td>
                      <td>{p?.courses?.length}</td>
                      <td>{p?.price}</td>
                      <td>{p?.discount}</td>

                      <td>{p.payment_method}</td>
                      <td className="text-end">
                        <Link
                          className="btn btn-sm paypal-view-btn "
                          data-bs-toggle="tooltip"
                          data-original-title="View"
                          data-bs-original-title=""
                          title=""
                          to={`/invoice/${p.id}`}
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <Pagination
        users={paymentList}
        setPageNumber={setPageNumber}
        usersPerPage={userPerPage}
      />
    </>
  );
};

export default PaymentList;
