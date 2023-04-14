import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { GetRequestApi, GetRequestApiWithouttoken } from "../../services/ApiRequests";
import { IMAGE_BASE_URL } from "../../services/base_url";

const subTitle = "FORM OUR BLOG POSTS";
const title = "More Articles From Resource Library";

const blogList = [
  {
    imgUrl: "assets/images/blog/01.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "3",
  },
  {
    imgUrl: "assets/images/blog/02.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "4",
  },
  {
    imgUrl: "assets/images/blog/03.jpg",
    imgAlt: "blog thumb rajibraj91 rajibraj",
    title: "Scottish Creatives To Receive Funded Business.",
    author: "Begrass Tyson",
    date: "April 23,2022",
    desc: "Pluoresnts customize prancing apcentered customer service anding ands asing straelg Interacvely cordinate performe",
    btnText: "Read more",
    commentCount: "6",
  },
];

const Blog = ({ formDataState }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    GetRequestApiWithouttoken("get_all_blog").then((res) => {
      setBlogs(res.data.data?.blogs);
    });
  }, []);
  return (
    <div className="blog-section padding-tb section-bg">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">{formDataState?.blog_page_sub_title}</span>
          <h2 className="title">{formDataState?.blog_page_title}</h2>
        </div>
        <div className="section-wrapper">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
              {blogs?.length > 0 &&
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
                              Read More
                              <i className="icofont-external-link"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        
          </div>
      </div>
    </div>
  );
};

export default Blog;
