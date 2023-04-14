import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GetRequestApi, PostRequestApi } from "../../services/ApiRequests";

const GroupSelect = ({ setCourse, course, id }) => {
  const [category, setCategory] = useState(id ? id : "all");
  const [levelList, setLevelList] = useState([]);
  const [level, setLevel] = useState("all");
  const [subCetogryList, setSubCetogryList] = useState([]);
  const [subCetogry, setSubCetogry] = useState("all");
  const [price, setPrice] = useState("");

  const cetogriesList = useSelector((state) => state.catList);
  useEffect(() => {
    GetRequestApi("levels").then((response) => {
      setLevelList(response.data.data);
    });
  }, []);
  useEffect(() => {
    if (category) {
      PostRequestApi("subCategoriesbyid", { category_id: category }).then(
        (response) => {
          setSubCetogryList(response.data?.data);
        }
      );
    }
  }, [category]);

  useEffect(() => {
    const cetogriesFilter =
      course &&
      (category === "all"
        ? course
        : course.filter((c) => c.category_id == category));
    const subCetogryFilter =
      course && subCetogry === "all"
        ? cetogriesFilter
        : cetogriesFilter.filter((c) => c.subcategory_id == subCetogry);
    const levelFilter =
      course &&
      (level === "all"
        ? subCetogryFilter
        : subCetogryFilter.filter((c) => c.level == level));
    const PriceFilter =
      course &&
      (!price
        ? levelFilter
        : levelFilter.filter((c) => c.price <= Number(price)));

    const filteredArrayLevel = subCetogryFilter.filter((value) =>
      levelFilter.includes(value)
    );
    const filteredArrayPrice = filteredArrayLevel.filter((value) =>
      PriceFilter.includes(value)
    );

    setCourse(filteredArrayPrice);
  }, [category, level, course, cetogriesList, levelList, price, subCetogry]);

  return (
    <div className="group-select-section">
      <div className="container">
        <div className="section-wrapper">
          <div className="row align-items-center g-4">
            <div className="col-md-1">
              <div className="group-select-left">
                <i className="icofont-abacus-alt"></i>
                <span>Filters</span>
              </div>
            </div>
            <div className="col-md-11">
              <div className="group-select-right">
                <div className="row g-2 row-cols-lg-4 row-cols-sm-2 row-cols-1">
                  <div className="col">
                    <div className="select-item">
                      <select
                        defaultValue={"all"}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {cetogriesList &&
                          cetogriesList.map((val, i) => {
                            return (
                              <option value={val.id}>{val?.name?.en}</option>
                            );
                          })}
                      </select>

                      <div className="select-icon">
                        <i className="icofont-rounded-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="select-item">
                      <select
                        defaultValue={"all"}
                        onChange={(e) => setSubCetogry(e.target.value)}
                      >
                        <option value="all">All Subcetogry</option>
                        {subCetogryList &&
                          subCetogryList.map((r) => {
                            return <option value={r.id}>{r?.name?.en}</option>;
                          })}
                      </select>
                      {/* <SelectLanguage select={"all"} subCetogry={subCetogry} /> */}
                      <div className="select-icon">
                        <i className="icofont-rounded-down"></i>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="select-item">
                      <select
                        defaultValue={"all"}
                        onChange={(e) => setLevel(e.target.value)}
                      >
                        <option value="all">All Levels</option>
                        {levelList &&
                          levelList.map((val, i) => {
                            return (
                              <option value={val.id}>{val?.title?.en}</option>
                            );
                          })}
                      </select>
                      <div className="select-icon">
                        <i className="icofont-rounded-down"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="select-item">
                      <input
                        type="number"
                        placeholder="Price"
                        defaultValue={"all"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      {/* <select
                        defaultValue={"all"}
                        onChange={(e) => setPrice(e.target.value)}
                      >
                        <option value="all">All Prices</option>
                        {course &&
                          course
                            .filter((p) => p.price != "0")
                            .map((val, i) => {
                              return (
                                <option value={val.price}>{val?.price}</option>
                              );
                            })}
                      </select> */}

                      {/* <div className="select-icon">
                        <i className="icofont-rounded-down"></i>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSelect;
