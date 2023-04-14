import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Pagination from "../component/sidebar/pagination";
import { GetRequestApi, GetRequestApiWithouttoken } from "../services/ApiRequests";
import { IMAGE_BASE_URL } from "../services/base_url";
const blogList = [
  {
    imgUrl: "assets/images/blog/01.jpg",
    imgAlt: "Blog Thumb",
    title: "Business Ueporting Rouncil Them Could Plan.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/02.jpg",
    imgAlt: "Blog Thumb",
    title: "Financial Reporting Qouncil What Could More.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/03.jpg",
    imgAlt: "Blog Thumb",
    title: "Consulting Reporting Qounc Arei Could More.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/04.jpg",
    imgAlt: "Blog Thumb",
    title: "Strategic Social Media and of visual design.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/05.jpg",
    imgAlt: "Blog Thumb",
    title: "Find the Right Path for your Group Course online.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/06.jpg",
    imgAlt: "Blog Thumb",
    title: "Learn by doing with Real World Projects other countries.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/07.jpg",
    imgAlt: "Blog Thumb",
    title: "The Importance Of Intrinsic for Students.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/08.jpg",
    imgAlt: "Blog Thumb",
    title: "A Better Alternative To Grading Student Writing.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
  {
    imgUrl: "assets/images/blog/09.jpg",
    imgAlt: "Blog Thumb",
    title: "The Challenge Global Learning In Public Education.",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    commentCount: "3",
    btnText: "Read More",
    metaList: [
      {
        iconName: "icofont-ui-user",
        text: "Rajib Raj",
      },
      {
        iconName: "icofont-calendar",
        text: "Jun 05,2022",
      },
    ],
  },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    GetRequestApiWithouttoken("get_all_blog").then((res) => {
      setBlogs(res.data.data?.blogs);
    });
  }, []);
  return (
    <Fragment>
      <Header />
      <PageHeader title={"Our Blog Posts"} curPage={"Blog"} />
      <div className="blog-section padding-tb section-bg">
        <div className="container">
          <div className="section-wrapper">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
              {blogs &&
                blogs.map((val, i) => (
                  <div className="col" key={i}>
                    <div className="post-item">
                      <div className="post-inner">
                        <div className="post-thumb">
                          <Link to={`/blog-single/${val.id}`}>
                            <img
                              src={`${IMAGE_BASE_URL}/${val.image}`}
                              alt={`${val.imgAlt}`}
                            />
                          </Link>
                        </div>
                        <div className="post-content">
                          <Link to={`/blog-single/${val.id}`}>
                            <h4>{val.title?.en}</h4>
                          </Link>
                          <div className="meta-post">
                            <ul className="lab-ul">
                              <li key={i}>
                                <i className="icofont-ui-user"></i>
                                {val?.user?.name}
                              </li>
                              <li key={i}>
                                <i className="icofont-calendar"></i>
                                {val?.authored_date}
                              </li>
                              
                            </ul>
                          </div>
                        </div>
                        <div className="post-footer">
                          <div className="pf-left">
                            <Link to={`/blog-single/${val.id}`} className="lab-btn-text">
                              Read More{" "}
                              <i className="icofont-external-link"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default BlogPage;
