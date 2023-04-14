import React from "react";
import DashboardMain from "../component/user-dashboard/DashboardMain";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import Banner from "../component/section/banner";

const UserDashboard = () => {
  return (
    <div>
      <Header />
      {/* <Banner /> */}
      <DashboardMain/>
      <Footer />
    </div>
  );
};

export default UserDashboard;
