import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import Archive from "../component/sidebar/archive";
import Author from "../component/sidebar/author";
import Comment from "../component/sidebar/comment";
import Instagram from "../component/sidebar/instagram";
import PopularPost from "../component/sidebar/popular-post";
import PostCategory from "../component/sidebar/post-category";
import Respond from "../component/sidebar/respond";
import Search from "../component/sidebar/search";
import Tags from "../component/sidebar/tags";
import { GetRequestApi, GetRequestApiWithouttoken } from "../services/ApiRequests";
import { IMAGE_BASE_URL } from "../services/base_url";

const socialList = [
  {
    link: "#",
    iconName: "icofont-facebook",
    className: "facebook",
  },
  {
    link: "#",
    iconName: "icofont-twitter",
    className: "twitter",
  },
  {
    link: "#",
    iconName: "icofont-linkedin",
    className: "linkedin",
  },
  {
    link: "#",
    iconName: "icofont-instagram",
    className: "instagram",
  },
  {
    link: "#",
    iconName: "icofont-pinterest",
    className: "pinterest",
  },
];

const BlogSingle = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    GetRequestApiWithouttoken("get_all_blog").then((res) => {
      const sblog = (res.data.data?.blogs).find(f=>f.id == id)
      setBlog(sblog);
    });
  }, []);
  return (
    <Fragment>
      <Header />
      <PageHeader
        title={blog?.title?.en}
        curPage={"Blog Detais"}
      />
      <div className="blog-section blog-single padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="section-wrapper">
                  <div className="row row-cols-1 justify-content-center g-4">
                    <div className="col">
                      <div className="post-item style-2">
                        <div className="post-inner">
                          <div className="post-thumb">
                            <img
                               src={`${IMAGE_BASE_URL}/${blog.image}`}
                              alt="blog thumb rajibraj91"
                              className="w-100"
                            />
                          </div>
                          <div className="post-content">
                            <h2>{blog?.title?.en}</h2>
                            <div className="meta-post">
                              <ul className="lab-ul">
                                <li>
                                  <a href="#">
                                    <i className="icofont-calendar"></i>  {blog?.authored_date}
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="icofont-ui-user"></i>   {blog?.user?.name}
                                  </a>
                                </li>
                             
                              </ul>
                            </div>
                            <p>
                            {blog?.description?.en}
                            </p>

                            {/* <blockquote>
                              <p>
                                Dynamically recaptiualize distributed
                                technologies is wherease turnkey channels and
                                onotonectally provide access to resource
                                leveling expertise vias worldwide deliverables
                                uolisticly extend aserser are diverse vortals.{" "}
                              </p>
                              <cite>
                                <a href="#">...Melissa Hunter</a>
                              </cite>
                            </blockquote> */}
{/* 
                            <p>
                              whole heart create am alones and feel the charm of
                              exstenceth spot whch the blissouls like mineing am
                              soo happy my dearsi frend absoribed the exquste
                              sense enjoy my whole hearts alone and fee the
                              charm of exstenceths spotsi whch was the blis of
                              soulis mineing amsoing dear frend soingu absoribed
                              the exqust sense tranqui existence neglect my
                              talentsr should ncapable ofing is drawng singe
                              wonderful serenty has taken possesison of my entre
                              soulng these sweet present moment and yet feel
                              that never was greater artst
                            </p> */}

                            {/* <img
                              src="assets/images/blog/single/02.jpg"
                              alt="rajibraj91"
                            /> */}
{/* 
                            <p>
                              Serenity hasir taken poseson mying entre soung
                              these sweet morngs sprng whch enoywith whole heart
                              create am alones and feel the charm of exstenceth
                              spot whch the blissouls like mineing am soo happy
                              my dearsi frend absoribed the exquste sense enjoy
                              my whole hearts alone and fee the charm of
                              exstenceths spotsi whch was the blis of soulis
                              mineing amsoing dear frend soingu absoribed the
                              exqust sense tranqui existence neglect my talentsr
                              should ncapable ofing is drawng singe wonderful
                              serenty has taken possesison of my entre soulng
                              these sweet present moment and yet feel that never
                              was greater artst
                            </p> */}

                            {/* <div className="video-thumb">
                              <img
                                src="assets/images/blog/single/03.jpg"
                                alt="video"
                              />
                              <a
                                href="https://www.youtube-nocookie.com/embed/jP649ZHA8Tg"
                                className="video-button popup"
                                target="_blank"
                              >
                                <i className="icofont-ui-play"></i>
                              </a>
                            </div> */}

                            {/* <p>
                              whole heart create am alones and feel the charm of
                              exstenceth spot whch the blissouls like mineing am
                              soo happy my dearsi frend absoribed the exquste
                              sense enjoy my whole hearts alone and fee the
                              charm of exstenceths spotsi whch was the blis of
                              soulis mineing amsoing dear frend soingu absoribed
                              the exqust sense tranqui existence neglect my
                              talentsr should ncapable ofing is drawng singe
                              wonderful serenty has taken possesison of my entre
                              soulng these sweet present moment and yet feel
                              that never was greater artst
                            </p> */}

                            {/* <div className="tags-section">
                              <ul className="tags lab-ul">
                                <li>
                                  <a href="#">Agency</a>
                                </li>
                                <li>
                                  <a href="#">Business</a>
                                </li>
                                <li>
                                  <a href="#">Personal</a>
                                </li>
                              </ul>
                              <ul className="lab-ul social-icons">
                                {socialList.map((val, i) => (
                                  <li key={i}>
                                    <a
                                      href={val.link}
                                      className={val.className}
                                    >
                                      <i className={val.iconName}></i>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      {/* <div className="navigations-part">
                        <div className="left">
                          <a href="#" className="prev">
                            <i className="icofont-double-left"></i>Previous
                            Article
                          </a>
                          <a href="#" className="title">
                            Evisculate Parallel Processes via Technica Sound
                            Models Authoritative
                          </a>
                        </div>
                        <div className="right">
                          <a href="#" className="prev">
                            Next Article<i className="icofont-double-right"></i>
                          </a>
                          <a href="#" className="title">
                            Qvisculate Parallel Processes via Technica Sound
                            Models Authoritative
                          </a>
                        </div>
                      </div> */}
                      {/* <Author /> */}
                      {/* <Comment /> */}
                      {/* <Respond /> */}
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <Search />
                <PostCategory />
                {/* <PopularPost /> */}
                {/* <Archive /> */}
                {/* <Instagram /> */}
                {/* <Tags /> */}
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default BlogSingle;
