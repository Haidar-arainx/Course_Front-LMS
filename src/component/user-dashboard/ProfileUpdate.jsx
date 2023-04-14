import React, { useEffect, useState } from "react";
import {
  GetRequestApi,
  PostRequestApi,
  postRequestFunc,
} from "../../services/ApiRequests";
import { NotificationManager } from "react-notifications";
import { user } from "../../services/defaultValues";
import { InputGroup, Input } from "reactstrap";
import NewTextEditor from "../NewTextEditor";
const ProfileUpdate = () => {
  const [FirstName, setFirstName] = useState();
  const [UserInfo, setUserInfo] = useState("");
  const [email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [Pic, setPic] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkidin, setLinkidin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetRequestApi("countries").then((res) => {
      setCountryList(res.data.data);
    });
    GetRequestApi("user").then((res) => {
      setUserInfo(res.data.data);
    });
  }, []);
  useEffect(() => {
    if (country) {
      GetRequestApi(`states/${country}`).then((res) => {
        setStateList(res.data.data);
      });
    }
  }, [country]);
  useEffect(() => {
    if (state) {
      GetRequestApi(`cities/${state}`).then((res) => {
        setCityList(res.data.data);
      });
    }
  }, [state]);
  //edit form
  useEffect(() => {
    if (UserInfo) {
      setFirstName(UserInfo?.name);
      setEmail(UserInfo?.email);
      setPhone(UserInfo?.phone);
      setCountry(UserInfo?.country);
      setState(UserInfo?.state);
      setCity(UserInfo?.city);
      setzipCode(UserInfo?.zip);
      setInstagram(UserInfo?.instagram);
      setLinkidin(UserInfo?.linkedin);
      setFacebook(UserInfo?.facebook);
      setTwitter(UserInfo?.twitter);
      setDescription(UserInfo?.about);
      setShortDescription(UserInfo?.short_details);
      setGender(UserInfo?.gender);
    }
  }, [UserInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", FirstName);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zipCode);
    formData.append("email", email);
    formData.append("phone", Phone);
    formData.append("gender", gender);
    formData.append("image", Pic);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("linkedin", linkidin);
    formData.append("instagram", instagram);
    formData.append("short_details", shortDescription);
    formData.append("about", description);
    PostRequestApi("update-profile", formData).then((res) => {
      if (res?.data?.success === true) {
        NotificationManager.success(
          `${res?.data?.message}`,
          "Success!",
          3000,
          null,
          null,
          ""
        );
        setLoading(false);
      }
    });
  };
  const HandleEditor = (name, value) => {
    setDescription(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h4 className="box-title text-primary">
            <i className="ti-user me-15"></i> Edit Profile
          </h4>
          <hr className="my-15" />
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label"> Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="box-title text-primary mt-30">
              <i className="ti-video-camera me-15"></i> Social
            </h4>
            <hr className="my-15" />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Facebook URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="facebook URL"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Twitter URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="twitter URL"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Linkidin URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="linkidin URL"
                    value={linkidin}
                    onChange={(e) => setLinkidin(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Instagram URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Instagram URL"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="box-title text-primary mt-30">
              <i className="ti-envelope me-15"></i> Contact Info &amp; Bio
            </h4>
            <hr className="my-15" />
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Contact Number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-control"
                    placeholder="Contact Number"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select
                    className="form-control"
                    placeholder="Contact Number"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countryList &&
                      countryList.map((contry) => (
                        <option value={contry.id}>{contry?.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">State</label>
                  <select
                    className="form-control"
                    placeholder="Contact Number"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {stateList &&
                      stateList.map((contry) => (
                        <option value={contry.id}>{contry?.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <select
                    className="form-control"
                    placeholder="Contact Number"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {cityList &&
                      cityList.map((contry) => (
                        <option value={contry.id}>{contry?.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">ZipCode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ZipCode"
                    value={zipCode}
                    onChange={(e) => setzipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="short Description"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <NewTextEditor
                    labelName={" Description"}
                    fieldName="requirements"
                    HandleEditor={HandleEditor}
                    desc={description}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <label className="form-label">Profile Photo</label>
                <InputGroup className="mb-3">
                  <Input
                    type="file"
                    id="exampleCustomFileBrowser2"
                    name="customFile"
                    onChange={(e) => setPic(e.target.files[0])}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-items-2">
          <button type="submit" className="btn btn-success">
            <i className="ti-save-alt"></i> Save changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileUpdate;
