import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const newsTitle = "Want Us To Email You About Special Offers And Updates?";
const siteTitle = "Site Map";
const useTitle = "Useful Links";
const socialTitle = "Social Contact";
const supportTitle = "Our Support";

const useList = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Courses",
    link: "/course",
  },
  {
    text: "Blog",
    link: "/blog-2",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "Contact",
    link: "/contact",
  },
];

const supportList = [
  {
    text: "Help Center",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Terms & Conditions",
    link: "#",
  },
];

const Footer = () => {
  const [CopyRightText, setCopyRightText] = useState("");
  const Settings = useSelector((state) => state.settinglist);
  const [facebook, setFacebook] = useState('');
  const [twitteer, setTwitteer] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const socialList = [
    {
      text: "Facebook",
      link: facebook?.value,
    },
    {
      text: "Twitter",
      link: twitteer?.value,
    },
   
    {
      text: "LinkedIn",
      link: linkedin?.value,
    },
    {
      text: "YouTube",
      link: youtube?.value,
    },
  ];
  useEffect(() => {
    if (Settings?.length > 0) {
      const copyright_text = Settings.find((f) => f.key == "copyright_text");
      const yutube = Settings.find((f) => f.key == 'youtube');
      const twitter = Settings.find((f) => f.key == 'twitter');
      const facebok = Settings.find((f) => f.key == 'fb');
      const linkedin = Settings.find((f) => f.key == 'linkedin');
      setYoutube(yutube);
      setLinkedin(linkedin);
      setFacebook(facebok);
      setTwitteer(twitter);
      setCopyRightText(copyright_text?.value);
    }
  }, [Settings]);
  return (
    <div className="news-footer-wrap">
      <div className="fs-shape">
        <img src="assets/images/shape-img/03.png" alt="fst" className="fst-1" />
        <img src="assets/images/shape-img/04.png" alt="fst" className="fst-2" />
      </div>

      <div className="news-letter">
        <div className="container">
          <div className="section-wrapper">
            <div className="news-title">
              <h3>{newsTitle}</h3>
            </div>
            <div className="news-form">
              <form action="/">
                <div className="nf-list">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                  />
                  <input type="submit" name="submit" value="Subscribe Now" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top padding-tb pt-0">
          <div className="container">
            <div className="row g-4 row-cols-xl-4 row-cols-md-2 row-cols-1 justify-content-around">
              {/* <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{siteTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {siteList.map((val, i) => (
                            <li key={i}>
                              <a href={val.link}>{val.text}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{useTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {useList.map((val, i) => (
                            <li key={i} className="footer-li">
                              <NavLink to={val.link} className="footer-link">
                                {val.text}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{socialTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {socialList.map((val, i) => (
                            <li key={i} className="footer-li">
                              <a href={val.link} className="footer-link">
                                {val.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="footer-item">
                  <div className="footer-inner">
                    <div className="footer-content">
                      <div className="title">
                        <h4>{supportTitle}</h4>
                      </div>
                      <div className="content">
                        <ul className="lab-ul">
                          {supportList.map((val, i) => (
                            <li key={i} className="footer-li">
                              <a href={val.link} className="footer-link">
                                {val.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom style-2">
          <div className="container">
            <div className="section-wrapper">
              <p>{CopyRightText}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
