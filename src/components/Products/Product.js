import React, { useEffect, useState } from "react";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
} from "react-router-dom";
import "./product.scss";
import oppoAdd from "../../Imgaes/oppoAdd.png";
import { Breadcrumb, Icon } from "semantic-ui-react";
import Product from "../home/Products";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { connect } from "react-redux";
import { getData, getSingleData } from "./../store/middleware/middleware";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});
function Productpage(props) {
  let [arr, setArr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let objarr = [];
    for (let i = 0; i < 30; i++) {
      objarr.push({
        price: "120,000",
        Modal: "2020 - 1 km",
        des: "Millat Massey Ferguson 375",
        moment: "Today",
      });
    }
    setArr(objarr);
  }, []);
  useEffect(() => {
    props.getData();
  }, []);
  let [filterLoc, setFilterLoc] = useState("");
  let [path, setPath] = useState("");
  let [url,setUrl] = useState("");
  useEffect(() => {
    setUrl(props.history.location.pathname);
  }, [props.history.location.pathname]);
  useEffect(() => {
    setPath(url.slice(10));
  }, [url,filterLoc]);

  let catArr = {
    Mobile: "Mobile",

    Vehicles: "Vehicles",

    PropertySale: "Property for Sale",

    PropertyRent: "Property for Rent",

    Electronics: "Electronics & Home Appliances",

    Bikes: "Bikes:",

    Business: "Business, Industrial & Agriculture",

    Services: "Services",

    Jobs: "Jobs",

    Animals: "Animals",

    Furniture: "Furniture: & Home Decor",

    Fashion: "Fashion: & Beauty",

    Books: "Books, Sports & Hobbies",

    Kids: "Kids",
  };

  let subCat = {
    Mobile: ["Mobile", "Tablets", "Mobile Accessories", "Mobile Phones"],
    Vehicles: [
      "Vehicles",
      "Cars",
      "Cars on Installments",
      "Cars Accessories",
      "Spare Parts",
      "Buses, Vans & Trucks",
      "Rickshaw & Chingchi",
      "Other Vehicles",
      "Boats",
      "Tractors & Trailers",
    ],
    PropertySale: [
      "Property for Sale",
      " Land & Plots",
      "Houses",
      "Apartments & Flats",
      "Shops - Offices - Commercial Space",
      "Portions & Floors",
    ],
    PropertyRent: [
      "Property for Rent",
      "Houses",
      "Apartments & Flats",
      "Portions & Floors",
      "Shops - Offices - Commercial Space",
      "Rooms",
      "Roommates & Paying Guests",
      "Vacation Rentals - Guest Houses",
      "Land & Plots",
    ],
    Electronics: [
      "Electronics & Home Appliances",
      "Computers & Accessories",
      "TV - Video - Audio",
      "Cameras & Accessories",
      "Games & Entertainment",
      "Other Home Appliances",
      "Generators, UPS & Power Solutions",
      "Kitchen Appliances",
      "AC & Coolers",
      "Fridges & Freezers",
      "Washing Machines & Dryers",
    ],
    Bikes: [
      "Bikes",
      "Motorcycles",
      "Spare Parts",
      "Bicycles",
      "ATV & Quads",
      "Scooters",
    ],
    Business: [
      "Business, Industrial & Agriculture",
      "Services",
      "Business for Sale",
      "Food & Restaurants",
      "Trade & Industrial",
      "Construction & Heavy Machinery",
      "Agriculture",
      "Other Business & Industry",
      "Medical & Pharma",
    ],
    Services: [
      "Services",
      " Education & Classes",
      "Travel & Visa",
      "Car Rental",
      "Drivers & Taxi",
      "Web Development",
      "Other Services",
      "Electronics & Computer Repair",
      "Event Services",
      "Health & Beauty",
      "Maids & Domestic Help",
      "Movers & Packers",
      "Home & Office Repair",
      "Catering & Restaurant",
      "Farm & Fresh Food",
    ],
    Jobs: [
      "Jobs",
      "Online",
      "Marketing",
      "Advertising & PR",
      "Education",
      "Customer Service",
      "Sales",
      "IT & Networking",
      "Hotels & Tourism",
      "Clerical & Administration",
      "Human Resources",
      "Accounting & Finance",
      "Manufacturing",
      "Medical",
      "Domestic Staff",
      "Part - Time",
      "Other Jobs",
    ],
    Animals: [
      "Animals",
      "Fish & Aquariums",
      "Birds",
      "Hens & Aseel",
      "Cats",
      "Dogs",
      "Livestock",
      "Horses",
      "Pet Food & Accessories",
      "Other Animals",
    ],
    Furniture: [
      "Furniture: & Home Decor",
      "Sofa & Chairs",
      "Beds & Wardrobes",
      "Home Decoration",
      "Tables & Dining",
      "Garden & Outdoor",
      "Painting & Mirrors",
      "Rugs & Carpets",
      "Curtains & Blinds",
      "Office Furniture",
      "Other Household Items",
    ],
    Fashion: [
      "Fashion: & Beauty",
      "Accessories",
      "Clothes",
      "Footwear",
      "Jewellery",
      "Make Up",
      "Skin & Hair",
      "Watches",
      "Wedding",
      "Lawn & Pret",
      "Couture",
      "Other Fashion",
    ],
    Books: [
      "Books, Sports & Hobbies",
      "Books & Magazines",
      "Musical Instruments",
      "Sports Equipment",
      "Gym & Fitness",
      "Other Hobbies",
    ],
    Kids: [
      "Kids",
      "Kids Furniture",
      "Toys",
      "Prams & Walkers",
      "Swings & Slides",
      "Kids Bikes",
      "Kids Accessories",
    ],
  };
  let [filterArr, setFilterArr] = useState([]);
  let [catFilter, setCatFilter] = useState([]);
  let arr2 = [];
  let [proArr, setProArr] = useState("");
  useEffect(() => {
    if (props.data.productData) {
      setProArr(Object.values(props.data.productData));
    }
  }, [props.data.productData]);


  function catFn(value) {
    // if (value === "") {
    //   // setSearchDrop(false);
    // }
    // setValue(ev.target.value);
    // Regexfilter(arr, value, "mainCatogorie");
    arr2 = [...proArr];
    arr2 = proArr.filter((b) =>
      b.subCatogorie.toLowerCase().match(value.toLowerCase())
    );
    setCatFilter(arr2);
  }
  useEffect(() => {
    for (let i = 0; i < Object.values(subCat).length; i++) {
      for (let j = 0; j < Object.values(subCat)[i].length; j++) {
        if (Object.values(subCat)[i][j] === path) {
          setFilterArr(Object.values(subCat)[i]);
        }
      }
    }
  }, [path]);

  return (
    <div className="Productpage">
      <div className="PopSearch">
        <p>
          <span className="bold">Popular Searches:</span> iphone - samsung -
          oppo - infinix - vivo s1 - huawei - nokia
        </p>
      </div>
      <div className="add1">
        <img src={oppoAdd} />
      </div>
      <div className="breadHead">
        <Breadcrumb>
          <Breadcrumb.Section>
            {" "}
            <Link className="BreadLink"> Home </Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section>
            <Link className="BreadLink"> Products </Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section>
            <Link className="BreadLink"> {path} </Link>
          </Breadcrumb.Section>
        </Breadcrumb>
        <h3>{path}</h3>
      </div>
      <div className="productMain">
        <div className="catogories">
          <div className="filter">
            <h4>Filters</h4>
          </div>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <div className="cat">
              <h4>CATEGORIES</h4>
              <TreeItem nodeId="1" label={filterArr[0]}>
                {filterArr.length
                  ? filterArr.map((a, i) => {
                      return (
                        <>
                          <TreeItem
                            nodeId={i + 2}
                            label={filterArr[i + 1]}
                            onClick={(ev) =>
                              // catFn(ev.currentTarget.textContent)
                              props.history.push(
                                `/products/${ev.currentTarget.textContent}`
                              )
                            }
                          />
                        </>
                      );
                    })
                  : null}
              </TreeItem>
            </div>
            <div className="cat">
              <h4>LOCATIONS</h4>
              <TreeItem nodeId="6" label="Pakistan">
                <TreeItem
                  nodeId="7"
                  label="Punjab"
                  onClick={(ev) => setFilterLoc(ev.currentTarget.textContent)}
                />
                <TreeItem
                  nodeId="8"
                  label="Sindh"
                  onClick={(ev) => setFilterLoc(ev.currentTarget.textContent)}
                />
                <TreeItem
                  nodeId="9"
                  label="Balochistan"
                  onClick={(ev) => setFilterLoc(ev.currentTarget.textContent)}
                />
                <TreeItem
                  nodeId="10"
                  label="Khyberpakhtunkhua"
                  onClick={(ev) => setFilterLoc(ev.currentTarget.textContent)}
                />
              </TreeItem>
            </div>
            <div className="cat">
              <h4>MAKE</h4>
              <TreeItem nodeId="11" label="">
                <TreeItem nodeId="12" label="Tablet" />
                <TreeItem nodeId="13" label="Accessories" />
                <TreeItem nodeId="14" label="Mobile Phones" />
              </TreeItem>
            </div>
            <div className="cat">
              <h4>PRICE</h4>
              <TreeItem nodeId="15" label="">
                <TreeItem nodeId="16" label="Calendar" />
                <TreeItem nodeId="17" label="Chrome" />
                <TreeItem nodeId="18" label="Webstorm" />
              </TreeItem>
            </div>
            <div className="cat">
              <h4>CONDITION</h4>
              <TreeItem nodeId="19" label="">
                <TreeItem nodeId="20" label="Calendar" />
                <TreeItem nodeId="21" label="Chrome" />
                <TreeItem nodeId="22" label="Webstorm" />
              </TreeItem>
            </div>
          </TreeView>
        </div>
        <div className="AllProduct">
          {/* {catFilter
            ? [
                Object.values(catFilter).length
                  ? Object.values(catFilter)
                      .filter(
                        (obj, i) =>
                          path === Object.values(catFilter)[i].subCatogorie
                      )
                      .map((a, i) => {
                        return (
                          <div
                            className="Product"
                            key={index}
                            onClick={() => [
                              props.getSingleData(a),
                              props.history.push(`/product/view/${a.key}`),
                            ]}
                          >
                            <div
                              className="productImage"
                              style={{
                                backgroundImage: `url(${a.imageURL[0]})`,
                              }}
                            >
                              <div className="feature">
                                <Icon name="heart outline" />
                                <p>FEATURED</p>
                              </div>
                            </div>
                            <div className="detail">
                              <h3>RS {a.price}</h3>
                              <p className="Modal">{a.descript}</p>
                              <p className="des">{a.descript}</p>
                              <p className="moment">{a.moment}</p>
                            </div>
                          </div>
                        );
                      })
                  : null,
              ]
            : [ */}
          {props.data.productData
            ? [
                Object.values(props.data.productData).length
                  ? Object.values(props.data.productData)
                      .filter(
                        (obj, i) =>
                        filterLoc ?

                          path ===
                            Object.values(props.data.productData)[i]
                              .subCatogorie &&
                          filterLoc ===
                            Object.values(props.data.productData)[i].state
                     : path ===
                     Object.values(props.data.productData)[i]
                       .subCatogorie  )
                      .map((a, i) => {
                        return (
                          <div
                            className="Product"
                            // key={index}
                            onClick={() => [
                              props.getSingleData(a),
                              props.history.push(`/product/view/${a.key}`),
                            ]}
                          >
                            <div
                              className="productImage"
                              style={{
                                backgroundImage: `url(${a.imageURL[0]})`,
                              }}
                            >
                              <div className="feature">
                                <Icon name="heart outline" />
                                {/* <p>FEATURED</p> */}
                              </div>
                            </div>
                            <div className="detail">
                              <h3>RS {a.price}</h3>
                              <p className="Modal">{a.descript}</p>
                              {/* <p className="des">{a.descript}</p> */}
                              <p className="moment">{a.moment}</p>
                            </div>
                          </div>
                        );
                      })
                  : //     : null,
                    // ]
                    null,
              ]
            : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};
const mapDispatchToProps = { getData, getSingleData };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Productpage));
