import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Avatar from "react-avatar";
// import lh from "../../assets/images/test.webp"

import "../../assets/css/global.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { user } from "../../services/defaultValues";
import { IMAGE_BASE_URL } from "../../services/base_url";

// const phoneNumber = "+44-xxx-xxxx xxxx";
// const address = "Senate House, Malet St, London WC1E 7HU, United Kingdom";

let socialList = [
  {
    iconName: "icofont-facebook-messenger",
    siteLink: "#",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "#",
  },
  {
    iconName: "icofont-vimeo",
    siteLink: "#",
  },
  {
    iconName: "icofont-skype",
    siteLink: "#",
  },
  {
    iconName: "icofont-rss-feed",
    siteLink: "#",
  },
];

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFiexd, setHeaderFiexd] = useState(false);
  const [headerLogo, setHeaderLogo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitteer, setTwitteer] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [address, setAddress] = useState(
    "Senate House, Malet St, London WC1E 7HU, United Kingdom"
  );
  const [phoneNumber, setPhoneNumber] = useState("+44-xxx-xxxx xxxx");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFiexd(true);
    } else {
      setHeaderFiexd(false);
    }
  });
  const cartData = useSelector((state) => state.cart);
  const Settings = useSelector((state) => state.settinglist);
  useEffect(() => {
    if (Settings?.length > 0) {
      const logo = Settings.find((f) => f.key == "logo");
      const adress = Settings.find((f) => f.key == "address");
      const phone = Settings.find((f) => f.key == "phone");
      const yutube = Settings.find((f) => f.key == "youtube");
      const twitter = Settings.find((f) => f.key == "twitter");
      const facebok = Settings.find((f) => f.key == "fb");
      const linkedin = Settings.find((f) => f.key == "linkedin");
      setYoutube(yutube?.value);
      setLinkedin(linkedin?.value);
      setFacebook(facebok?.value);
      setTwitteer(twitter?.value);
      setHeaderLogo(logo?.value);
      setAddress(adress?.value);
      setPhoneNumber(phone?.value);
    }
  }, [Settings]);

  return (
    <header
      className={`header-section ${headerFiexd ? "header-fixed fadeInUp" : ""}`}
    >
      <div className={`header-top ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <ul className="lab-ul left">
              <li>
                <i className="icofont-ui-call"></i> <span>{phoneNumber}</span>
              </li>
              <li>
                <i className="icofont-location-pin"></i> {address}
              </li>
            </ul>
            <ul className="lab-ul social-icons d-flex align-items-center">
              <li>
                <p>Find us on : </p>
              </li>
              {/* {socialList.map((val, i) => ( */}
              <li>
                <div className="smedia-icon-wrapper">
                  <a href={facebook}>
                    <FacebookRoundedIcon className="smedia-icon" />
                  </a>
                  <a href={twitteer}>
                    <TwitterIcon className="smedia-icon" />
                  </a>
                  {/* <a href="https://www.instagram.com/">
                    <InstagramIcon className="smedia-icon" />
                  </a> */}
                  <a href={linkedin}>
                    <LinkedInIcon className="smedia-icon" />
                  </a>
                  <a href={youtube}>
                    <YouTubeIcon className="smedia-icon" />
                  </a>
                </div>
                {/* <a href={val.siteLink}>
                    <i className={val.iconName}></i>
                  </a> */}
              </li>
              {/* ))} */}
            </ul>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/">
                <img src={headerLogo || "zikarfikar-logo.png"} alt="logo" />
              </Link>
            </div>
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li className="">
                    <NavLink to="/">Home</NavLink>
                  </li>

                  <li className="">
                    <NavLink to="/course"> Courses</NavLink>
                  </li>
                  <li className="">
                    <NavLink to="/quiz"> Quiz</NavLink>
                  </li>
                  <li className="">
                    <NavLink to="/blog"> Blog</NavLink>
                  </li>
                  <li className="">
                    <NavLink to="/about"> About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact">Contact</NavLink>
                  </li>
                  {user && (
                    <li className="">
                      <a href="https://coursebackend.dhikrfikr.com/app/dashboards">
                        Dashboard
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div
                className="d-flex align-items-center h-auto"
                style={{ position: "relative" }}
              >
                <Link to="/cart">
                  <div className="d-flex align-items-center position-relative">
                    <span className="position-absolute top-0 start-50 translate-middle px-2 bg-secondary border border-light rounded-circle text-white">
                      {cartData?.length}
                    </span>
                    <ShoppingCartIcon
                      sx={{ fontSize: "30px" }}
                      className="mx-3 me-4"
                    />
                  </div>
                </Link>
                <div>
                  <NavLink to={user ? "/user-dashboard" : "/login"}>
                    {user ? (
                      <Avatar
                        size="35"
                        round={true}
                        src={
                          user?.image == "undefined" ? (
                            <PersonIcon
                              sx={{ fontSize: "35px" }}
                              type="button"
                            />
                          ) : (
                            `${IMAGE_BASE_URL}/${user?.image}`
                          )
                        }
                      />
                    ) : (
                      <PersonIcon sx={{ fontSize: "35px" }} type="button" />
                    )}
                  </NavLink>
                </div>
              </div>

              <div
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
                onClick={() => setMenuToggle(!menuToggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div
                className="ellepsis-bar d-lg-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
